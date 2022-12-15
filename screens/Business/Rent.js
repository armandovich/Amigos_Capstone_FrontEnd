import { useState, useEffect } from 'react';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Pressable, FlatList, Image, ActivityIndicator } from 'react-native';
import GradiendBF from '../../component/GradientBG.js';
import Constants from '../../helpers/Constants.js';
import fetchLink from '../../helpers/fetchLink.js';
import general from '../../styles/General.js';
import rentS from '../../styles/Rent.js';
import car from '../../assets/car.jpg';
import { userLoggedIn } from '../Authentication/Login.js';


export default function Rent( { navigation } ) {
    const [loading, setLoading] = useState(true);
    const [carList, setCarList] = useState([]);
    const carCrud = (index, isEditMode) => {
        const tempCar = isEditMode ? carList[index] : null;
        navigation.navigate(Constants.rentcrud, { isEdit: isEditMode, car: tempCar })
    }

    const loadUserCars = async () => {
        fetch(fetchLink + '/api/car/' + userLoggedIn._id, {
            method: 'GET'
        }).then(res => res.json()).then(data => {
            setLoading(false);
            setCarList(data);
        }).catch(function(error) { 
            setLoading(false);
          //console.log(error); 
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
                <Pressable onPress={() => carCrud(0, false)} 
                style={[rentS.addBtn, general.pushTop]}>
                    <Entypo name="plus" style={{marginRight: 8}} size={24} color="#f9c746" />
                    <Text style={[general.yellowTxt, general.boldTxt]}>Rent New Car</Text>
                </Pressable>
            </View>


            <View style={[general.carBlockList, general.rentHeight]}>
                <FlatList style={[general.fullW, general.paddingH]}
                ListHeaderComponent={
                    <>
                    { loading ?
                        <ActivityIndicator size="large" color="#7a6a52" />
                    :<></>}

                    { !loading && carList.length <= 0?
                        <Text style={[general.yellowTxt, general.boldTxt, general.pushTop, {textAlign: 'center'}]}>No Car Posted</Text>
                    :
                    <></>
                    }
                    </>
                }
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