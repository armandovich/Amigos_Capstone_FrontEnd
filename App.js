import { useFonts } from "@use-expo/font";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import MainNav from './navigations/MainNav.js';
import * as Location from 'expo-location';

const checkPermission = async () => {
  const hasPermission = await Location.requestForegroundPermissionsAsync();
  if (hasPermission.status === 'granted') {
    const permission = await askPermission();
    return permission;
  }
  return true;
};
const askPermission = async () => {
  const permission = await Location.getForegroundPermissionsAsync();
  return permission.status === 'granted';
};
checkPermission()

const customFonts = {
  Roboto: require('./assets/fonts/RobotoMono-Regular.ttf'),
  RobotoBold: require('./assets/fonts/RobotoMono-Bold.ttf')
};

export default function App() {
  const [isLoaded] = useFonts(customFonts);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DarkTheme}>
        { isLoaded ? <>
          <MainNav/>
        </> : <></>}

        <StatusBar style="light" hidden/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}