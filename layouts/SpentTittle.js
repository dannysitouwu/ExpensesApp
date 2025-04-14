import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SpentTittle = ({ navigation }) => {
  const [tittle, settittle] = useState('');

  const handleContinue = () => {
    if (!tittle.trim()) {
      alert('Por favor, ingresa una descripción para continuar.');
      return;
    }
    navigation.navigate('Spent', { tittle });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Ingresa una descripción</Text>
        <TextInput
          style={styles.input}
          placeholder="Descripción del gasto"
          value={tittle}
          onChangeText={settittle}
        />
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.bottomBackButton}>
        <Ionicons name="arrow-back" size={33} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#A8A3DD',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#F3E8FD',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#5A4B81',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  inputContainer: {
    width: '90%',
    height: 120,
    backgroundColor: '#F3E8FD',
    borderRadius: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#5A4B81',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  inputText: {
    fontSize: 16,
    color: '#5A4B81',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6F3B8E',
    padding: 15,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottomBackButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#F3E8FD',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default SpentTittle;