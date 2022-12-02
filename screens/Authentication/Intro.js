import { Text, Button, Image, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from '../../helpers/Constants.js';
import general from '../../styles/General.js';
import introS from '../../styles/Intro.js';
import carImg from '../../assets/car.png';

export default function Intro( { navigation } ) {
    const goToScreen = (value) => {
        navigation.navigate({ name: value });
    }

    return (
        <SafeAreaView>
            <LinearGradient colors={['#221d1b', '#4b4030']} style={introS.fullExpand}/>
            <Image style={introS.topImage} source={carImg}/>

            <View style={introS.container}>
                <Pressable style={[general.btn, general.btnBorder, general.pushBottom]}>
                    <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>LOG IN</Text>
                </Pressable>

                <Pressable style={[general.btn, general.btnDark]}>
                    <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>REGISTER</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}