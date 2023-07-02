import { BackHandler, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import { useUser } from "../../components/UserProvider";
import { Octicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

var flag = 0;

const DoctorMainScreen = () => {
  const navigation = useNavigation();
  const { user } = useUser();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "CareBooker",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#002d76",
        height: 80,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => {
        return (
          <View>
            <MaterialIcons
              name="message"
              size={24}
              color="white"
              marginRight={12}
              onPress={() => {
                navigation.navigate("MessagesScreen");
              }}
            />
          </View>
        );
      },
      headerLeft: () => {
        return (
          <Pressable
            onPress={() => {
              navigation.navigate("Loginscreen");
            }}
          >
            <Octicons
              name="sign-out"
              size={24}
              color="#fff"
              style={{ marginLeft: 12, transform: [{ rotate: "180deg" }] }}
            />
          </Pressable>
        );
      },
    });
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isFocused) {
          return true;
        } else {
          return false;
        }
      }
    );
    return () => backHandler.remove();
  }, [isFocused]);

  return (
    <View>
      <View>
        <Header />
      </View>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#002d76",
            marginTop: "5%",
            marginLeft: "2%",
            alignSelf: "center",
          }}
        >
          Welcome {user.properties.name}
        </Text>
      </View>
      <View>
        <View
          style={{
            backgroundColor: "#fff",
            width: "90%",
            alignSelf: "center",
            marginTop: "5%",

            borderRadius: 10,
            height: "82%",
            alignItems: "center",

            shadowColor: "#171717",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 5,
          }}
        >
          <Pressable
            style={{
              marginTop: "10%",
              width: "90%",
              height: "18%",
              backgroundColor: "darkblue",
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
            onPress={() => {
              navigation.navigate("Patients");
            }}
          >
            <Fontisto
              name="persons"
              size={30}
              color="white"
              style={{
                position: "absolute",
                left: "7%",
              }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Patients
            </Text>
          </Pressable>
          <Pressable
            style={{
              marginTop: "5%",
              width: "90%",
              height: "18%",
              backgroundColor: "darkblue",
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
            onPress={() => {
              navigation.navigate("Booking");
            }}
          >
            <FontAwesome
              name="calendar"
              size={30}
              color="white"
              style={{
                position: "absolute",
                left: "7%",
              }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Appointments
            </Text>
          </Pressable>
          <Pressable
            style={{
              marginTop: "5%",
              width: "90%",
              height: "18%",
              backgroundColor: "darkblue",
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <AntDesign
              name="profile"
              size={30}
              color="white"
              style={{
                position: "absolute",
                left: "7%",
              }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Profile
            </Text>
          </Pressable>
          <Pressable
            style={{
              marginTop: "5%",
              width: "90%",
              height: "18%",
              backgroundColor: "darkblue",
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
            onPress={() => {
              navigation.navigate("MessagesScreen");
            }}
          >
            <AntDesign
              name="message1"
              size={30}
              color="white"
              style={{
                position: "absolute",
                left: "7%",
              }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Meesages
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default DoctorMainScreen;
