import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ScrollView, View, FlatList, Pressable, Image } from 'react-native';
import GradiendBF from '../../component/GradientBG.js';
import general from '../../styles/General.js';
import fetchLink from '../../helpers/fetchLink.js';
import { userLoggedIn } from '../Authentication/Login.js';
import { useState, useEffect } from "react";


export default function Trip( { navigation } ) {
    const [tripList, setTripList] = useState(null);

    const formatDate = (value) => {
        return new Date(value).toISOString().slice(0, 10);
      }

    const loadTrips = async () => {
        fetch(fetchLink + '/api/trip/' + userLoggedIn._id, {
            method: 'GET'
        }).then(res => res.json()).then(data => {
            console.log(data);
            setTripList(data);
        }).catch(function(error) { 
          console.log(error); 
        })
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadTrips();
        });
        return unsubscribe;
      }, [navigation]);

    return (
        <SafeAreaView>
            <GradiendBF/>
            
            <View style={[general.paddingH, general.fullW]}>
                <Text style={[general.headline, general.whiteTxt]}>Cars you rented:</Text>
            </View>

            <View style={[general.carBlockList, general.tripHeight]}>
                <FlatList style={[general.fullW, general.paddingH]}
                data={tripList} 
                renderItem={({ item, index }) => 
                    <Pressable
                    style={[general.carBlock]}>
                        <View style={general.carBlockMedia}>
                            <Image style={general.carBlockImg} source={{uri : fetchLink + '/uploads/cars/' +  item.photo}}/>
                        </View>
                        <View style={general.carBlockL}>
                            <Text style={[general.blockName]}>{item.car_name}</Text>
                            <Text style={[general.blockBrand]}>{item.car_brand}</Text>
                            <Text style={[general.blockPrice]}>Total Cost: ${item.cost}</Text>
                            <Text style={[general.blockPrice]}>From: {formatDate(item.start_date)}</Text>
                            <Text style={[general.blockPrice]}>To:      {formatDate(item.end_date)}</Text>
                            
                        </View>
                    </Pressable>
                }/>
            </View>

            <View style={general.bottomLine}></View>
        </SafeAreaView>
    );
}