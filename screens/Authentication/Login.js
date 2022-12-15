import { useState, useEffect } from "react";
import { Text, Pressable, View, TextInput, ActivityIndicator } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from '../../helpers/Constants.js';
import general from '../../styles/General.js';
import GradiendBF from '../../component/GradientBG.js';
import fetchLink from "../../helpers/fetchLink.js";

let userLoggedIn;

export default function Login( { navigation, route } ) {
    const [user, setUser] = useState('bg@bg.com');
    //const [user, setUser] = useState('miolan96@gmail.com');
    const [password, setPassword] = useState('123456');
    const [loading, setLoading] = useState(false);

    const goToScreen = (value) => {
        navigation.navigate({ name: value });
    }

    const performLogin = () => {
      if(user == '' || password == ''){
        alert("Please fill in all the inputs!")
      }else{
        setLoading(true);

        const userData = {
          email: user,
          password:password,
        }

        //THIS IS FOR ANDROID EMULATOR! MIGHT BE DIFFERENT FOR OTHER DEVICES.
        fetch(fetchLink + '/api/user/?email='+ userData.email + "&password=" + userData.password, {
            method: 'GET'
        }).then(res => res.json()).then(data => {
          setLoading(false);

          if(data.message == "User not found."){
            alert("Please check your email and password.")
          }else{
            userLoggedIn = data
            alert("Login successful!")
            goToScreen(Constants.footer)
          }
        }).catch(function(error) { 
          setLoading(false);
          alert("Sorry there was an error with your request.")
        })
      }
    }

    useEffect(() => {
      if(route.params &&  route.params.user) {
        userLoggedIn = route.params.user;
        alert("Registration was successful!")
        goToScreen(Constants.footer)
      }
    }, []);

    return (
        <SafeAreaView>
            <GradiendBF/>

            <View style={[general.centerContainer, general.paddingH]}>
                <Text style={[ general.whiteTxt, general.headline, general.boldTxt, general.centerTxt]}>Sign In</Text>

                <View style={[general.inputGroup, general.pushBottom]}>
                    <FontAwesome style={general.inputIcon} name="user-o" size={24} color="#f9c746" />
                    <TextInput style={general.input} 
                    onChangeText={setUser} value={user} 
                    placeholder='Username' placeholderTextColor="#FFF" />
                </View>

                <View style={[general.inputGroup, general.pushBottom]}>
                    <AntDesign style={general.inputIcon} name="eyeo" size={24} color="#f9c746" />
                    <TextInput style={general.input} 
                    onChangeText={setPassword} value={password} 
                    placeholder='Password' placeholderTextColor="#FFF" secureTextEntry/>
                </View>

                {loading ?
                  <ActivityIndicator size="large" color="#7a6a52" />
                :
                <>
                  <Pressable onPress={() => performLogin()} style={[general.btn, general.btnDark, general.pushBottom]}>
                      <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>LOGIN</Text>
                  </Pressable>

                  <Pressable onPress={() => goToScreen(Constants.register)} style={[general.btn, general.btnBorder]}>
                      <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>REGISTER</Text>
                  </Pressable>
                </>
                }
                
            </View>
        </SafeAreaView>
    );
}
export {userLoggedIn}