import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ScrollView, View } from 'react-native';
import GradiendBF from '../../component/GradientBG.js';
import general from '../../styles/General.js';
import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constants from '../../helpers/Constants.js';
import { userLoggedIn } from '../Authentication/Login.js';

export default function Profile( { navigation } ) {
    return (
        <SafeAreaView>
            <GradiendBF/>
            
            <View >
                <ScrollView >
                            <View style={general.fullW}>
                            <View style={styles.header}></View>
                            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar7.png'}}/>
                            <View style={styles.body}>
                                <View style={styles.bodyContent}>
                                <Text style={[styles.name, general.whiteTxt]}>{userLoggedIn.first_name + " " + userLoggedIn.last_name}</Text>
                                <Text style={[styles.description, general.whiteTxt]}>{userLoggedIn.email}</Text>
                                
                                <TouchableOpacity style={[general.btn, general.btnDark, general.pushBottom, general.pushTop]}>
                                    <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>Your Cars</Text>  
                                </TouchableOpacity>              
                                <TouchableOpacity style={[general.btn, general.btnBorder]} onPress={() => navigation.replace(Constants.intro)}>
                                    <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>Log out</Text> 
                                </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header:{
      height:200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#f9c746",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:10,
      backgroundColor: "#f9c746",
    },
  });
  