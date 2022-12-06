import { StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login( { navigation } ) {
    return (
        <LinearGradient colors={['rgba(0,0,0,0)', '#4b4030']} style={ styles.background }/>
    );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        width: '100%',
        height: 100,
        bottom: 0,
        left: 0
    }
});