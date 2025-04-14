import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import AppNavigator from '../AppNavigator';
// import { useNavigation } from '@react-navigation/native';

// supa client
import { createClient } from '@supabase/supabase-js';
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
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Crea una Cuenta!!</Text>
        </View>
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
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#D0D4FE',
  },
  formContainer: {
    // flex: 1,
    width: '95%',
    backgroundColor: '#A197D9',
    borderRadius: 35,
    padding: 20,
    borderWidth: 3,
    strokeColor: 'black',
    marginHorizontal: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6F3B8E',
    textAlign: 'center',
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