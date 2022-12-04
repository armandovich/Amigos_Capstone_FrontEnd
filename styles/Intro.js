import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topImage: {
        position: 'absolute',
        resizeMode: 'contain',
        top: 60,
        left: windowWidth * 0.25,
        width: windowWidth * 0.5,
        height: windowHeight * 0.35,
        opacity: 0
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: windowHeight,
        opacity: 0.5
    }
});