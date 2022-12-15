import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Pressable, FlatList, Image } from 'react-native';
import GradiendBF from '../../component/GradientBG.js';
import Constants from '../../helpers/Constants.js';
import fetchLink from '../../helpers/fetchLink.js';
import general from '../../styles/General.js';
import rentS from '../../styles/Rent.js';
import car from '../../assets/car.jpg';
import { userLoggedIn } from '../Authentication/Login.js';


export default function Rent( { navigation } ) {
    const [carList, setCarList] = useState(null);
    const carCrud = (index, isEditMode) => {
        const tempCar = isEditMode ? carList[index] : null;
        navigation.navigate(Constants.rentcrud, { isEdit: isEditMode, car: tempCar })
    }

    const loadUserCars = async () => {
        fetch(fetchLink + '/api/car/' + userLoggedIn._id, {
            method: 'GET'
        }).then(res => res.json()).then(data => {
            console.log(data);
            setCarList(data);
        }).catch(function(error) { 
          console.log(error); 
        })
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadUserCars();
        });
      
        return unsubscribe;
      }, [navigation]);

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
                    <Pressable onPress={() => carCrud(index, true)}
                    style={[general.carBlock]}>
                        <View style={general.carBlockMedia}>
                            <Image style={general.carBlockImg} source={{uri : fetchLink + '/uploads/cars/' +  item.photo}}/>
                        </View>
                        <View style={general.carBlockL}>
                            <Text style={[general.blockName]}>{item.name}</Text>
                            <Text style={[general.blockBrand]}>{item.brand}</Text>
                            <Text style={[general.blockPrice]}>${item.price}</Text>
                        </View>
                    </Pressable>
                }/>
            </View>

            <View style={general.bottomLine}></View>
        </SafeAreaView>
    );
}