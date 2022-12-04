import { StyleSheet } from 'react-native';

const black = '#221d1b';
const brown = '#7a6a52';
const yellow = '#f9c746';
const ligth = '#fffbea';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    centerContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headline: {
        fontSize: 25,
        width: '100%',
        marginBottom: 15
    },
    paddingH: {
        paddingHorizontal: 15
    },
    centerTxt: {
        textAlign: 'center'
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
    },
    btnMaxWidth: {
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
    },
    inputGroup: {
        width: '100%',
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    inputIcon: {
        position: 'absolute',
        left: 12,
        top: 10
    },
    input: {
        paddingLeft: 40,
        width: '100%',
        height: '100%',
        color: black
    }
});