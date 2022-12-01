import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Import const values
import Constants from '../../helpers/Constants.js';
// Import styles
import general from '../../styles/General.js';

export default function Intro( { navigation } ) {
    const goToScreen = (value) => {
        navigation.navigate({ name: value });
    }

    return (
        <SafeAreaView>
            <Text style={ general.whiteTxt }>Intro Page</Text>
            <Button onPress={() => goToScreen(Constants.login)} title='Go To Login'/>
            <Button onPress={() => goToScreen(Constants.register)} title='Go To Register'/>
        </SafeAreaView>
    );
}