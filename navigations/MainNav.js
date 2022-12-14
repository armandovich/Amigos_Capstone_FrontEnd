import { createStackNavigator } from '@react-navigation/stack';
import Constants from '../helpers/Constants.js';
import Intro from '../screens/Authentication/Intro.js';
import Login from '../screens/Authentication/Login.js';
import Register from '../screens/Authentication/Register.js';
import ResetPassword from '../screens/Authentication/ResetPassword.js';
import FooterNav from './FooterNav.js';
import CarDetail from '../screens/Business/CarDetail.js';
import Messages from '../screens/Business/Messages.js';
import RentCrud from "../screens/Admin/RentCrud.js";
import Checkout from '../screens/Business/Checkout.js';

const Stack = createStackNavigator();

export default function MainNav() {
    return (
        <Stack.Navigator screenOptions={ { headerShown: false, headerStyle: { backgroundColor: '#fff' }} }>
          <Stack.Screen name={Constants.intro} component={Intro}/>
          <Stack.Screen name={Constants.login} component={Login}/>
          <Stack.Screen name={Constants.register} component={Register}/>
          <Stack.Screen name={Constants.reset} component={ResetPassword}/>
          <Stack.Screen name={Constants.footer} component={FooterNav}/>
          <Stack.Screen name={Constants.carDetail} component={CarDetail}/>
          <Stack.Screen name={Constants.msg} component={Messages}/>
          <Stack.Screen name={Constants.rentcrud} component={RentCrud}/>
          <Stack.Screen name={Constants.checkout} component={Checkout}/>
        </Stack.Navigator>
    );
}