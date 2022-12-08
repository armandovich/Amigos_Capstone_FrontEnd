import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
        fontFamily: 'RobotoBold',
        marginBottom: 5
    },
    msg: {
        fontSize: 12,
        color: '#fffbea'
    }
})