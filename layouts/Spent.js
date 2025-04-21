import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from './contexts/AuthContext';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lueckcjjjsjwiesapqhs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZWNrY2pqanNqd2llc2FwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NTIzNzIsImV4cCI6MjA1OTAyODM3Mn0.y6i8VwWytF-eGuNvWvbTDXX3R5A3W5AxYygZnjXycJg';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Spent({ route, navigation }) {
  const { tittle } = route.params || {};
  const [value, setValue] = useState('');
  const [TotalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const { user, getUserId, isAuthenticated, checkUserSession } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      Alert.alert('Error', 'Por favor, inicia sesión para continuar.');
      navigation.navigate('LogIn');
      return;
    }
    
    if (!tittle) {
      Alert.alert('Error', 'Debes completar el paso anterior antes de continuar.');
      navigation.navigate('SpentTittle');
      return;
    }

    fetchTotalAmount();
  }, [isAuthenticated, tittle]);

  const fetchTotalAmount = async () => {
    setDataLoading(true);
    try {
      const userId = getUserId();
      
      if (!userId) {
        console.log('No hay ID de usuario para buscar el total');
        await checkUserSession();
        setDataLoading(false);
        return;
      }

    console.log('Consultando gastos para el usuario con ID:', userId);
      
      const { data, error } = await supabase
        .from('Expenses')
        .select('amount, tittle, validated_user_id')
        .eq('validated_user_id', userId);

      if (error) {
        console.error('Error al obtener el total:', error.message);
        return;
      }

      console.log('Gastos obtenidos para este usuario:', data);
      
      if (data && data.length > 0) {
        const total = data.reduce((sum, expense) => sum + expense.amount, 0);
        setTotalAmount(total);
      } else {
        setTotalAmount(0);
      }
    } catch (error) {
      console.error('Error al obtener el total:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handlePress = (key) => {
    if (key === 'back') {
      setValue((prev) => prev.slice(0, -1));
    } else if (key === '.') {
      if (!value.includes('.')) {
        setValue((prev) => prev + key);
      }
    } else {
      setValue((prev) => (prev + key).replace(/^0+/, ''));
    }
  };

  const handleConfirm = async () => {
    if (!value) {
      Alert.alert('Error', 'Por favor, ingresa un valor.');
      return;
    }

    const userId = getUserId();
    if (!userId) {
      Alert.alert('Error', 'No se pudo obtener el ID de usuario. Por favor, inicia sesión nuevamente.');
      navigation.navigate('LogIn');
      return;
    }
    
    setIsLoading(true);
    try {
      console.log('Insertando gasto con user ID:', userId);
      
      const { data, error } = await supabase
        .from('Expenses')
        .insert([{ 
          tittle, 
          amount: parseFloat(value), 
          validated_user_id: userId 
        }]);

      if (error) {
        console.error('Error al insertar en Supabase:', error.message);
        Alert.alert('Error', 'No se pudo guardar el valor.');
        return;
      }

      Alert.alert('Éxito', `Gasto registrado: ${tittle} - $${value}`);
      setValue('');
      fetchTotalAmount();
      navigation.navigate('MainScreen'); 
    } catch (error) {
      console.error('Error al guardar el gasto:', error);
      Alert.alert('Error', 'Ocurrió un error al guardar. Por favor intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.label}>descripción: {tittle || 'No definido'}</Text>
        
        {dataLoading ? (
          <ActivityIndicator color="#5A4B81" size="large" />
        ) : (
          <Text style={styles.label}>Monto Total: ${TotalAmount.toFixed(2)}</Text>
        )}
        
        <Text style={styles.label}>Indique el valor:</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>${value || '0.00'}</Text>
        </View>
        <View style={styles.keyboard}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'].map((key) => (
            <TouchableOpacity 
              key={key} 
              style={styles.key} 
              onPress={() => handlePress(key)}
              disabled={isLoading}
            >
              <Text style={styles.keyText}>{key === 'back' ? '←' : key}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity 
          style={[styles.confirmButton, isLoading && styles.disabledButton]} 
          onPress={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmButtonText}>CONFIRMAR</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Expenses')}>
          <Ionicons name="cash-outline" size={24} color="black" />
          <Text style={styles.footerText}>Gastos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('MainScreen')}>
          <Ionicons name="home-outline" size={24} color="black" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('SpentTittle')}>
          <Ionicons name="calculator-outline" size={24} color="black" />
          <Text style={styles.footerText}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EADCF8',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#5A4B81',
    textTransform: 'uppercase',
  },
  subLabel: {
    fontSize: 16,
    color: '#5A4B81',
    marginBottom: 10,
  },
  inputContainer: {
    width: '80%',
    height: 70,
    backgroundColor: '#D6C8F0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#5A4B81',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  inputText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#5A4B81',
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '75%',
    marginBottom: 20,
  },
  key: {
    width: '28%',
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#F3E8FD',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#5A4B81',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  keyText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5A4B81',
  },
  confirmButton: {
    width: '80%',
    height: 50,
    bottom: 12,
    borderWidth: 2,
    backgroundColor: '#B8A4E3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#D6C8F0',
  },
  confirmButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FBF0FA',
    borderWidth: 3,
    padding: 10,
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
  },
});