import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Pressable, View, FlatList } from 'react-native';
import GradiendBF from '../../component/GradientBG.js';
import Constants from '../../helpers/Constants.js';
import general from '../../styles/General.js';
import chatS from '../../styles/Chat.js';

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
    const openMsg = (index) => {
        navigation.navigate(Constants.msg, { msgs: msgs[index] })
    }

    return (
        <SafeAreaView>
            <GradiendBF/>

            <FlatList style={[general.fullW, general.paddingH, chatS.chatPushTop]}
            data={msgs} 
            renderItem={({ item, index }) => 
                <Pressable onPress={() => openMsg(index)} style={chatS.card}>
                    <View style={chatS.avatar}></View>
                    <View>
                        <Text style={chatS.resiver}>{item.host}</Text>
                        <Text style={chatS.msg}>{item.msg}</Text>
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