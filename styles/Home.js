import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    brandCard: {
        width: windowWidth * 0.15,
        height: windowWidth * 0.15,
        borderColor: '#857f75',
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    brandUnselected: {
        backgroundColor: '#4d4640'
    },
    brandSelected: {
        backgroundColor: 'transparent'
    },
    filterImg: {
        width: '90%',
        resizeMode: 'contain'
    },
    lastCard: {
        marginRight:15
    },
    carCard: {
        width: (windowWidth * 0.5) - 25,
        backgroundColor: '#4d4640',
        borderColor: '#857f75',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 20,
        overflow: 'hidden'
    },
    carCardL: {
        marginLeft: 15,
        marginRight: 10
    },
    carCardR: {
        marginLeft: 10,
        marginRight: 15
    },
    cardMedia: {
        width: '100%',
        height: (windowWidth * 0.5) - 50,
        borderBottomColor: '#857f75',
        borderBottomWidth: 1
    },
    cardLabel: {
        width: '100%',
    },
    carName: {
        fontSize: 14,
        paddingHorizontal: 5,
        paddingTop: 5
    },
    carBrand: {
        fontSize: 10,
        paddingHorizontal: 5,
        paddingBottom: 50
    },
    carImg: {
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0
    },
    carPrice: {
        paddingTop: 10,
        paddingHorizontal: 5
    },
    carRate: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingTop: 5,
        paddingBottom: 10,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    }
});