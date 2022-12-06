import { StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login( { navigation } ) {
    return (
        <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']} style={ styles.background }/>
    );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        to: 0,
        left: 0
    }
});