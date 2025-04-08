//tabs
import React, { useState , useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, } from 'react-native';

// supabase client
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lueckcjjjsjwiesapqhs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZWNrY2pqanNqd2llc2FwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NTIzNzIsImV4cCI6MjA1OTAyODM3Mn0.y6i8VwWytF-eGuNvWvbTDXX3R5A3W5AxYygZnjXycJg'
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Spent({ navigation }) {
  const [value, setValue] = useState('');
  const [TotalAmount, setTotalAmount] = useState(0);

  const fetchTotalAmount = async () => {
    const { data, error } = await supabase
      .from('Expenses')
      .select('amount')
      // .insert([{ tittle ,amount: parseFloat(value) }]) //titulo y valor

    if (error) {
      console.error('Error al obtener el total:', error.message);
      return;
    }

    const total = data.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalAmount(total); 
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

    

    const { data, error } = await supabase
        .from('Expenses')
        .insert([{ amount: parseFloat(value) }]);

    if (error) {
        console.error('Error al insertar en Supabase:', error.message);
        Alert.alert('Error', 'No se pudo guardar el valor.');
        return;
    }
            
     Alert.alert('Éxito', `Valor guardado: $${value}`);
    setValue('');
    fetchTotalAmount();
     navigation.goBack();
};

    useEffect(() => { fetchTotalAmount();}, 
    []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total Amount: ${TotalAmount.toFixed(2)}</Text>
      <Text style={styles.label}>enter value:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>${value || '0.00'}</Text>
      </View>
      <View style={styles.keyboard}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'].map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => handlePress(key)}
          >
            <Text style={styles.keyText}>
              {key === 'back' ? '↩' : key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>CONFIRM</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EADCF8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#5A4B81',
    textTransform: 'uppercase',
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
  confirmButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
});