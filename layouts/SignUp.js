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

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa un correo y una contraseña.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('already')) {
        Alert.alert('Error', 'El correo ya está registrado.');
      } else {
        Alert.alert('Error', 'No se pudo registrar el usuario.');
      }
      console.error('Signup error:', error.message);
      return;
    }

    Alert.alert('Éxito', 'Usuario registrado correctamente.');
    console.log('Usuario registrado:', data.user);
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>¡No tienes una cuenta?</Text>
        <Text style={styles.subText}>¡Crea la tuya ahora!</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.labelText}>EMAIL</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="example@gmail.com"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.labelText}>PASSWORD</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign In</Text>
        </TouchableOpacity>
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
    backgroundColor: '#A197D9',
    borderRadius: 35,
    padding: 30,
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
  signUpButton: {
    backgroundColor: '#6F3B8E',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    backgroundColor: '#A197D9',
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
  },
});