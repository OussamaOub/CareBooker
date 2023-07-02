import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useUser } from "../components/UserProvider";
import DoctorMainscreen from "./Doctor/DoctorMainscreen";
import Homescreen from "./Homescreen";
import { useNavigation } from "@react-navigation/native";

const IdleScreen = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  if (user.properties.accountType === "patient") {
    navigation.navigate("Main");
    return;
  } else if (user.properties.accountType === "doctor") {
    if (user.properties.approved === false.toString()) {
      alert(
        "Your account is not approved yet, please check back after a few more days"
      );
      navigation.navigate("Loginscreen");
      return;
    } else if (user.properties.approved === "rejected") {
      alert(
        "Your account has been rejected, please contact the admin for more information"
      );
      navigation.navigate("Loginscreen");
      return;
    }

    navigation.navigate("DoctorMainscreen");
    return;
  } else if (user.properties.accountType === "admin") {
    navigation.navigate("AdminScreen");
    return;
  }
};

export default IdleScreen;

const styles = StyleSheet.create({});
