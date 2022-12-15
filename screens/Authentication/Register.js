import { useState, useRef } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ScrollView, View, TextInput, Pressable, Image, ActivityIndicator } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign, FontAwesome, Fontisto, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Constants from '../../helpers/Constants.js';
import general from '../../styles/General.js';
import GradiendBF from '../../component/GradientBG.js';
import fetchLink from "../../helpers/fetchLink.js";


export default function Register( { navigation } ) {
    const [fName, setFName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verify, setVerify] = useState('');
    // Dropdown attributes
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [countryList, setCountryList] = useState([
        { label: 'Canada', value: 0 },
        { label: 'United States', value: 1 },
        { label: 'Dominican Republic', value: 2 }
    ]);
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [permission, setPermission] = useState(null);
    const [loading, setLoading] = useState(false);
    

    const ref = useRef(null)

    // const takePhoto = () => {
    //     if(permission) {
    //         takePicture();
    //     } else {
    //         askPermission();
    //     }
    // }

    const askPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setPermission(status === 'granted');

    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        });

        if (!result.canceled) {
            setFile(result.assets[0].uri)
            setImage(result.assets[0].uri);
        }
    };

    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
          });
  
          if (!result.canceled) {
              setFile(result.assets[0].uri)
              setImage(result.assets[0].uri);
          }
      };



    const goToScreen = (value) => {
        navigation.navigate({ name: value });
    }

    const performRegister = () => {
        if(!file || email == '' || password == '' || fName == '' || lastName == '' || verify == '' || value == null) {
            alert("Please fill all the inputs!")
        } else if(password != verify){
            alert("Passwords are not the same!")
        } else if(password.length < 6){
            alert("Password must be at least 6 characters!")
        } else{
            let cntry = ""
            for(let i=0;i<countryList.length;i++){
                if(countryList[i].value == value){
                    cntry = countryList[i].label
                    break
                }
            }
            const userData = {
                first_name: fName,
                last_name: lastName,
                country: cntry,
                email: email,
                password:password,
            }
            
            setLoading(true);
            
            let data = new FormData();

            let filename = file.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            
            data.append('avatar', { uri: file, name: filename, type });
            data.append('user', JSON.stringify(userData))

            fetch(fetchLink + '/api/user/', { 
                method: 'POST',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: data
            }).then(res => res.json()).then(data => {
                setLoading(false);
                
                if(data.message) {
                    alert(data.message)
                } else {
                    navigation.replace(Constants.login, { user: data });
                }
            }).catch(err => {
                setLoading(false);
                alert("Sorry there was an error with your request.")
            });
        }
    }

    const uriToBlob = (dataurl) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }

    return (
        <SafeAreaView>
            <GradiendBF/>
            <View style={[general.centerContainer]}>
                <ScrollView style={[general.fullW, general.paddingH]}>
              
                    <Text style={[ general.whiteTxt, general.headline, general.boldTxt, general.centerTxt]}>Sign Up</Text>

                    <View style={[general.flexRow, general.fullW, general.pushBottom]}>
                        <View style={general.avatarCirlce}>
                            {image ? 
                                <Image style={general.avatarImg} source={{ uri: image }}/>
                            :
                                <AntDesign name="picture" size={40} color="#f9c746" />
                            }
                        </View>

                        <View style={[general.fullW, {flex: 1, marginLeft: 15}]}>
                            <Text style={general.avatarTxt}>Profile Image:</Text>
                            
                            <View style={[general.flexRow, general.flexEven, general.fullW]}>
                                <Pressable style={[general.mediaBtn]}
                                onPress={takePicture}>
                                    <Feather name="camera" size={24} color="#f9c746" />
                                    <Text style={general.whiteTxt}>Camera</Text>
                                </Pressable>

                                <Pressable style={[general.mediaBtn]}
                                onPress={pickImage}>
                                    <AntDesign name="folder1" size={24} color="#f9c746" />
                                    <Text style={general.whiteTxt}>Device</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <FontAwesome style={general.inputIcon} name="user-o" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={text => setFName(text)}
                        value={fName}
                        placeholder='First Name' placeholderTextColor="#FFF" />
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <FontAwesome style={general.inputIcon} name="user-o" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={text => setLastName(text)}
                        value={lastName}
                        placeholder='Last Name' placeholderTextColor="#FFF" />
                    </View>

                    <View style={[general.dropdownGroup]}>
                        <Fontisto  style={[general.inputIcon, {top: 13}]} name="world-o" size={24} color="#f9c746" />
                        <DropDownPicker
                        open={open}
                        value={value}
                        items={countryList}
                        style={ general.dropdown }
                        arrowIconStyle={ general.dropdownIcon }
                        placeholderStyle={general.dropdownHolder}
                        labelStyle={{color: '#fff'}}
                        tickIconStyle={{tintColor: '#fff'}}
                        listItemContainerStyle={general.dropdownUnselected}
                        listItemLabelStyle={{color: '#fff'}}
                        selectedItemLabelStyle={general.dropdownSelectTxt}
                        placeholder="Country"
                        listMode="SCROLLVIEW"
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setCountryList}/>
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <MaterialCommunityIcons style={general.inputIcon} name="email-outline" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={text => setEmail(text)} 
                        value={email}
                        placeholder='Email' placeholderTextColor="#FFF" />
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <AntDesign style={general.inputIcon} name="eyeo" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={text => setPassword(text)} 
                        value={password}
                        placeholder='Password' placeholderTextColor="#FFF" secureTextEntry/>
                    </View>

                    <View style={[general.inputGroup, general.pushBottom]}>
                        <AntDesign style={general.inputIcon} name="eyeo" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={text => setVerify(text)} 
                        value={verify}
                        placeholder='Verify Password' placeholderTextColor="#FFF" secureTextEntry/>
                    </View>

                    {loading ?
                        <ActivityIndicator size="large" color="#7a6a52" />
                    :
                    <>
                        <Pressable onPress={() => performRegister()} style={[general.btn, general.btnDark, general.pushBottom]}>
                            <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>REGISTER</Text>
                        </Pressable>

                        <Pressable onPress={() => goToScreen(Constants.login)} style={[general.btn, general.btnBorder]}>
                            <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>LOGIN</Text>
                        </Pressable>
                    </>
                    }
                    

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}