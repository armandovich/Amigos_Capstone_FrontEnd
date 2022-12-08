import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ScrollView, View, FlatList } from 'react-native';
import GradiendBF from '../../component/GradientBG.js';
import CoverBG from '../../component/BottomCover.js';
import general from '../../styles/General.js';
import chatS from '../../styles/Chat.js';
const chatList = [
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

export default function Profile( { navigation } ) {
    return (
        <SafeAreaView>
            <GradiendBF/>

            <Text style={[general.whiteTxt, general.headline, general.paddingH]}>Chats</Text>
            
            <FlatList style={[general.fullW, general.paddingH]}
            data={chatList} 
            renderItem={({ item, index }) => 
                <View style={chatS.card}>
                    <View style={chatS.avatar}></View>
                    <View>
                        <Text style={chatS.resiver}>{item.host}</Text>
                        <Text style={chatS.msg}>{item.msg}</Text>
                    </View>
                </View>
            }/>

            <CoverBG/>
        </SafeAreaView>
    );
}