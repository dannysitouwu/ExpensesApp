import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native'; // Importar useIsFocused para verificar el estado de la pantalla


// Supabase client
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://lueckcjjjsjwiesapqhs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZWNrY2pqanNqd2llc2FwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NTIzNzIsImV4cCI6MjA1OTAyODM3Mn0.y6i8VwWytF-eGuNvWvbTDXX3R5A3W5AxYygZnjXycJg'
const supabase = createClient(supabaseUrl, supabaseKey);

const MainScreen = ({ navigation }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const isFocused = useIsFocused();

  const fetchTotalAmount = async () => {
    const { data, error } = await supabase
      .from('Expenses')
      .select('amount'); 
      

    if (error) {
      console.error('Error al obtener el total:', error.message);
      return;
    }

    const total = data.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalAmount(total); 
  };

  useEffect(() => { if (isFocused) { fetchTotalAmount();}}, 
    [isFocused]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Gasto Semanal</Text>
          <Text style={styles.totalAmount}>Monto Total: ${totalAmount.toFixed(2)}</Text>
        </View>

        {/* Chart Section */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartLabel}>Gastos Semanales</Text>
          <View style={styles.chart}>
            {/* Example bars */}
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
              <View key={index} style={styles.chartBarContainer}>
                <View style={[styles.chartBar, index === 0 && styles.highlightBar]} />
                <Text style={styles.chartDay}>{day}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

        {/* Buttons Section */}
        <View style={styles.buttonsContainer}>
          {['Billet', 'Entries', 'Expenses', 'Retiring'].map((label, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              <Ionicons name="wallet" size={20} color="white" />
              <Text style={styles.buttonText}>{label}</Text>
              <Ionicons name="chevron-down" size={20} color="white" />
            </TouchableOpacity>
          ))}
        </View> 

        {/* Footer Navigation */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Expenses')}>
            <Ionicons name="cash-outline" size={24} color="black" />
            <Text style={styles.footerText}>Expenses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Statistics')}>
            <Ionicons name="stats-chart-outline" size={24} color="black" />
            <Text style={styles.footerText}>Statistic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Spent')}>
            <Ionicons name="calculator-outline" size={24} color="black" />
            <Text style={styles.footerText}>Spent</Text>
          </TouchableOpacity>
          
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#A8A3DD', // Fondo de pantalla
  },
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 1,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  totalAmount: {
    fontSize: 17,
    color: 'white',
    marginTop: 5,
  },
  chartContainer: {
    backgroundColor: '#6F3B8E',
    borderRadius: 30,
    padding: 25,
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 15,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderEndWidth: 3,
  },
  chartLabel: {
    fontSize: 16,
    color: 'white',
    marginBottom: 1,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  chartBarContainer: {
    alignItems: 'center',
    
  },
  chartBar: {
    width: 22,
    height: 60,
    backgroundColor: '#A8A3DD',
    borderRadius: 6,
  },
  highlightBar: {
    backgroundColor: '#FF6F61', //  bar color
    height: 80,
  },
  chartDay: {
    marginTop: 5,
    fontSize: 14,
    color: 'white',
  },
  buttonsContainer: {
    marginBottom: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6F3B8E',
    padding: 17,
    borderRadius: 20,
    marginBottom: 15,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderEndWidth: 3,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FBF0FA',
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderEndWidth: 3,
    padding: 10,
    borderRadius: 25,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
  },
});

export default MainScreen;