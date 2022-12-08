import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const black = '#221d1b';
const brown = '#7a6a52';
const yellow = '#f9c746';
const ligth = '#fffbea';

export default StyleSheet.create({
    addBtn: {
        width: '100%',
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: '#4d4640',
        borderColor: '#7a6a52',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: windowWidth,
        backgroundColor: '#4d4640',
        borderRadius: 8,
        borderColor: '#7a6a52',
        borderWidth: 1,
        marginBottom: 15
    }
});