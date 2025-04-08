import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { BarChart } from 'react-native-chart-kit'; // Asegúrate de instalar esta librería
import { Dimensions } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lueckcjjjsjwiesapqhs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZWNrY2pqanNqd2llc2FwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NTIzNzIsImV4cCI6MjA1OTAyODM3Mn0.y6i8VwWytF-eGuNvWvbTDXX3R5A3W5AxYygZnjXycJg';
const supabase = createClient(supabaseUrl, supabaseKey);

const Statistic = ({ navigation }) => {
  const [average, setAverage] = useState(0);

  const fetchAverage = async () => {
    const { data, error } = await supabase
      .from('Expenses')
      .select('amount');
    //   const user = supabase.auth.user();
    //   if (!user) {
    //     Alert.alert('Error', 'Usuario no autenticado.');
    //     return;
    //   }
  
    //   const { data, error } = await supabase
    //     .from('Expenses')
    //     .select('amount')
    //     .eq('user_id', user.id);   

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
        <BarChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                data: [average, average, average, average, average, average, average], 
              },
            ],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
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
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          style={styles.chart}
        />
      </View>
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
    padding: 20,
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Statistic;