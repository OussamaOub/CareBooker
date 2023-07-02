import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import Header from "../components/Header";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Dimensions } from "react-native";
import DatePicker from "react-native-date-ranges";
import { Fontisto } from "@expo/vector-icons";
import { useUser } from "../components/UserProvider";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export var specialities = {
  1: "Common",
  2: "Cardiologist",
  3: "Dentist",
  4: "Dermatologist",
  5: "Endocrinologist",
  6: "Gastroenterologist",
  7: "Gynecologist",
  8: "Neurologist",
  9: "Oncologist",
  10: "Ophthalmologist",
  11: "Orthopedist",
  12: "Pediatrician",
  13: "Psychiatrist",
  14: "Pulmonologist",
  15: "Rheumatologist",
  16: "Surgeon",
};

const customButton = (onConfirm) => {
  return (
    <Button
      onPress={onConfirm}
      style={{
        container: { width: "80%", marginHorizontal: "3%" },
        text: { fontSize: 20 },
      }}
      primary
      title="Submit"
    />
  );
};

const Homescreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useUser();

  const lookfor = (selectedDate, selectedCity, selectedSpeciality) => {
    if (
      selectedDate == undefined ||
      selectedCity == "" ||
      selectedSpeciality == ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    navigation.navigate("Doctorsearch", {
      selectedDate: selectedDate,
      selectedCity: selectedCity,
      selectedSpeciality: selectedSpeciality,
    });
  };
  var [selectedCity, setselectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [selectedSpeciality, setSelectedSpeciality] = useState("Common");
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
          <Pressable
            style={{
              padding: 5,
            }}
            onPress={() => {
              navigation.navigate("MessagesScreen");
            }}
          >
            <MaterialIcons
              name="message"
              size={24}
              color="white"
              style={{
                marginRight: 12,
                padding: 5,
              }}
            />
          </Pressable>
        );
      },
      headerLeft: () => {
        return (
          <Pressable
            style={{
              padding: 5,
            }}
            onPress={() => {
              navigation.navigate("Loginscreen");
            }}
          >
            <Octicons
              name="sign-out"
              size={24}
              color="white"
              style={{
                marginLeft: 12,
                padding: 5,
                transform: [{ rotate: "180deg" }],
              }}
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
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Header />

      <ScrollView>
        <View
          style={{
            margin: 10,
            borderColor: "black",
            borderWidth: 2,
            borderRadius: 6,
          }}
        >
          {/* City selection */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
              gap: Dimensions.get("window").width / 3,
              paddingHorizontal: 10,
              borderColor: "black",
              borderBottomWidth: 2,
              paddingVertical: 15,
            }}
            onPress={() => navigation.navigate("Citysearch")}
          >
            <AntDesign name="search1" size={24} color="black" />
            <TextInput
              placeholder={
                route?.params ? route.params.selectedCity : "Search for city"
              }
              placeholderTextColor={"black"}
              onPressIn={() => navigation.navigate("Citysearch")}
            ></TextInput>
          </Pressable>
          {/* Date selection*/}
          <Pressable
            style={{
              flexDirection: "row",

              gap: 10,
              paddingHorizontal: 10,
              borderColor: "black",
              borderBottomWidth: 2,
              paddingVertical: 15,
            }}
          >
            <AntDesign name="calendar" size={26} color="black" />
            <DatePicker
              blockBefore={new Date()}
              style={{
                borderRadius: 0,
                borderWidth: 0,
                borderColor: "transparent",
                width: 325,
                height: 30,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
              }}
              customStyles={{
                placeholderText: {
                  fontSize: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 10,
                },
                headerStyle: { backgroundColor: "#0047AB" },
                contentText: {
                  fontSize: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: "auto",
                },
              }}
              selectedBgColor="#0047AB"
              customButton={(onConfirm) => customButton(onConfirm)}
              onConfirm={(date) => {
                setSelectedDate(date);
              }}
              allowFontScaling={false}
              placeholder={"Select date"}
              selectedTextColor="white"
            />
          </Pressable>
          {/* Speciality selection */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 50,
              paddingHorizontal: 10,
              borderColor: "black",
              borderBottomWidth: 2,
            }}
          >
            <Fontisto name="doctor" size={24} color="black" />
            <Picker
              style={{
                width: Dimensions.get("window").width - 100,
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                textAlign: "center",
              }}
              mode="dropdown"
              selectedValue={selectedSpeciality}
              onValueChange={(value) => {
                setSelectedSpeciality(value);
              }}
            >
              <Picker.Item label="Common" value="Common" />
              <Picker.Item label="Cardiologist" value="Cardiologist" />
              <Picker.Item label="Dentist" value="Dentist" />
              <Picker.Item label="Dermatologist" value="Dermatologist" />
              <Picker.Item label="Endocrinologist" value="Endocrinologist" />
              <Picker.Item
                label="Gastroenterologist"
                value="Gastroenterologist"
              />
              <Picker.Item label="Gynecologist" value="Gynecologist" />
              <Picker.Item label="Neurologist" value="Neurologist" />
              <Picker.Item label="Oncologist" value="Oncologist" />
              <Picker.Item label="Ophthalmologist" value="Ophthalmologist" />
              <Picker.Item label="Orthopedist" value="Orthopedist" />
              <Picker.Item label="Pediatrician" value="Pediatrician" />
              <Picker.Item label="Psychiatrist" value="Psychiatrist" />
              <Picker.Item label="Pulmonologist" value="Pulmonologist" />
              <Picker.Item label="Rheumatologist" value="Rheumatologist" />
              <Picker.Item label="Surgeon" value="Surgeon" />
            </Picker>
          </Pressable>
          {/* Search Button */}

          <Pressable
            onPress={() => {
              if (!selectedDate || !route.params || !selectedSpeciality) {
                alert("Please fill all the fields");
              } else {
                lookfor(
                  selectedDate,
                  route.params.selectedCity,
                  selectedSpeciality
                );
              }
            }}
            style={{
              padding: 15,
              alignItems: "center",
              margin: 0,
              backgroundColor: "#1E90FF",

              borderColor: "black",
              borderRadius: 2,
            }}
          >
            <AntDesign name="search1" size={30} color="#fff" />
          </Pressable>
        </View>
      </ScrollView>
      <View horizontal showsHorizontalScrollIndicator={false}>
        <Pressable>
          <View style={styles.cards}>
            <Pressable
              style={{
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("MessagesScreen");
              }}
            >
              <Entypo name="mail" size={40} color="darkblue" />
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                Go to messages
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </View>
      <Pressable
        style={{
          marginTop: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "#4830D3",
            fontFamily: "sans-serif",
          }}
        >
          CareBooker
        </Text>
      </Pressable>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  button: {
    backgroundColor: "#4830D3",
    alignItems: "center",
    justifyContent: "center",
    height: 42,
    borderRadius: 4,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  cards: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 0.5,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 150,
    height: 125,
    shadowColor: "black",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 2,
    shadowRadius: 100,
    elevation: 10,
    padding: 16,
  },
  container: {
    color: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
