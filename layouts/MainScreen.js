import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { RefreshControl } from 'react-native-gesture-handler';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lueckcjjjsjwiesapqhs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZWNrY2pqanNqd2llc2FwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NTIzNzIsImV4cCI6MjA1OTAyODM3Mn0.y6i8VwWytF-eGuNvWvbTDXX3R5A3W5AxYygZnjXycJg';
const supabase = createClient(supabaseUrl, supabaseKey);

const MainScreen = ({ navigation }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const fetchTotalAmount = async () => {
    const { data, error } = await supabase.from('Expenses').select('amount');

    if (error) {
      console.error('Error al obtener el total:', error.message);
      return;
    }

    const total = data.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalAmount(total);
  };

  const fetchExpenses = async () => {
    const { data, error } = await supabase
      .from('Expenses')
      .select('amount, id, tittle')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al obtener los gastos:', error.message);
      return;
    }

    setExpenses(data);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('Expenses').delete().eq('id', id);

    if (error) {
      console.error('Error al eliminar el gasto:', error.message);
      return;
    }
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));

    fetchExpenses();
  };

  const handleLogOut = async () => {
    const { data,error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', 'No se pudo cerrar la sesión. Intenta nuevamente.');
      console.error('Error al cerrar sesión:', error.message);
      return;
    }
    Alert.alert('Concluido', 'LogOut del usuario');
    navigation.navigate('LogIn'); 
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTotalAmount();
    await fetchExpenses();
    setRefreshing(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetchTotalAmount();
      fetchExpenses();
    }
  }, [isFocused]);

  const filteredExpenses = expenses.filter((expense) => {
    const expenseTitle = (expense.tittle || '').toLowerCase();
    const searchText = search.toLowerCase();
    return expenseTitle.includes(searchText);
  });

  const renderExpense = ({ item }) => (
    <View style={styles.expenseItem}>
      <View style={styles.expenseDetails}>
        <View style={styles.circle} />
        <View>
          <Text style={styles.expenseTitle}>{item.tittle || 'Untitled'}</Text>
          <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Ionicons name="close-circle" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentWrapper}>
        <View style={styles.container}>
          {/* Chart Section */}
          <TouchableOpacity onPress={() => navigation.navigate('Statistics')} style={styles.chartContainer}>
            <Text style={styles.totalAmount}>Monto Total: ${totalAmount.toFixed(2)}</Text>
            <View style={styles.chart}>
              {['Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab', 'Dom'].map((day, index) => (
                <View key={index} style={styles.chartBarContainer}>
                  <View style={[styles.chartBar, index === 0 && styles.highlightBar]} />
                  <Text style={styles.chartDay}>{day}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="buscar por:"
              placeholderTextColor="#555"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* Expense List */}
          <View style={styles.listWrapper}>
            <FlatList
              data={filteredExpenses}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderExpense}
              contentContainerStyle={styles.listContainer}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        </View>

        {/* Footer Navigation */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Expenses')}>
            <Ionicons name="cash-outline" size={24} color="black" />
            <Text style={styles.footerText}>Gastos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('MainScreen')}>
            <Ionicons name="home-outline" size={24} color="black" />
            <Text style={styles.footerText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('SpentTittle')}>
            <Ionicons name="calculator-outline" size={24} color="black" />
            <Text style={styles.footerText}>Agregar</Text>
          </TouchableOpacity>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
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
    padding: 10,
  },
  contentWrapper: {
    flex: 1,
    paddingBottom: 12,
  },
  chartContainer: {
    backgroundColor: '#6F3B8E',
    borderRadius: 30,
    padding: 25,
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#5A4B81',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
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
    backgroundColor: '#FF6F61',
    height: 80,
  },
  chartDay: {
    marginTop: 5,
    fontSize: 14,
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FD',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#5A4B81',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  listWrapper: {
    flex: 1,
    marginBottom: 80,
  },
  listContainer: {
    flexGrow: 1,
    backgroundColor: '#F3E8FD',
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    paddingBottom: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#5A4B81',
  },
  expenseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#A8A3DD',
    marginRight: 10,
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  expenseAmount: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FBF0FA',
    borderWidth: 3,
    padding: 10,
    borderRadius: 25,
    position: 'absolute',
    bottom: 15,
    left: 10,
    right: 10,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
  },
  logoutButton: {
    position: 'absolute',
    right: 4,
    backgroundColor: '#6F3B9F',
    borderRadius: 30,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
  },
  logoutText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default MainScreen;