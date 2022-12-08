import { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Pressable, View, TextInput, ScrollView } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import DropDownPicker from "react-native-dropdown-picker";
import GradiendBF from '../../component/GradientBG.js';
import general from '../../styles/General.js';
import rentS from '../../styles/Rent.js';


export default function RentCrud( { navigation } ) {
    const [name, setName] = useState('');
    const [brandOpen, setBrandOpen] = useState(false);
    const [brand, setBrand] = useState(null);
    const [brandList, setBrandList] = useState([
        { label: 'Brand A', value: 0 },
        { label: 'Brand B', value: 1 },
        { label: 'Brand C', value: 2 }
    ]);
    const [price, setPrice] = useState('');
    const [doors, setDoors] = useState('');
    const [seats, setSteats] = useState('');
    const [fuelOpen, setFuelOpen] = useState(false);
    const [fuel, setFuel] = useState(null);
    const [fuelList, setFuelList] = useState([
        { label: 'Electric', value: 0 },
        { label: 'Bio-diesel', value: 1 },
        { label: 'Diesel', value: 2 },
        { label: 'Gasoline', value: 3 },
        { label: 'Ethanol', value: 4 }
    ]);
    const [transOpen, setTransOpen] = useState(false);
    const [trans, setTrans] = useState(null);
    const [transList, setTransList] = useState([
        { label: 'Automatic', value: 0 },
        { label: 'Manual', value: 1 },
        { label: 'CVT', value: 2 },
        { label: 'Semi-automatic', value: 3 }
    ]);
    const [tiresOpen, setTiresOpen] = useState(false);
    const [tires, setTires] = useState(null);
    const [tiresList, setTiresList] = useState([
        { label: 'All-season', value: 0 },
        { label: 'Summer', value: 1 },
        { label: 'Performance', value: 2 },
        { label: 'All-terrain', value: 3 },
        { label: 'Winter', value: 4 }
    ]);
    const [cc, setCc] = useState('');
    const [km, setKm] = useState('');

    useEffect(() => {
        if(fuelOpen) {
            setTransOpen(false);
            setTiresOpen(false);
        }
    }, [fuelOpen]);

    useEffect(() => { if(transOpen) {
        setFuelOpen(false);
        setTiresOpen(false);
    } }, [transOpen]);

    useEffect(() => { if(tiresOpen) {
        setFuelOpen(false);
        setTransOpen(false);
    } }, [tiresOpen]);

    return (
        <SafeAreaView>
            <GradiendBF/>

            <View style={[general.centerContainer]}>
                <Text style={[ general.whiteTxt, general.headline, general.boldTxt, general.centerTxt]}>Rent Your Car:</Text>

                <ScrollView style={[general.fullW, general.paddingH]}>
                    <View style={[general.inputGroup, general.pushBottom]}>
                        <FontAwesome5 style={general.inputIcon} name="car-alt" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={setName} value={name} 
                        placeholder='Car name' placeholderTextColor="#FFF" />
                    </View>
                    
                    <View style={[general.dropdownGroup]}>
                        <AntDesign style={[general.inputIcon, {top: 13}]}  name="car" size={24} color="#f9c746" />
                        <DropDownPicker
                        open={brandOpen}
                        value={brand}
                        items={brandList}
                        style={ general.dropdown }
                        arrowIconStyle={ general.dropdownIcon }
                        placeholderStyle={general.dropdownHolder}
                        labelStyle={{color: '#fff'}}
                        tickIconStyle={{tintColor: '#fff'}}
                        listItemContainerStyle={general.dropdownUnselected}
                        listItemLabelStyle={{color: '#fff'}}
                        selectedItemLabelStyle={general.dropdownSelectTxt}
                        placeholder="Car Brand"
                        listMode="SCROLLVIEW"
                        setOpen={setBrandOpen}
                        setValue={setBrand}
                        setItems={setBrandList}/>
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <FontAwesome style={[general.inputIcon, {top: 12}]} name="money" size={25} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={setPrice} value={price} 
                        placeholder='Dayle Price' placeholderTextColor="#FFF" />
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <FontAwesome style={[general.inputIcon, {top: 12}]} name="address-book-o" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={setName} value={name} 
                        placeholder='Address' placeholderTextColor="#FFF" />
                    </View>

                    <View style={rentS.map}>

                    </View>
                    
                    <View style={[general.inputGroup, general.pushBottom]}>
                        <MaterialCommunityIcons style={general.inputIcon} name="car-door" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={setDoors} value={doors} 
                        placeholder='Doors' placeholderTextColor="#FFF" />
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <MaterialCommunityIcons style={general.inputIcon} name="car-seat" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={setSteats} value={seats} 
                        placeholder='Seats' placeholderTextColor="#FFF" />
                    </View>

                    <View style={[general.dropdownGroup, { zIndex: fuelOpen ? 10 : 1 }]}>
                        <MaterialCommunityIcons style={[general.inputIcon, {top: 13}]}  name="gas-station" size={24} color="#f9c746" />
                        <DropDownPicker
                        open={fuelOpen}
                        value={fuel}
                        items={fuelList}
                        style={[ general.dropdown ]}
                        arrowIconStyle={ general.dropdownIcon }
                        placeholderStyle={general.dropdownHolder}
                        labelStyle={{color: '#fff'}}
                        tickIconStyle={{tintColor: '#fff'}}
                        listItemContainerStyle={general.dropdownUnselected}
                        listItemLabelStyle={{color: '#fff'}}
                        selectedItemLabelStyle={general.dropdownSelectTxt}
                        placeholder="Fuel Type"
                        listMode="SCROLLVIEW"
                        setOpen={setFuelOpen}
                        setValue={setFuel}
                        setItems={setFuelList}/>
                    </View>

                    <View style={[general.dropdownGroup, { zIndex: transOpen ? 10 : 1 } ]}>
                        <Entypo style={[general.inputIcon, {top: 13}]}  name="flow-cascade" size={24} color="#f9c746" />
                        <DropDownPicker
                        open={transOpen}
                        value={trans}
                        items={transList}
                        style={[ general.dropdown ]}
                        arrowIconStyle={ general.dropdownIcon }
                        placeholderStyle={general.dropdownHolder}
                        labelStyle={{color: '#fff'}}
                        tickIconStyle={{tintColor: '#fff'}}
                        listItemContainerStyle={general.dropdownUnselected}
                        listItemLabelStyle={{color: '#fff'}}
                        selectedItemLabelStyle={general.dropdownSelectTxt}
                        placeholder="Transmition Type"
                        listMode="SCROLLVIEW"
                        setOpen={setTransOpen}
                        setValue={setTrans}
                        setItems={setTransList}/>
                    </View>

                    <View style={[general.dropdownGroup, { zIndex: tiresOpen ? 10 : 1 } ]}>
                        <MaterialCommunityIcons style={[general.inputIcon, {top: 13}]}  name="tire" size={24} color="#f9c746" />
                        <DropDownPicker
                        open={tiresOpen}
                        value={tires}
                        items={tiresList}
                        style={[ general.dropdown ]}
                        arrowIconStyle={ general.dropdownIcon }
                        placeholderStyle={general.dropdownHolder}
                        labelStyle={{color: '#fff'}}
                        tickIconStyle={{tintColor: '#fff'}}
                        listItemContainerStyle={general.dropdownUnselected}
                        listItemLabelStyle={{color: '#fff'}}
                        selectedItemLabelStyle={general.dropdownSelectTxt}
                        placeholder="Tires Type"
                        listMode="SCROLLVIEW"
                        setOpen={setTiresOpen}
                        setValue={setTires}
                        setItems={setTiresList}/>
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <MaterialCommunityIcons style={general.inputIcon} name="engine" size={27} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={setCc} value={cc} 
                        placeholder='Cylinder Capacity (cc)' placeholderTextColor="#FFF" />
                    </View>
                    
                    <View style={[general.inputGroup, general.pushBottom]}>
                        <Ionicons style={general.inputIcon} name="speedometer-outline" size={27} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={setKm} value={km} 
                        placeholder='Max speed (km)' placeholderTextColor="#FFF" />
                    </View>

                    <Pressable onPress={() => goToScreen(Constants.footer)} style={[general.btn, general.btnDark, general.pushBottom]}>
                        <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>CREATE</Text>
                    </Pressable>

                    <View style={{marginBottom: 50}}></View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}