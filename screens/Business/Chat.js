import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Pressable, View, FlatList } from 'react-native';
import GradiendBF from '../../component/GradientBG.js';
import Constants from '../../helpers/Constants.js';
import general from '../../styles/General.js';
import chatS from '../../styles/Chat.js';
import { useState,useEffect } from 'react';
import fetchLink from '../../helpers/fetchLink.js';
import { userLoggedIn } from '../Authentication/Login.js';

const msgs = [
    { user: 'User Name', host: 'Host Name 1', msg: 'Return my car!! Will call the police!!' },
    { user: 'User Name', host: 'Host Name 2', msg: 'You can ick up at this dir..' },
    { user: 'User Name', host: 'Host Name 2', msg: 'You can ick up at this dir..' },
    { user: 'User Name', host: 'Host Name 2', msg: 'You can ick up at this dir..' },
    { user: 'User Name', host: 'Host Name 2', msg: 'You can ick up at this dir..' },
    { user: 'User Name', host: 'Host Name 2', msg: 'You can ick up at this dir..' },
    { user: 'User Name', host: 'Host Name 2', msg: 'You can ick up at this dir..' },
    { user: 'User Name', host: 'Host Name 2', msg: 'You can ick up at this dir..' },
    { user: 'User Name', host: 'Host Name 2', msg: 'You can ick up at this dir..' },
    { user: 'User Name', host: 'Host Name 2', msg: 'You can ick up at this dir..' },
    { user: 'User Name', host: 'Host Name 2', msg: 'You can ick up at this dir..' },
];



export default function Messages( { navigation } ) {
    const [chatList, setChatList] = useState(null);

    const loadChats = async () => {
    fetch(fetchLink + '/api/chat/' + userLoggedIn._id, {
        method: 'GET'
    }).then(res => res.json()).then(data => {
        console.log(data);
        setChatList(data);
    }).catch(function(error) { 
      console.log(error); 
    })
};

useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        loadChats();
    });
    return unsubscribe;
  }, [navigation]);

    const openMsg = (index) => {
        navigation.navigate(Constants.msg, { msgs: msgs[index] })
    }

    return (
        <SafeAreaView>
            <GradiendBF/>
            <FlatList style={[general.fullW, general.paddingH, chatS.chatPushTop]}
            data={chatList} 
            renderItem={({ item, index }) => 
                <Pressable onPress={() => openMsg(index)} style={chatS.card}>
                    <View style={chatS.avatar}></View>
                    <View>
                        <Text style={chatS.resiver}>{item.first_name + " " + item.last_name}</Text>
                        <Text style={chatS.msg}>Hello! I just rented one of your cars.</Text>
                    </View>
                </Pressable>
            }
            ListFooterComponent={
                <View style={general.avoidFooter}></View>
            }/>

            <View style={general.bottomLine}></View>
        </SafeAreaView>
    );
}