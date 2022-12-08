import { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Text, View, FlatList, Image, Pressable, TextInput } from 'react-native';
import Constants from '../../helpers/Constants.js';
import GradiendBF from '../../component/GradientBG.js';
import CoverBG from '../../component/BottomCover.js';
import TopGradien from '../../component/CardGradient.js';
import Stars from '../../component/Stars.js';

import general from '../../styles/General.js';
import homeS from '../../styles/Home.js';

import logo1 from '../../assets/icons/audi.png';
import logo2 from '../../assets/icons/bmw.png';
import logo3 from '../../assets/icons/fiat.png';
import logo4 from '../../assets/icons/honda.png';
import logo5 from '../../assets/icons/lamborhini.png';
import logo6 from '../../assets/icons/mercedes.png';
import logo7 from '../../assets/icons/nissan.png';
import logo8 from '../../assets/icons/toyota.png';
import car from '../../assets/car.jpg';

const filterList = [
    null, logo1, logo2, logo3, logo4,
    logo5, logo6, logo7, logo8
];

const temCars = [
    { 
        name: 'Toyota AX 23',
        brand: 'Toyota',
        price: 15.19,
        host: 'Full Name',
        score: 0,
        start_date: new Date('2022-11-01'),
        end_date: new Date('2023-01-01')
    },
    { 
        name: 'Toyota AX 23',
        brand: 'Toyota',
        price: 15.19,
        host: 'Full Name',
        score: 1,
        start_date: new Date('2022-11-01'),
        end_date: new Date('2023-01-01')
    },
    { 
        name: 'Toyota AX 23',
        brand: 'Toyota',
        price: 15.19,
        host: 'Full Name',
        score: 1.5,
        start_date: new Date('2022-11-01'),
        end_date: new Date('2023-01-01')
    },
    { 
        name: 'Toyota AX 23',
        brand: 'Toyota',
        price: 15.19,
        host: 'Full Name',
        score: 2,
        start_date: new Date('2022-11-01'),
        end_date: new Date('2023-01-01')
    },
    { 
        name: 'Toyota AX 23',
        brand: 'Toyota',
        price: 15.19,
        host: 'Full Name',
        score: 2.5,
        start_date: new Date('2022-11-01'),
        end_date: new Date('2023-01-01')
    },
    { 
        name: 'Toyota AX 23',
        brand: 'Toyota',
        price: 15.19,
        host: 'Full Name',
        score: 3,
        start_date: new Date('2022-11-01'),
        end_date: new Date('2023-01-01')
    },
    { 
        name: 'Toyota AX 23',
        brand: 'Toyota',
        price: 4,
        host: 'Full Name',
        score: 0,
        start_date: new Date('2022-11-01'),
        end_date: new Date('2023-01-01')
    },
    { 
        name: 'Toyota AX 23',
        brand: 'Toyota',
        price: 15.19,
        host: 'Full Name',
        score: 4.5,
        start_date: new Date('2022-11-01'),
        end_date: new Date('2023-01-01')
    },
    { 
        name: 'Toyota AX 23',
        brand: 'Toyota',
        price: 15.19,
        host: 'Full Name',
        score: 5,
        start_date: new Date('2022-11-01'),
        end_date: new Date('2023-01-01')
    }
];

export default function Profile( { navigation } ) {
    const [filterOn, setFilterOn] = useState(false);
    const [selecetedBrand, setSelectedBrand] = useState(0);
    const [word, setWord] = useState('');

    const openCar = (index) => {
        navigation.navigate(Constants.carDetail, { car: temCars[index] })
    }

    const selectBrand = (index) => {
        setSelectedBrand(index);
    }

    const toggleFilter = () => {
        setFilterOn(!filterOn);
    }

    return (
        <SafeAreaView>
            <GradiendBF/>
            
            <View style={[general.centerContainer]}>
                <View style={[general.fullW]}>
                    <FlatList style={[general.fullW]}
                    nestedScrollEnabled
                    ListHeaderComponent={
                        <View style={[general.fullW, general.pushTop]}>
                            <View style={[general.paddingH, general.pushBottom]}>
                                <View style={[general.fullW, general.flexRow]}>
                                    <View style={[general.inputGroup, general.pushBottom, homeS.searchBar]}>
                                        <AntDesign style={general.inputIcon} name="search1" size={24} color="#f9c746" />
                                        <TextInput style={general.input} 
                                        onChangeText={setWord} value={word} 
                                        placeholder='Search' placeholderTextColor="#FFF" />
                                    </View>

                                    <Pressable onPress={toggleFilter} style={homeS.filterToggle}>
                                        {filterOn ? 
                                            <AntDesign name="close" size={24} color="#f9c746" />
                                        :
                                            <Ionicons name="options" size={24} color="#f9c746" />
                                        }
                                    </Pressable>
                                </View>

                                <View>
                                    <Text style={general.whiteTxt}>Car Brands:</Text>
                                </View>
                            </View>


                            <FlatList style={[general.flexRow]}
                            numColumns={1} horizontal={true} 
                            showsHorizontalScrollIndicator={false} 
                            data={filterList}
                            renderItem={({ item, index }) => 
                            <Pressable onPress={() => selectBrand(index)}
                            style={[ homeS.brandCard, 
                            index == filterList.length - 1 ? homeS.lastCard : null,
                            index == selecetedBrand ? homeS.brandSelected : homeS.brandUnselected ]}>
                                {item ? 
                                    <Image style={homeS.filterImg} source={item}/>
                                :
                                    <Text style={[general.whiteTxt, general.boldTxt]}>All</Text>
                                }
                            </Pressable>
                            }/>
                        </View>
                    }
                    numColumns={2}
                    data={temCars} 
                    renderItem={({ item, index }) => 
                        <Pressable onPress={() => openCar(index)}
                        style={[homeS.carCard, index % 2 == 1 ? homeS.carCardR : homeS.carCardL]}>
                            <View style={homeS.cardMedia}>
                                <Image style={homeS.carImg} source={car}/>

                                <View style={homeS.cardLabel}>
                                    <TopGradien/>
                                    <Text style={[homeS.carName, general.yellowTxt, general.boldTxt]}>{item.name}</Text>
                                    <Text style={[homeS.carBrand, general.yellowTxt, general.boldTxt]}>{item.brand}</Text>
                                </View>
                            </View>

                            <View style={[general.fullW, general.flexRow, homeS.carPrice]}>
                                <Text style={[general.whiteTxt, general.boldTxt]}>${item.price}</Text>
                                <Text style={[general.whiteTxt]}> / day</Text>
                            </View>
                            
                            <View style={[homeS.carRate]}>
                                <Stars score={item.score} size={16} color={'#f9c746'}/>
                                <Stars score={item.score - 1} size={16} color={'#f9c746'}/>
                                <Stars score={item.score - 2} size={16} color={'#f9c746'}/>
                                <Stars score={item.score - 3} size={16} color={'#f9c746'}/>
                                <Stars score={item.score - 4} size={16} color={'#f9c746'}/>
                            </View>
                        </Pressable>
                    }
                    ListFooterComponent={
                        <View style={{marginTop: 100}}></View>
                    }/>

                </View>
            </View>

            <CoverBG/>
        </SafeAreaView>
    );
}