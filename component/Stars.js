import { FontAwesome } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export default function Stars(props) {
    return (
        <View>
            {props.score >= 1 ?
            <FontAwesome style={{marginRight: 5}} name="star" size={20} color="#f9c746" />
            :<></>}

            {props.score > 0 && props.score < 1 ?
            <FontAwesome style={{marginRight: 5}} name="star-half-full" size={20} color="#f9c746" />
            :<></>}

             {props.score <= 0 ?
            <FontAwesome style={{marginRight: 5}} name="star-o" size={20} color="#f9c746" />
            :<></>}
        </View>
    );
}
