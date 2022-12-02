import { useFonts } from "@use-expo/font";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import AuthenticationNav from './navigations/AuthenticationNav.js';

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
          <AuthenticationNav/>
        </> : <></>}

        <StatusBar style="light" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}