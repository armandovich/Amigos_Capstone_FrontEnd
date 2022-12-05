import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import general from '../styles/General.js';
import Constants from '../helpers/Constants.js';
import Home from '../screens/Business/Home.js';
import Chat from '../screens/Business/Chat.js';
import Profile from '../screens/User/Profile.js';

const Tap = createBottomTabNavigator();


export default function BottomNav() {
    return (
    <Tap.Navigator
        screenOptions={ ({route}) => ({ 
        headerShown: false,
        tabBarStyle: general.bottomNav,
        tabBarActiveTintColor: '#f9c746',
        tabBarInactiveTintColor: '#fffbea',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = focused ? "#f9c746" : "#fffbea";
          let rn = route.name;
  
          if (rn == Constants.home) {
            iconName = "home-outline";
          } else if (rn == Constants.chat) {
            iconName = "chatbox-outline";
          } else if (rn == Constants.profile) {
            iconName = "md-person-circle-outline";
          }
  
          return <Ionicons name={iconName} size={24} color={iconColor}/>
        },
        })}>
        <Tap.Screen name={Constants.home} component={Home}/>
        <Tap.Screen name={Constants.chat} component={Chat}/>
        <Tap.Screen name={Constants.profile} component={Profile}/>
      </Tap.Navigator>
    );
}