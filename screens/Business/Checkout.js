import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StripeApp from "./StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";
export default function Checkout({navigation,route}) {
  const amount = route.params.amount
  const fromDate = route.params.fromDate
  const toDate = route.params.toDate
  const car = route.params.car
  const renter_id = route.params.renter_id

  return (
    <StripeProvider publishableKey="pk_test_51MEhG7Igw91omEHPgyJBmzbmu9a8CF8jIX7aMnAxRPrJ0nEX5R58g2kEOr65RBgF9cFTxQWVt7nJPwdVZjkEHLT300h8Sz10Py">
      <StripeApp amount={amount} fromDate={fromDate} toDate={toDate} car={car} renter_id={renter_id}/>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});