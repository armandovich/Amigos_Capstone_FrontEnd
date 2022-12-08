import { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, FlatList, TextInput, Pressable } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import GradiendBF from '../../component/GradientBG.js';
import general from '../../styles/General.js';
import chatS from '../../styles/Chat.js';

const chatList = [
    { by: 'User Name', msg: 'Hi' },
    { by: 'Host Name 1', msg: 'Hi there!' },
    { by: 'User Name', msg: 'I will be couple of minutes later for the car pickup.' },
    { by: 'Host Name 1', msg: 'Got it, will be waiting' }
];

export default function Profile( { navigation, route } ) {
    const [msg, setMsg] = useState('');

    const sendMsg = () => {

    }

    return (
        <SafeAreaView>
            <GradiendBF/>

            <View style={chatS.chatBox}>
                <FlatList inverted style={[general.fullW, general.paddingH]}
                data={chatList.reverse()} 
                renderItem={({ item, index }) => 
                    <View style={[chatS.msgCard, item.by == 'User Name' ? chatS.isYou : chatS.isNotYou]}>
                        <View style={[chatS.msgContent, , item.by == 'User Name' ? chatS.noBg : chatS.withBG]}>
                            <Text style={chatS.msgTxt}>{item.msg}</Text>
                        </View>
                    </View>
                }/>
            </View>

            <View style={general.topNav}>
                <Text style={[general.whiteTxt, general.headline, general.paddingH]}>Host Name Here</Text>            
            </View>

            <View style={[general.fullW, general.bottomNav, general.paddingH, chatS.inputBorder]}>
                <View style={[general.fullW, general.flexRow]}>
                    <View style={[general.inputGroup, general.pushBottom, chatS.inputMsg]}>
                        <MaterialCommunityIcons style={general.inputIcon} name="message-text-outline" size={24} color="#f9c746" />
                        <TextInput style={general.input} 
                        onChangeText={setMsg} value={msg} 
                        placeholder='Message' placeholderTextColor="#FFF" />
                    </View>

                    <Pressable onPress={sendMsg} style={chatS.sendMsg}>
                        <MaterialCommunityIcons name="send" size={24} color="#f9c746" />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}