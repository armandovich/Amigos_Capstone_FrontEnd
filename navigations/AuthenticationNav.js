import { createStackNavigator } from '@react-navigation/stack';
import Constants from '../helpers/Constants.js';
import Intro from '../screens/Authentication/Intro.js';
import Login from '../screens/Authentication/Login.js';
import Register from '../screens/Authentication/Register.js';
import ResetPassword from '../screens/Authentication/ResetPassword.js';
import FooterNav from './FooterNav.js';

const Stack = createStackNavigator();

export default function AuthenticationNav() {
    return (
        <Stack.Navigator screenOptions={ { headerShown: false, headerStyle: { backgroundColor: '#fff' }} }>
          <Stack.Screen name={Constants.intro} component={Intro}/>
          <Stack.Screen name={Constants.login} component={Login}/>
          <Stack.Screen name={Constants.register} component={Register}/>
          <Stack.Screen name={Constants.reset} component={ResetPassword}/>
          <Stack.Screen name={Constants.footer} component={FooterNav}/>
        </Stack.Navigator>
    );
}