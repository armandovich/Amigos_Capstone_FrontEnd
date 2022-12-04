import { Video } from 'expo-av';
import { Text, Image, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from '../../helpers/Constants.js';
import carImg from '../../assets/car.png';
import introS from '../../styles/Intro.js';
import general from '../../styles/General.js';
import GradiendBF from '../../component/GradientBG.js';
import videoBG from '../../assets/background.mp4';

export default function Intro( { navigation } ) {
    const goToScreen = (value) => {
        navigation.navigate({ name: value });
    }

    return (
        <SafeAreaView>
            <GradiendBF/>
            <Video
            style={ introS.video }
            source={ videoBG }
            shouldPlay
            useNativeControls={ false }
            resizeMode="cover"
            isLooping
            />

            <Image style={introS.topImage} source={carImg}/>
        
            <View style={introS.container}>
                <Pressable onPress={() => goToScreen(Constants.login)} style={[general.btn, general.btnDark, general.btnMaxWidth, general.pushBottom]}>
                    <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>LOGIN</Text>
                </Pressable>

                <Pressable onPress={() => goToScreen(Constants.register)} style={[general.btn, general.btnBorder, general.btnMaxWidth ]}>
                    <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>REGISTER</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}