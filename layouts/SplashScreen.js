import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Begin = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LogIn'); 
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/SplashScreen.png')} style={styles.image}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%', 
    height: '100%',
    resizeMode: 'cover', 
  },
});

export default Begin;
