import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function EnterTitle({ navigation }) {
  const [title, setTitle] = useState('');

  const handleNext = () => {
    if (!title) {
      alert('Por favor, ingresa un título o descripción.');
      return;
    }
    navigation.navigate('Spent', { title });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Add category"
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A8A3DD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#5A4B81',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#5A4B81',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '50%',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});