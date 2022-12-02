import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullExpand: {
        position: 'absolute',
        width: '100%',
        height: windowHeight,
        top: 0,
        left: 0
    },
    topImage: {
        position: 'absolute',
        resizeMode: 'contain',
        top: 60,
        left: windowWidth * 0.25,
        width: windowWidth * 0.5,
        height: windowHeight * 0.35
    }
});