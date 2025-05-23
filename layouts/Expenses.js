import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Supabase client
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://lueckcjjjsjwiesapqhs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZWNrY2pqanNqd2llc2FwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NTIzNzIsImV4cCI6MjA1OTAyODM3Mn0.y6i8VwWytF-eGuNvWvbTDXX3R5A3W5AxYygZnjXycJg'; // Tu clave completa
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Expenses({ navigation }) {
  const [search, setSearch] = useState('');
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const { data, error } = await supabase
      .from('Expenses')
      .select('amount, id, tittle, validated_user_id')
      .order('created_at', { ascending: false }); 

    if (error) {
      console.error('Error al obtener los gastos:', error.message);
      return;
    }

    setExpenses(data);
  };
  

  // eliminar
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('Expenses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar el gasto:', error.message);
      return;
    }

    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

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
      <View style={styles.container}>
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
        <View style={styles.listContainer}>
          <FlatList
            data={filteredExpenses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderExpense}
            showsVerticalScrollIndicator={false}/>
        </View>
      </View>
          {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.BackButton}>
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity> */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Expenses')}>
          <Ionicons name="cash-outline" size={24} color="black" />
          <Text style={styles.footerText}>Gastos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('MainScreen')}>
          <Ionicons name="home-outline" size={24} color="black" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Spent')}>
          <Ionicons name="calculator-outline" size={24} color="black" />
          <Text style={styles.footerText}>Agregar</Text>
        </TouchableOpacity>
      </View>    
            
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#A8A3DD',
  },
  // BackButton: {
  //   position: 'absolute',
  //   bottom: 30,
  //   left: 20,
  //   backgroundColor: '#F3E8FD',
  //   padding: 10,
  //   borderRadius: 30,
  //   elevation: 5,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  //   },
  container: {
    flex: 1,
    padding: 20,
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
  listContainer: {
    flex: 1,
    backgroundColor: '#F3E8FD',
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: '#5A4B81',
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
    bottom: 20,
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
});