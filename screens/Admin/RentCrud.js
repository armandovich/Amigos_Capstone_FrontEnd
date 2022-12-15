import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Pressable, View, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import DropDownPicker from "react-native-dropdown-picker";
import GradiendBF from '../../component/GradientBG.js';
import general from '../../styles/General.js';
import rentS from '../../styles/Rent.js';
import Constants from '../../helpers/Constants.js';
import fetchLink from '../../helpers/fetchLink.js';
import { userLoggedIn } from '../Authentication/Login.js';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Marker , Callout } from "react-native-maps";
import * as location from "expo-location";

export default function RentCrud( { navigation, route } ) {
    const [car, setCar] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [brandOpen, setBrandOpen] = useState(false);
    const [brand, setBrand] = useState(null);
    const [brandList, setBrandList] = useState(Constants.brandList);
    const [price, setPrice] = useState(0);
    const [address, setAddress] = useState('');
    const [doors, setDoors] = useState(0);
    const [seats, setSteats] = useState(0);
    const [fuelOpen, setFuelOpen] = useState(false);
    const [fuel, setFuel] = useState(null);
    const [fuelList, setFuelList] = useState(Constants.fuelTypes);
    const [transOpen, setTransOpen] = useState(false);
    const [trans, setTrans] = useState(null);
    const [transList, setTransList] = useState(Constants.transmitionTypes);
    const [tiresOpen, setTiresOpen] = useState(false);
    const [tires, setTires] = useState(null);
    const [tiresList, setTiresList] = useState(Constants.tierTypes);
    const [cc, setCc] = useState(0);
    const [km, setKm] = useState(0);
    const [loading, setLoading] = useState(false);

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

    const goBack = () => {
        navigation.goBack()
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };

    const requestMapPermission = async() => {
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
    };

    const performCarCreation = () => {
        if(!image && marker.length <= 0 || name == '' || brand == null || price == '' || address == '' || 
        doors == '' || seats == '' || fuel == null || trans == null || tires == null) {
            alert("Please fill all the inputs!")
        } else {
            createCar();
        }
    }

    const performCarUdate = () => {
        if(!image && marker.length <= 0 || name == '' || brand == null || price == '' || address == '' || 
        doors == '' || seats == '' || fuel == null || trans == null || tires == null) {
            alert("Please fill all the inputs!")
        } else {
            updateCar();
        }
    }

    const createCar = async () => {
        const carData = {
            name: name,
            brand: brand,
            price: price,
            address: address,
            latitude: marker[0].latitude,
            longitude: marker[0].longitude,
            doors: doors,
            seats: seats,
            fuel: fuel,
            transmition: trans,
            tires, tires,
            cc: cc,
            max_speed: km,
            owner_id: userLoggedIn._id
        };

        setLoading(true);

        let data = new FormData();

        let filename = image.split('\\/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        data.append('photo', { uri: image, name: filename, type });
        data.append('car', JSON.stringify(carData))

        fetch(fetchLink + '/api/car/', { 
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: data
        }).then(res => res.json()).then(data => {
            setLoading(false);

            if(data && data.message) {
                alert(data.message)
            } else {
                clearInputs();
                alert("Car has been created.")
            }
        }).catch(err => {
            setLoading(false);

            if(err.name == 'TypeError') {
                clearInputs();
                alert("Car has been created.")
            } else {
                alert("Sorry there was an error with your request.")
            }
        });
    };

    const updateCar = async () => {
        
        const carData = {
            photo: car.photo,
            name: name,
            brand: brand,
            price: price,
            address: address,
            latitude: marker[0].latitude,
            longitude: marker[0].longitude,
            doors: doors,
            seats: seats,
            fuel: fuel,
            transmition: trans,
            tires, tires,
            cc: cc,
            max_speed: km,
            bluetooth: car.bluetooth,
            gps: car.gps,
            score: car.score,
            reviews: car.reviews,
            owner_id: car.owner_id
        };

        setLoading(true);

        let data = new FormData();
        
        const tempUri = fetchLink + '/uploads/cars/' + car.photo;
        
        if(tempUri != image) {
            let filename = image.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            data.append('photo', { uri: image, name: filename, type });
        }

        data.append('car', JSON.stringify(carData))

        fetch(fetchLink + '/api/car/' + car._id, { 
            method: 'PATCH',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: data
        }).then(res => res.json()).then(data => {
            setLoading(false);

            if(data.message) {
                alert(data.message)
            } else {
                alert("Car has been updated.")
            }
        }).catch(err => {
            setLoading(false);
            alert("Sorry there was an error with your request.")
        });
    };

    const deleteCar = async () => {
        fetch(fetchLink + '/api/car/' + car._id, {
            method: 'DELETE'
        }).then(res => res.json()).then(data => {
            setLoading(false);
            setCarList(data);
        }).catch(function(error) { 
            setLoading(false);
        })
    };

    const clearInputs = () => {
        image(null);
        setName('');
        setBrand(null);
        setPrice('');
        setAddress('');
        setDoors('');
        setSteats('');
        setFuel(null);
        setTrans(null);
        setTires(null);
        setCc('');
        setKm('');
        setMarker([]);
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
        requestMapPermission();
        setIsEdit(route.params.isEdit);
        if(route.params.car) {
            const tempCar = route.params.car;
            setCar(tempCar);
            setImage(fetchLink + '/uploads/cars/' + tempCar.photo);
            setName(tempCar.name);
            setBrand(tempCar.brand);
            setPrice(tempCar.price);
            setAddress(tempCar.address);
            setMarker([{
                    longitude: tempCar.longitude,
                    latitude: tempCar.latitude
            }]);
            setDoors(tempCar.doors + '');
            setSteats(tempCar.seats + '');
            setFuel(tempCar.fuel);
            setTrans(tempCar.transmition);
            setTires(tempCar.tires);
            setCc(tempCar.cc);
            setKm(tempCar.max_speed);
        }
    },[]);

    const handleNewMarker = (coordinate) => {
        setMarker([ coordinate]);
    };

    return (
        <SafeAreaView>
            <GradiendBF/>

            <View style={[general.centerContainer]}>
                <Pressable onPress={goBack} style={[general.backBtn]}>
                    <Ionicons name="md-chevron-back" style={general.backIcon} size={24} color="#f9c746" />
                    <Text style={[general.yellowTxt, general.boldTxt]}>BACK</Text>
                </Pressable>

                <ScrollView style={[general.fullW, general.paddingH]}>
                    {isEdit ? 
                        <Text style={[ general.whiteTxt, general.headline, general.boldTxt, general.centerTxt]}>Edit Your Car:</Text>
                    :
                        <Text style={[ general.whiteTxt, general.headline, general.boldTxt, general.centerTxt]}>Rent Your Car:</Text>
                    }

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
                        onChangeText={setAddress} value={address} 
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

                        }}>
                        
                        {marker.length > 0 && marker.map((m) => { return (
                            <Marker coordinate={m} key={1} />
                        )})}

                        </MapView>
                    </View>
                    
                        <View style={[general.inputGroup, general.pushBottom]}>
                            <MaterialCommunityIcons style={general.inputIcon} name="car-door" size={24} color="#f9c746" />
                            <TextInput style={general.input} 
                            onChangeText={setDoors} value={doors} keyboardType='numeric'
                            placeholder='Doors' placeholderTextColor="#FFF" />
                        </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <MaterialCommunityIcons style={general.inputIcon} name="car-seat" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={setSteats} value={seats} keyboardType='numeric'
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
                    {true ? <></> :
                    <>
                     <Text style={[general.yellowTxt, general.boldTxt, general.pushBottom, general.pushTop]}>Optional Fields:</Text>

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
                    </>
                    }
                   
                    
                    { loading ?
                        <ActivityIndicator size="large" color="#7a6a52" />
                    :<></>}

                    { !loading && isEdit ?
                    <>
                        <Pressable onPress={performCarUdate} style={[general.btn, general.btnDark, general.pushBottom]}>
                            <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>UPDATE</Text>
                        </Pressable>

                        <Pressable onPress={deleteCar} style={[general.btn, general.btnBorder, general.pushBottom]}>
                            <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>DELETE</Text>
                        </Pressable>
                    </>
                    :<></>}

                    { !loading && !isEdit ?
                        <Pressable onPress={performCarCreation} style={[general.btn, general.btnDark, general.pushBottom]}>
                            <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>CREATE</Text>
                        </Pressable>
                    :<></>}

                    <View style={{marginBottom: 50}}></View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}