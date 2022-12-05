import { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ScrollView, View, TextInput, Pressable } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from '../../helpers/Constants.js';
import general from '../../styles/General.js';
import GradiendBF from '../../component/GradientBG.js';

export default function Register( { navigation } ) {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verify, setVerify] = useState('');
    // Dropdown attributes
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [countryList, setCountryList] = useState([
        { label: 'Country A', value: 0 },
        { label: 'Country B', value: 1 },
        { label: 'Country C', value: 2 }
    ]);

    const goToScreen = (value) => {
        navigation.navigate({ name: value });
    }

    const performRegister = () => {
        // TO - DO
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
                        onChangeText={setFName} value={fName} 
                        placeholder='First Name' placeholderTextColor="#FFF" />
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <FontAwesome style={general.inputIcon} name="user-o" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChange={setLName} value={lName} 
                        placeholder='Lasst Name' placeholderTextColor="#FFF" />
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
                        onChange={setEmail} value={email} 
                        placeholder='Email' placeholderTextColor="#FFF" />
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <AntDesign style={general.inputIcon} name="eyeo" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChange={setPassword} value={password} 
                        placeholder='Password' placeholderTextColor="#FFF" />
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <AntDesign style={general.inputIcon} name="eyeo" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChange={setVerify} value={verify} 
                        placeholder='Verify Password' placeholderTextColor="#FFF" />
                    </View>

                    <Pressable onPress={() => goToScreen(Constants.register)} style={[general.btn, general.btnDark, general.pushBottom]}>
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