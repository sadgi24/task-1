// screens/SplashScreen.js
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from '../assets/logo.svg'; // SVG imported as a component

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Logo width={150} height={150} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(121,34,29,1)',
  },
  logo: {
    width: 150,
    height: 150,
  },
});