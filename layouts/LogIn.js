import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from './contexts/AuthContext';

export default function LogIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, loading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa correo y contraseña.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn(email, password);
      
      if (result.success) {
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        navigation.navigate('MainScreen');
      } else {
        Alert.alert('Error', result.message || 'Correo o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error inesperado:', error.message);
      Alert.alert('Error', 'Ocurrió un error inesperado. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Bienvenido de Vuelta!!</Text>
        <Text style={styles.subText}>Por favor, ingresa con tu cuenta</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.labelText}>EMAIL</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="example@gmail.com"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />

        <Text style={styles.labelText}>PASSWORD</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="Password"
            placeholderTextColor="#aaa"
            editable={!isLoading}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.disabledButton]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Log in</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.noAccountText}>No tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')} disabled={isLoading}>
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
  loginButton: {
    backgroundColor: '#6F3B8E',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#9E7BB2',
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