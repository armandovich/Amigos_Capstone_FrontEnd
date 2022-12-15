import { useState, useEffect } from "react";
import { Text, Image, ScrollView, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Constants from '../../helpers/Constants.js';
import Validations from "../../helpers/Validations..js";
import general from '../../styles/General.js';
import carS from '../../styles/CarDetail.js';
import GradiendBF from '../../component/GradientBG.js';
import fetchLink from "../../helpers/fetchLink.js";
import carImage from '../../assets/car.jpg';
import Stars from '../../component/Stars.js';
import CarSpects from "../../component/CarSpects.js";
import { userLoggedIn } from "../Authentication/Login.js";

export default function CarDetail( { navigation, route } ) {
    const [car, setCar] = useState(route.params.car);
    const [days, setDays] = useState(0);
    const [cost, setCost] = useState(0);
    const [fromDate, setFromDate] = useState('Choose');
    const [toDate, setToDate] = useState('Choose');
    const [pickStartDate, setPickStartDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [first, setFirst] = useState(true);

    const performCheckout = () => {
        if(days <= 0) {
            alert("You must rent the car atleast for 1 day to checkout.");
        } else {
            const tempData = {
                amount: cost,
                fromDate: fromDate,
                toDate: toDate,
                car: car,
                days: days,
                renter: userLoggedIn
            };

            navigation.navigate(Constants.checkout, { data: tempData })
        }
    }

    const goBack = () => {
        navigation.goBack()
    };

    const onChange = (event, selectedDate) => {
        if(event.type == "set") {
            if(pickStartDate) {
                setToDate(Validations.formatDate(selectedDate));
            } else {
                setFromDate(Validations.formatDate(selectedDate));
            }

            setDate(selectedDate);
        }
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };
    const showDatepicker = async (isToDate) => {
        if(pickStartDate == isToDate) {
            showMode('date');
        } else {
            setPickStartDate(isToDate);
        }
    };

    const goToScreen = (value) => {
        navigation.navigate({ name: value });
    }

    const calculateDays = (date1, date2) =>{
        let difference = new Date(date2).getTime() - new Date(date1).getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays;
    }

    const checkDayCost = () => {
        if(Validations.isValidDate(fromDate) && Validations.isValidDate(toDate)) {
            const d1 = new Date(fromDate);
            const d2 = new Date(toDate);
            const dN = calculateDays(d1, d2);
            if(dN >= 0) {
                setDays(dN + 1);
            } else {
                setDays(0);
            }
            console.log('TOTAL DAYS', calculateDays(d1, d2));
        }
    }

    useEffect(() => {
        if(first) {
            setFirst(false);
        } else {
            showMode('date');
        }
    }, [pickStartDate]);

    useEffect(() => {
        checkDayCost();
    }, [fromDate, toDate]);

    useEffect(() => {
        setCost(days * car.price);
    }, [days]);

    return (
        <SafeAreaView>
            <GradiendBF/>
            
            <Pressable onPress={goBack} style={[general.backBtn]}>
                <Ionicons name="md-chevron-back" style={general.backIcon} size={24} color="#f9c746" />
                <Text style={[general.yellowTxt, general.boldTxt]}>BACK</Text>
            </Pressable>

            <ScrollView>
                <Image style={carS.carImg} source={{uri : fetchLink + '/uploads/cars/' +  car.photo}}/>

                <View style={[general.fullW, general.paddingH]}>

                    <View style={[general.flexRow, general.flexEven, { marginBottom: 10, alignItems: 'center'}]}>
                        <View>
                            <Text style={[general.whiteTxt, general.boldTxt, carS.carName]}>{car.name}</Text>

                            <Text style={[general.whiteTxt, carS.carBrand]}>{car.brand}</Text>

                            <View style={general.flexRow}>
                                <Stars score={car.score} size={12} color={'#fff'}/>
                                <Stars score={car.score - 1} size={12} color={'#fff'}/>
                                <Stars score={car.score - 2} size={12} color={'#fff'}/>
                                <Stars score={car.score - 3} size={12} color={'#fff'}/>
                                <Stars score={car.score - 4} size={12} color={'#fff'}/>
                            </View>

                            <Text style={[carS.carReview, general.whiteTxt]}>{car.score} reviews</Text>
                        </View>

                        <View>
                            <Text style={[general.yellowTxt, general.boldTxt, carS.carPrice]}>${car.price}</Text>
                            <View style={carS.carLine}></View>
                            <Text style={[general.boldTxt, general.whiteTxt, carS.carDay]}>Day</Text>
                        </View>
                    </View>

                    <Text style={[general.yellowTxt, general.boldTxt, general.pushTop, carS.carSpecsHeadline]}>Car spesification:</Text>

                    <CarSpects car={car}/>

                    <Text style={[general.yellowTxt, general.boldTxt, general.pushBottom, general.pushTop]}>Rent duration:</Text>

                    <View style={[general.flexRow, general.flexEven]}>
                        <View style={general.datePickerCont}>
                            <Text style={general.datePickerLabel}>FROM:</Text>

                            <Pressable onPress={() => showDatepicker(false)} style={general.datePicker}>
                                <FontAwesome style={general.inputIcon} name="calendar-check-o" size={18} color="#f9c746" />
                                <Text style={general.datePickerTxt}>{fromDate}</Text>
                            </Pressable>
                        </View>

                        <View style={general.datePickerCont}>
                            <Text style={general.datePickerLabel}>TO:</Text>

                            <Pressable onPress={() => showDatepicker(true)} style={general.datePicker}>
                                <FontAwesome style={general.inputIcon} name="calendar-times-o" size={18} color="#f9c746" />
                                <Text style={general.datePickerTxt}>{toDate}</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={[general.flexRow, general.flexEven, general.pushBottom]}>
                        <View style={[general.datePickerCont, {alignItems: 'center'}]}>
                            <Text style={general.datePickerLabel}>Total days:</Text>
                            <Text style={[general.yellowTxt, general.boldTxt, {fontSize: 25}]}>{days}</Text>
                        </View>

                        <View style={[general.datePickerCont, {alignItems: 'center'}]}>
                            <Text style={general.datePickerLabel}>Total Cost:</Text>
                            <Text style={[general.yellowTxt, general.boldTxt, {fontSize: 25}]}>${cost}</Text>
                        </View>
                    </View>

                    <Pressable onPress={performCheckout} style={[general.btn, general.btnDark, general.pushBottom]}>
                        <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>CHECKOUT</Text>
                    </Pressable>
                </View>

                <View style={{marginBottom: 150}}></View>
            </ScrollView>
            
        </SafeAreaView>
    );
}