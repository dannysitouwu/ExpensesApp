import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
// import AppNavigator from '../AppNavigator';
// import { useNavigation } from '@react-navigation/native';
import { createClient } from '@supabase/supabase-js';

// supa client
const supabaseUrl = 'https://lueckcjjjsjwiesapqhs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZWNrY2pqanNqd2llc2FwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NTIzNzIsImV4cCI6MjA1OTAyODM3Mn0.y6i8VwWytF-eGuNvWvbTDXX3R5A3W5AxYygZnjXycJg'
const supabase = createClient(supabaseUrl, supabaseKey)

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const SignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa un correo y una contraseña.');
      return;
    }

    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('already registered')) {
        Alert.alert('Error', 'El correo ya está registrado. Por favor, usa otro.');
      } else {
        Alert.alert('Error', 'No se pudo registrar el usuario.');
      }
      console.error(error.message);
      return;
    }

    Alert.alert('Éxito', 'Usuario registrado correctamente.');
    console.log('Usuario registrado:', user);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity style={styles.backButtons} onPress={() => navigation.goBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity> */}
      
        <Text style={styles.title}>Crea una Cuenta!!</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
      />
      <TouchableOpacity style={styles.signUpButton} onPress={() => SignUp()}>
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#A8A3DD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6F3B8E',
  },
  input: {
    width: '100%',
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  signUpButton: {
    backgroundColor: '#6F3B8E',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});