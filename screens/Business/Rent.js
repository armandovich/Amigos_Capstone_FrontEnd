import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Pressable, FlatList, Image } from 'react-native';
import GradiendBF from '../../component/GradientBG.js';
import Constants from '../../helpers/Constants.js';
import general from '../../styles/General.js';
import rentS from '../../styles/Rent.js';
import car from '../../assets/car.jpg';

const tempList = [
    { name: 'Car Name A', brand: 'Brand Here', price: 200 },
    { name: 'Car Name B', brand: 'Brand Here', price: 200 },
    { name: 'Car Name C', brand: 'Brand Here', price: 200 },
    { name: 'Car Name C', brand: 'Brand Here', price: 200 },
    { name: 'Car Name C', brand: 'Brand Here', price: 200 },
    { name: 'Car Name C', brand: 'Brand Here', price: 200 },
    { name: 'Car Name C', brand: 'Brand Here', price: 200 },
];

export default function Rent( { navigation } ) {
    const [carList, setCarList] = useState(tempList);
    const carCrud = (index, isEditMode) => {
        navigation.navigate(Constants.rentcrud, { isEdit: isEditMode, car: carList[index] })
    }

    return (
        <SafeAreaView>
            <GradiendBF/>
            
            <View style={[general.paddingH, general.fullW]}>
                <Text style={[general.headline, general.whiteTxt]}>Your Cars:</Text>
               
                <Pressable onPress={() => carCrud(0, false)} 
                style={[rentS.addBtn]}>
                    <Entypo name="plus" size={24} color="#f9c746" />
                </Pressable>
            </View>


            <View style={general.carBlockList}>
                <FlatList style={[general.fullW, general.paddingH]}
                data={carList} 
                renderItem={({ item, index }) => 
                    <View style={[general.carBlock]}>
                        <View style={general.carBlockMedia}>
                            <Image style={general.carBlockImg} source={car}/>
                        </View>
                        <View style={general.carBlockL}>
                            <Text style={[general.blockName]}>{item.name}</Text>
                            <Text style={[general.blockBrand]}>{item.brand}</Text>
                            <Text style={[general.blockPrice]}>${item.price}</Text>
                        </View>
                    </View>
                }/>
            </View>

            <View style={general.bottomLine}></View>
        </SafeAreaView>
    );
}