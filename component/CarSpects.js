import { useState } from "react";
import { MaterialCommunityIcons, Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import general from '../styles/General.js';
import carS from '../styles/CarDetail.js';

export default function CarSpects(props) {
    const [car, setCar] = useState(props.car);

    return (
        <View style={carS.carSpecs}>
            <View style={carS.carDetail}>
                <MaterialCommunityIcons name="car-door" size={24} color="#f9c746" />
                <Text style={[general.whiteTxt, carS.carSpectTxt]}>{car.doors} Doors</Text>
            </View>

            <View style={carS.carDetail}>
                <MaterialCommunityIcons name="car-seat" size={24} color="#f9c746" />
                <Text style={[general.whiteTxt, carS.carSpectTxt]}>{car.seats} Seats</Text>
            </View>

            <View style={carS.carDetail}>
                <MaterialCommunityIcons name="gas-station" size={24} color="#f9c746" />
                <Text style={[general.whiteTxt, carS.carSpectTxt]}>{car.fuel}</Text>
            </View>

            <View style={carS.carDetail}>
                <Entypo name="flow-cascade" size={24} color="#f9c746" />
                <Text style={[general.whiteTxt, carS.carSpectTxt]}>{car.transmition}</Text>
            </View>

            <View style={carS.carDetail}>
                <MaterialCommunityIcons name="tire" size={24} color="#f9c746" />
                <Text style={[general.whiteTxt, carS.carSpectTxt]}>{car.tires} Tires</Text>
            </View>
            
            <View style={carS.carDetail}>
                <MaterialCommunityIcons name="engine" size={24} color="#f9c746" />
                <Text style={[general.whiteTxt, carS.carSpectTxt]}>{car.cc}cc</Text>
            </View>

            <View style={carS.carDetail}>
                <Ionicons name="speedometer-outline" size={24} color="#f9c746" />
                <Text style={[general.whiteTxt, carS.carSpectTxt]}>{car.max_speed}km</Text>
            </View>

            <View style={carS.carDetail}>
                <FontAwesome name="location-arrow" size={24} color="#f9c746" />
                <Text style={[general.whiteTxt, carS.carSpectTxt]}>GPS</Text>
            </View>

            <View style={carS.carDetail}>
                <MaterialCommunityIcons name="bluetooth" size={24} color="#f9c746" />
                <Text style={[general.whiteTxt, carS.carSpectTxt]}>Bluetooth</Text>
            </View>
        </View>
    );
}
