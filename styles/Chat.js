import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    chatPushTop: {
        marginBottom: 60,
        paddingTop: 25
    },
    card: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#4d4640',
        borderColor: '#857f75',
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        alignItems: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        backgroundColor: '#fffbea',
        borderRadius: 25,
        marginRight: 15
    },
    resiver: {
        fontSize: 18,
        color: '#f9c746',
        fontWeight: 'bold',
        fontFamily: 'RobotoBold',
        marginBottom: 5
    },
    chatBox: {
        height: '100%',
        paddingTop: 70,
        paddingBottom: 80,
        flexDirection: 'column-reverse'
    },
    msg: {
        fontSize: 12,
        color: '#fffbea'
    },
    msgTxt: {
        color: '#fffbea',
        fontSize: 18,
        lineHeight: 25,
        fontFamily: 'Roboto'
    },
    msgCard: {
        flexDirection: 'row',
        maxWidth: '100%',
    },
    msgContent: {
        maxWidth: '70%',
        borderColor: '#857f75',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    isNotYou: {
        justifyContent: 'flex-start'
    },
    isYou: {
        justifyContent: 'flex-end'
    },
    noBg: {
        backgroundColor: 'transparent'
    },
    withBG: {
        backgroundColor: '#4d4640'
    },
    inputBorder: {
        position: 'absolute',
        left: 0,
        bottom: 10,
        borderTopColor: '#7a6a52',
        borderTopWidth: 1,
        paddingTop: 10
    },
    inputMsg: {
        width: windowWidth - 110
    },
    sendMsg: {
        backgroundColor: '#4d4640',
        borderColor: '#857f75',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        width: 50,
        height: 50,
    }
})