import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit'; // Asegúrate de instalar esta librería
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://lueckcjjjsjwiesapqhs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZWNrY2pqanNqd2llc2FwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NTIzNzIsImV4cCI6MjA1OTAyODM3Mn0.y6i8VwWytF-eGuNvWvbTDXX3R5A3W5AxYygZnjXycJg';
const supabase = createClient(supabaseUrl, supabaseKey);

const Statistic = ({ navigation }) => {
  const [average, setAverage] = useState(0);

  const fetchAverage = async () => {
    const { data, error } = await supabase.from('Expenses').select('amount');

    if (error) {
      console.error('Error al obtener los gastos:', error.message);
      return;
    }

    const total = data.reduce((sum, expense) => sum + expense.amount, 0);
    const avg = data.length > 0 ? total / data.length : 0;
    setAverage(avg);
  };

  useEffect(() => {
    fetchAverage();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Estatisticas</Text>
        <Text style={styles.averageText}>Promedio de Gastos: ${average.toFixed(2)}</Text>
        
        {/* Chart Section */}
        <View style={styles.chartContainer}>
          <BarChart
            data={{
              labels: ['Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab', 'Dom'],
              datasets: [{data: [average, average, average, average, average, average, average],},],
            }}
            width={Dimensions.get('window').width - 45}
            height={222}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: '#6F3B8E',
              backgroundGradientFrom: '#6F3B8E',
              backgroundGradientTo: '#A8A3DD',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {r: '6', strokeWidth: '2', stroke: '#ffa726',},
            }}
            style={styles.chart}
          />
        </View>
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
    padding: 30,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  averageText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  chartContainer: {
    marginVertical: 8,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#5A4B81',
    padding: 8, 
    backgroundColor: '#F3E8FD',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 3,
    borderRadius: 22,
    borderColor: '#5A4B81',
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

export default Statistic;