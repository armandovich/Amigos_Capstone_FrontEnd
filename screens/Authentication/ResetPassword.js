import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from '../../helpers/Constants.js';
import general from '../../styles/General.js';
import GradiendBF from '../../component/GradientBG.js';

export default function ResetPassword( { navigation } ) {
    const goToScreen = (value) => {
        navigation.navigate({ name: value });
    }

    return (
        <SafeAreaView>
            <GradiendBF/>
            <Text style={ general.whiteTxt }>Reset Password Page</Text>
            <Button onPress={() => goToScreen(Constants.login)} title='Go To Login'/>
        </SafeAreaView>
    );
}