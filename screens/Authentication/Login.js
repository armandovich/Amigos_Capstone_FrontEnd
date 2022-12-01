import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Import const values
import Constants from '../../helpers/Constants.js';
// Import styles
import general from '../../styles/General.js';


export default function Login( { navigation } ) {
    const goToScreen = (value) => {
        navigation.navigate({ name: value });
    }

    return (
        <SafeAreaView>
            <Text style={ general.whiteTxt }>Login Page</Text>
            <Button onPress={() => goToScreen(Constants.register)} title='Go To Register'/>
            <Button onPress={() => goToScreen(Constants.reset)} title='Go To Reset Password'/>
        </SafeAreaView>
    );
}