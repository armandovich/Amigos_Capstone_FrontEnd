import { StyleSheet, Dimensions } from 'react-native';

const black = '#221d1b';
const brown = '#7a6a52';
const yellow = '#f9c746';
const ligth = '#fffbea';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    centerContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headline: {
        fontSize: 30,
        width: '100%',
        marginVertical: 15,
        fontWeight: 'bold',
        fontFamily: 'RobotoBold'
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
    yellowTxt: {
        color: yellow,
        fontFamily:'Roboto'
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
    pushTop: {
        marginTop: 15
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
        backgroundColor: '#4d4640',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: '#857f75',
        borderWidth: 1
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
        color: '#fff'
    },
    datePickerCont: {
        width: '45%'
    },
    datePicker: {
        width: '100%',
        backgroundColor: '#4d4640',
        borderColor: '#857f75',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        zIndex: 1
    },
    dropdownGroup: {
        width: '100%',
        backgroundColor: '#4d4640',
        borderColor: '#857f75',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        zIndex: 1
    },
    datePickerLabel: {
        fontSize: 10,
        color: ligth,
        marginBottom: 5
    },
    datePickerTxt: {
        color: ligth,
        paddingVertical: 10,
        paddingLeft: 50,
        paddingRight: 15
    },
    dropdown: {
        color: '#fff',
        backgroundColor: 'transparent',
        borderWidth: 0,
        paddingLeft: 50,
        height: 50,
        maxWidth: '100%',
        justifyContent: 'center'
    },
    dropdownIcon: {
        tintColor: '#fff'
    },
    dropdownHolder: {
        color: '#fff'
    },
    dropdownUnselected: {
        color: '#fff',
        backgroundColor: '#4d4640',
    },
    dropdownSelectTxt: {
        color: yellow,
        fontWeight: 'bold'
    },
    bottomNav: { 
        borderTopColor:  'transparent',
        height: 60,
        paddingTop: 5,
        paddingBottom: 5,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'transparent' ,
        elevation: 0
    },
    avoidFooter: {
        marginBottom: 60
    },
    topNav: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: brown
    },
    topLine: {
        width: '100%',
        left: 0,
        top: 0,
        height: 1,
        backgroundColor: brown,
    },
    bottomLine: {
        width: '100%',
        left: 0,
        bottom: 60,
        height: 1,
        position: 'absolute',
        backgroundColor: brown,
    },
    flexRow: {
        flexDirection: 'row'
    },
    flexEven: {
        justifyContent: 'space-between'
    },
    carBlockList: {
        height: windowHeight - 118,
        paddingTop: 20,
        paddingBottom: 60
    },
    carBlock: {
        flexDirection: 'row',
        backgroundColor: '#4d4640',
        borderRadius: 8,
        borderColor: '#7a6a52',
        borderWidth: 1,
        overflow: 'hidden',
        marginBottom: 20
    },
    carBlockMedia: {
        flex: 1,
        width: windowWidth * 0.3,
        minHeight: 100
    },
    carBlockImg: {
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0
    },
    carBlockL: {
        flex: 1,
        borderLeftColor: '#7a6a52',
        borderLeftWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'center'
    },
    blockName: {
        fontSize: 18,
        color: yellow,
        fontWeight: 'bold',
        fontFamily: 'RobotoBold'
    },
    blockBrand: {
        fontSize: 10,
        color: ligth,
        fontFamily: 'Roboto'
    },
    blockPrice: {
        marginTop: 5,
        fontSize: 15,
        color: ligth,
        fontFamily: 'Roboto'
    }
});