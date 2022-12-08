import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    carImg: {
        width: '100%',
        height: windowWidth * 0.7,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: 70,
        borderBottomColor: '#857f75',
        borderBottomWidth: 1,
        marginBottom: 15
    },
    carName: {
        fontSize: 22,
    },
    carBrand: {
        marginBottom: 15
    },
    carScore: {
        transform: 'scale(0.1)'
    },
    carPrice: {
        fontSize: 30
    },
    carLine: {
        backgroundColor: '#fffbea',
        width: '100%',
        height: 2,
        marginVertical: 4
    },
    carDay: {
        fontSize: 18,
        textAlign: 'center'
    },
    carSpecsHeadline: {
        fontSize: 16
    },
    carReview: {
        fontSize: 10,
        textAlign: 'left'
    },
    carSpecs: {
        marginTop: 10,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    carDetail: {
        width: (windowWidth - 30) / 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 10
    },
    carSpectTxt: {
        paddingLeft: 8
    }
});