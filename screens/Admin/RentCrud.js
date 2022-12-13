import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Pressable, View, TextInput, ScrollView, Image, Button } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import DropDownPicker from "react-native-dropdown-picker";
import GradiendBF from '../../component/GradientBG.js';
import general from '../../styles/General.js';
import rentS from '../../styles/Rent.js';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Marker , Callout } from "react-native-maps";
import * as location from "expo-location";



export default function RentCrud( { navigation } ) {
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const [image, setImage] = useState(null);
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

    //MAPS
    const[Location,setLocation] = useState(null)
    const[errorMsg,seterrorMsg] = useState(null)
    const[mapRegion,setMapRegion] = useState(null)
    const [marker, setMarker] = useState([]);


    const [sLocation, setsLocation] = useState([
        { latitude: 'LATITUDE' },
        { longitude: 'LONGITUDE' } ,
        { longitudeDelta: 'LONGITUDE_DELTA' },
        { latitudeDelta: 'LATITUDE_DELTA' }

    ]);


    //initial region
    const collegeRegion = {
        latitude: 43.77335,
        longitude: -79.335951,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        
      };


    const [cc, setCc] = useState('');
    const [km, setKm] = useState('');

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };

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

    useEffect(() => {
        (async() => {
            let { status } = await location.requestForegroundPermissionsAsync();
            if (status !== "granted"){
                seterrorMsg("Permissions to access location was denied")
            }

            let loc = await location.getCurrentPositionAsync({});
            setMapRegion({
                longitude: loc.coords.longitude,
                latitude: loc.coords.latitude,
                longitudeDelta: 0.0922,
                latitudeDelta: 0.0421
            })
            setLocation(loc);
        })();
    },[]);

    const handleNewMarker = (coordinate) => {
        setMarker([ coordinate]);
      };


    return (
        <SafeAreaView>
            <GradiendBF/>

            <View style={[general.centerContainer]}>
                <Text style={[ general.whiteTxt, general.headline, general.boldTxt, general.centerTxt]}>Rent Your Car:</Text>

                <ScrollView style={[general.fullW, general.paddingH]}>
                    <View style={rentS.pickerContainer}>
                        {image ? 
                            <Image style={rentS.pickerImg} source={{ uri: image }}/>
                        :
                            <View style={[general.flexRow, general.centerContainer]}>
                                <FontAwesome name="image" size={24} color="#f9c746" />
                                <Text style={[general.yellowTxt, general.boldTxt, {marginLeft: 15}]}>Car Image</Text>
                            </View>
                        }
                        <Pressable style={rentS.openPicker} onPress={pickImage} ></Pressable>
                    </View>

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
                        placeholder='Daily Price' placeholderTextColor="#FFF" />
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <FontAwesome style={[general.inputIcon, {top: 12}]} name="address-book-o" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={setName} value={name} 
                        placeholder='Address' placeholderTextColor="#FFF" />
                    </View>

                    <View style={rentS.map}>
                        
                    <MapView style={{height: '100%', width: '100%'} }
                    provider={PROVIDER_GOOGLE}
                    initialRegion={mapRegion}
                    // onRegionChangeComplete={mapRegion}

                    showsUserLocation={true}  
                    showsMyLocationButton={true}
                    followsUserLocation={true}
                    showsCompass={true}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    pitchEnabled={true}
                    rotateEnabled={true}
                    
                    

                 
                    onPress={(e) => {
                        handleNewMarker(e.nativeEvent.coordinate)
                        setsLocation(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude,e.nativeEvent.coordinate.latitudeDelta,e.nativeEvent.longitudeDelta)
                        alert("Pickup Location updated")

                    }}


                     >
                        {marker.length > 0 &&
                        marker.map((m) => {
                            return (
                            <Marker coordinate={m} key={1} />
                            );
                        })}
                                

                    </MapView>
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