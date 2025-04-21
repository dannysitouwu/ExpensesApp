// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Alert } from 'react-native';

//supabase
const supabaseUrl = 'https://lueckcjjjsjwiesapqhs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZWNrY2pqanNqd2llc2FwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NTIzNzIsImV4cCI6MjA1OTAyODM3Mn0.y6i8VwWytF-eGuNvWvbTDXX3R5A3W5AxYygZnjXycJg';
const supabase = createClient(supabaseUrl, supabaseKey);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      setLoading(true);

      const storedUserId = await AsyncStorage.getItem('userId');
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error al verificar la sesión:', error.message);
        setUser(null);
        return;
      }
      
      if (session && session.user) {
        setUser(session.user);
        if (session.user.id !== storedUserId) {
          await AsyncStorage.setItem('userId', session.user.id);
        }
      } else if (storedUserId) {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.log('No hay sesión activa, pero había un ID guardado. Limpiando...');
          await AsyncStorage.removeItem('userId');
          setUser(null);
        } else {
          setUser(user);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error al verificar la sesión:', error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      if (data && data.user) {
        console.log('Usuario autenticado con ID:', data.user.id);
        setUser(data.user);
        await AsyncStorage.setItem('userId', data.user.id);
        return { success: true, user: data.user };
      }
      
      return { success: false, message: 'No se pudo iniciar sesión' };
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, name) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            email,
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      if (data && data.user) {
        setUser(data.user);
        await AsyncStorage.setItem('userId', data.user.id);
        return { success: true, user: data.user };
      }
      
      return { success: false, message: 'No se pudo completar el registro' };
    } catch (error) {
      console.error('Error al registrarse:', error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
  try {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    setUser(null);
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('amount'); 
    return { success: true };
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message);
    return { success: false, message: error.message };
  } finally {
    setLoading(false);
  }
};

  const getUserId = () => {
    return user ? user.id : null;
  };

  const authContextValue = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    getUserId,
    checkUserSession,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};