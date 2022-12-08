import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Pressable } from 'react-native';
import GradiendBF from '../../component/GradientBG.js';
import Constants from '../../helpers/Constants.js';
import general from '../../styles/General.js';
import rentS from '../../styles/Rent.js';

export default function Rent( { navigation } ) {
    const carCrud = (index, isEditMode) => {
        navigation.navigate(Constants.rentcrud, { editMode: isEditMode })
    }

    return (
        <SafeAreaView>
            <GradiendBF/>
            
            <View style={[general.paddingH, general.pushTop]}>
                <Text style={[general.headline, general.whiteTxt]}>Your Cars:</Text>

                <Pressable onPress={() => carCrud(0, false)} 
                style={[rentS.addBtn]}>
                    <Entypo name="plus" size={24} color="#f9c746" />
                </Pressable>
            </View>
        </SafeAreaView>
    );
}