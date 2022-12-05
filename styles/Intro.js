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
        resizeMode: 'contain',
        width: '100%',
        height: windowWidth * 0.3,
        marginBottom: 30,
        opacity: 1
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