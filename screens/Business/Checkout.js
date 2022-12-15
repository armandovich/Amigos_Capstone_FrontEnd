import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { StripeProvider, CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import fetchLink from "../../helpers/fetchLink";
import GradiendBF from '../../component/GradientBG.js';
import general from '../../styles/General.js';
import { userLoggedIn } from "../Authentication/Login.js";

export default function Checkout({navigation,route}) {
  const [email, setEmail] = useState(userLoggedIn.email);
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const amount = route.params.data.amount
  const days = route.params.data.days
  const fromDate = route.params.data.fromDate
  const toDate = route.params.data.toDate
  const car = route.params.data.car
  const renter = route.params.data.renter

  const goBack = () => {
    navigation.goBack()
  };

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(fetchLink + '/api/create-payment-intent/?amount='+ amount,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();

    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }

    const billingDetails = {
      email: email,
    };

    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
          billingDetails: billingDetails,
        });

        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
          const tripData = {
            car_id: car._id,
            car_owner_id: car.owner_id,
            car_name: car.name,
            car_brand: car.brand,
            car_photo: car.photo,
            renter_id: renter._id,
            renter_name: renter.first_name + " " + renter.last_name,
            renter_photo: renter.avatar,
            cost: amount,
            start_date: fromDate,
            end_date:toDate,
        }
        fetch(fetchLink + '/api/trip/', {     
          method: 'POST',
          body: JSON.stringify(tripData),
          headers: {
              'Content-Type': 'application/json'
          },
          }).then(res => res.json()).then(data => console.log(data));

        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <SafeAreaView>
        <GradiendBF/>

        <Pressable onPress={goBack} style={[general.backBtn]}>
          <Ionicons name="md-chevron-back" style={general.backIcon} size={24} color="#f9c746" />
          <Text style={[general.yellowTxt, general.boldTxt]}>BACK</Text>
        </Pressable>

        <StripeProvider publishableKey="pk_test_51MEhG7Igw91omEHPgyJBmzbmu9a8CF8jIX7aMnAxRPrJ0nEX5R58g2kEOr65RBgF9cFTxQWVt7nJPwdVZjkEHLT300h8Sz10Py">
        <View style={[general.centerContainer, general.paddingH, general.payHeight]}>
            <View style={[general.fullW]}>
                <Text style={[ general.whiteTxt, general.headline, general.boldTxt, general.centerTxt, {minWidth: '100%'}]}>Checkout</Text>

                <View style={[general.inputGroup]}>
                  <MaterialCommunityIcons style={general.inputIcon} name="email-outline" size={24} color="#f9c746" />
                  <TextInput
                  autoCapitalize="none"
                  placeholder="E-mail"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  style={general.input} placeholderTextColor="#FFF"/>
                </View>
                            
                <CardField
                postalCodeEnabled={true}
                placeholder={{
                    number: "4242 4242 4242 4242",
                }}
                cardStyle={styles.card}
                style={styles.cardContainer}
                onCardChange={cardDetails => {
                  setCardDetails(cardDetails);
                }}/>

                <View style={[general.flexRow, general.flexEven, general.pushBottom]}>
                  <View style={[general.datePickerCont, {alignItems: 'center'}]}>
                      <Text style={general.datePickerLabel}>Total days:</Text>
                      <Text style={[general.yellowTxt, general.boldTxt, {fontSize: 25}]}>{days}</Text>
                  </View>

                  <View style={[general.datePickerCont, {alignItems: 'center'}]}>
                      <Text style={general.datePickerLabel}>Total Cost:</Text>
                      <Text style={[general.yellowTxt, general.boldTxt, {fontSize: 25}]}>${amount}</Text>
                  </View>
              </View>

                <Pressable onPress={handlePayPress} style={[general.btn, general.btnDark, general.pushTop, general.pushBottom, {minWidth: '100%'}]}>
                  <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>Pay</Text>
                </Pressable>
            </View>
          </View>
        </StripeProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  card: {
    backgroundColor: "#efefefef",
    borderRadius: 8,
  },
  cardContainer: {
    height: 50,
    marginVertical: 30
  },
});