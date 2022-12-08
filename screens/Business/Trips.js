import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ScrollView, View } from 'react-native';
import GradiendBF from '../../component/GradientBG.js';
import general from '../../styles/General.js';

export default function Trip( { navigation } ) {
    return (
        <SafeAreaView>
            <GradiendBF/>
            
            <View style={[general.centerContainer]}>
                <ScrollView style={[general.fullW, general.paddingH]}>
                    <Text style={[ general.whiteTxt, general.headline, general.boldTxt, general.centerTxt]}>Trip</Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}