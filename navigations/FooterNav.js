import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import general from '../styles/General.js';
import Constants from '../helpers/Constants.js';
import Home from '../screens/Business/Home.js';
import Chat from '../screens/Business/Chat.js';
import Profile from '../screens/User/Profile.js';
import Rent from '../screens/Business/Rent.js';
import Trip from '../screens/Business/Trips.js';

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
          let isIconns = true;

          if (rn == Constants.home) {
            iconName = "home-outline";
          } else if (rn == Constants.chat) {
            iconName = "chatbox-outline";
          } else if (rn == Constants.profile) {
            iconName = "md-person-circle-outline";
          } else if (rn == Constants.rent) {
            isIconns = false;
            iconName = "car";
          } else if (rn == Constants.trip) {
            isIconns = false;
            iconName = "road";
          }
  
          if(isIconns) {
            return <Ionicons name={iconName} size={24} color={iconColor}/>
          } else {
            return <FontAwesome5 name={iconName} size={24} color={iconColor} />;
          }
        },
        })}>
        <Tap.Screen name={Constants.home} component={Home}/>
        <Tap.Screen name={Constants.trip} component={Trip}/>
        <Tap.Screen name={Constants.rent} component={Rent}/>
        <Tap.Screen name={Constants.chat} component={Chat}/>
        <Tap.Screen name={Constants.profile} component={Profile}/>
      </Tap.Navigator>
    );
}