import { StyleSheet } from 'react-native';

const black = '#221d1b';
const brown = '#7a6a52';
const yellow = '#f9c746';
const ligth = '#fffbea';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    paddingH: {
        paddingHorizontal: 15
    },
    boldTxt: {
        fontWeight: 'bold',
        fontFamily: 'RobotoBold'
    },
    whiteTxt: {
        color: ligth,
        fontFamily:'Roboto'
    },
    brownTxt: {
        color: brown,
        fontFamily:'Roboto'
    },
    btn: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 8,
        maxWidth: 300
    },
    btnTxt: {
        textAlign: 'center'
    },
    pushBottom: {
        marginBottom: 15
    },
    btnDark: {
        backgroundColor: brown
    },
    btnBorder: {
        borderWidth: 2,
        borderColor: ligth
    }
});