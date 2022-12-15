import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, SafeAreaView, Pressable } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import fetchLink from "../../helpers/fetchLink";
import GradiendBF from '../../component/GradientBG.js';
import general from '../../styles/General.js';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const StripeApp = props => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const amount = props.amount
  const fromDate = props.fromDate
  const toDate = props.toDate
  const car = props.car
  const renter_id = props.renter_id

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
      console.log(clientSecret)
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
            renter_id: renter_id,
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
        <View style={[general.centerContainer]}>
            <View style={[general.fullW]}>
            <View style={[general.inputGroup, general.pushBottom]}>
            <MaterialCommunityIcons style={general.inputIcon} name="email-outline" size={24} color="#f9c746" />
                        <TextInput
                    autoCapitalize="none"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    onChange={value => setEmail(value.nativeEvent.text)}
                    style={general.input}
                        />
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
                    }}
                />
                <Pressable onPress={() => handlePayPress()} style={[general.btn, general.btnDark, general.pushBottom]}>
                        <Text style={[general.btnTxt, general.whiteTxt, general.boldTxt]}>Pay</Text>
                    </Pressable>
            </View>
        </View>
    </SafeAreaView>
  );
};
export default StripeApp;

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
    marginVertical: 30,
  },
});