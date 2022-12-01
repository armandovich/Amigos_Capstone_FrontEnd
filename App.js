import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import AuthenticationNav from './navigations/AuthenticationNav.js';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DarkTheme}>
        <AuthenticationNav/>
        <StatusBar style="light" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}