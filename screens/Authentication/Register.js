import { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ScrollView, View, TextInput, Pressable } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign, FontAwesome, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from '../../helpers/Constants.js';
import general from '../../styles/General.js';
import GradiendBF from '../../component/GradientBG.js';
import fetchLink from "../../helpers/fetchLink.js";
import { userLoggedIn } from "./Intro.js";

export default function Register( { navigation } ) {
    const [fName, setFName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verify, setVerify] = useState('');
    // Dropdown attributes
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [countryList, setCountryList] = useState([
        { label: 'Canada', value: 0 },
        { label: 'United States', value: 1 },
        { label: 'Dominican Republic', value: 2 }
    ]);

    const goToScreen = (value) => {
        navigation.navigate({ name: value });
    }

    const performRegister = () => {
        if(email == '' || password == '' || fName == '' || lastName == '' || verify == '' || value == null){
            alert("Please fill all the inputs!")
        }else if(password != verify){
            alert("Passwords are not the same!")
        }else if(password.length <6){
            alert("Password must be at least 6 characters!")
        }else{
            let cntry = ""
            for(let i=0;i<countryList.length;i++){
                if(countryList[i].value == value){
                    cntry = countryList[i].label
                    break
                }
            }
            const userData = {
                first_name: fName,
                last_name: lastName,
                country: cntry,
                email: email,
                password:password,
            }

             //THIS IS FOR ANDROID EMULATOR! MIGHT BE DIFFERENT FOR OTHER DEVICES.
            fetch(fetchLink + '/api/user/', { 
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            },
            }).then(res => res.json()).then(data => console.log(data));
            alert("Registration was successful! You can now Sign in.")
            //goToScreen(Constants.footer)
            navigation.replace(Constants.login);
    }
}

    return (
        <SafeAreaView>
            <GradiendBF/>
            <View style={[general.centerContainer]}>
                <ScrollView style={[general.fullW, general.paddingH]}>
                    <Text style={[ general.whiteTxt, general.headline, general.boldTxt, general.centerTxt]}>Sing Up</Text>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <FontAwesome style={general.inputIcon} name="user-o" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={text => setFName(text)}
                        placeholder='First Name' placeholderTextColor="#FFF" />
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <FontAwesome style={general.inputIcon} name="user-o" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={text => setLastName(text)}
                        placeholder='Last Name' placeholderTextColor="#FFF" />
                    </View>

                    <View style={[general.dropdownGroup]}>
                        <Fontisto  style={[general.inputIcon, {top: 13}]} name="world-o" size={24} color="#f9c746" />
                        <DropDownPicker
                        open={open}
                        value={value}
                        items={countryList}
                        style={ general.dropdown }
                        arrowIconStyle={ general.dropdownIcon }
                        placeholderStyle={general.dropdownHolder}
                        labelStyle={{color: '#fff'}}
                        tickIconStyle={{tintColor: '#fff'}}
                        listItemContainerStyle={general.dropdownUnselected}
                        listItemLabelStyle={{color: '#fff'}}
                        selectedItemLabelStyle={general.dropdownSelectTxt}
                        placeholder="Country"
                        listMode="SCROLLVIEW"
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setCountryList}/>
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <MaterialCommunityIcons style={general.inputIcon} name="email-outline" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={text => setEmail(text)} 
                        placeholder='Email' placeholderTextColor="#FFF" />
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <AntDesign style={general.inputIcon} name="eyeo" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={text => setPassword(text)} 
                        placeholder='Password' placeholderTextColor="#FFF" secureTextEntry/>
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <AntDesign style={general.inputIcon} name="eyeo" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={text => setVerify(text)} 
                        placeholder='Verify Password' placeholderTextColor="#FFF" secureTextEntry/>
                    </View>

                    <Pressable onPress={() => performRegister()} style={[general.btn, general.btnDark, general.pushBottom]}>
                        <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>REGISTER</Text>
                    </Pressable>

                    <Pressable onPress={() => goToScreen(Constants.login)} style={[general.btn, general.btnBorder]}>
                        <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>LOGIN</Text>
                    </Pressable>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}