import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// SupaBaseClient
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lueckcjjjsjwiesapqhs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZWNrY2pqanNqd2llc2FwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NTIzNzIsImV4cCI6MjA1OTAyODM3Mn0.y6i8VwWytF-eGuNvWvbTDXX3R5A3W5AxYygZnjXycJg'
const supabase = createClient(supabaseUrl, supabaseKey)

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error', 'Correo o contraseña incorrectos.');
      console.error(error.message);
      return;
    }

    console.log('Usuario autenticado:', user);
    navigation.navigate('MainScreen');
  };

  const SignUp = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario.');
      console.error(error.message);
      return;
    }

    Alert.alert('Éxito', 'Usuario registrado correctamente.');
    console.log('Usuario registrado:', user);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Bienvenido de Vuelta!!</Text>
        <Text style={styles.subText}> Porfavor, registrate con tu cuenta existente</Text>
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        {/* Email Field */}
        <Text style={styles.labelText}>EMAIL</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="example@gmail.com"
          placeholderTextColor="#aaa"
        />

        {/* Password Field */}
        <Text style={styles.labelText}>PASSWORD</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="Password"
            placeholderTextColor="#aaa"/>

          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupText}> SIGN UP</Text>
        </TouchableOpacity> */}

        {/* Sign Up */}
        <View style={styles.signupContainer}>
          <Text style={styles.noAccountText}>No tienes una cuenta?</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
            <Text style={styles.signupText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6F3B8E',
  },
  headerContainer: {
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    // height: '65%',
    backgroundColor: '#A197D9',
    borderRadius: 35,
    padding: 30,
    // strokeWidth: 3,
    borderWidth: 3,
    strokeColor: 'black',
    marginHorizontal: 8,
    marginBottom: -40,
  },
  labelText: {
    color: '#444',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkboxChecked: {
    backgroundColor: '#6F3B8E',
  },
  rememberText: {
    marginLeft: 8,
    color: '#333',
    fontSize: 14,
  },
  forgotText: {
    color: '#4B3A70',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#6F3B8E',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountText: {
    color: '#333',
    fontSize: 14,
  },
  signupText: {
    color: '#6F3B8E',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});
