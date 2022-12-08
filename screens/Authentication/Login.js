import { useState } from "react";
import { Text, Pressable, View, TextInput, ScrollView } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from '../../helpers/Constants.js';
import general from '../../styles/General.js';
import GradiendBF from '../../component/GradientBG.js';


export default function Login( { navigation } ) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const goToScreen = (value) => {
        navigation.navigate({ name: value });
    }

    const performLogin = () => {
        // TO - DO
    }

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
                    placeholder='Password' placeholderTextColor="#FFF"/>
                </View>

                <Pressable onPress={() => goToScreen(Constants.footer)} style={[general.btn, general.btnDark, general.pushBottom]}>
                    <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>LOGIN</Text>
                </Pressable>

                <Pressable onPress={() => goToScreen(Constants.register)} style={[general.btn, general.btnBorder]}>
                    <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>REGISTER</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}