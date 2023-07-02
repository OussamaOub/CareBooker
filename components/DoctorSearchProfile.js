import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useUser } from "./UserProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { addtounavailabledates } from "./Users";

const DoctorSearchProfile = ({ route, navigation }) => {
  const { doctor } = route.params;
  const { selectedDate } = route.params;
  const { user } = useUser();
  const handleformat = (date) => {
    var dates = [];
    date = date.split("/");

    var month = date[1];
    var day = date[2];
    var year = date[0];
    var finaldate = year + "-" + month + "-" + day;
    dates.push(finaldate);
    return dates;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          backgroundColor: "darkblue",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      ></View>
      <View
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 20,
            borderRadius: 10,
            margin: "2%",
            width: Dimensions.get("window").width - 20,
          }}
        >
          <View
            style={{
              position: "absolute",
            }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate("Main");
              }}
            >
              <Feather
                name="home"
                size={36}
                color="white"
                style={{
                  position: "absolute",
                  left: -Dimensions.get("window").width / 4,
                }}
              />
            </Pressable>
          </View>

          <Image
            source={{ uri: doctor.image }}
            style={{
              resizeMode: "cover",
              marginTop: "10%",
              marginRight: "-25%",
              width: 100,
              height: Dimensions.get("window").height / 7,
              borderRadius: 100,
              alignSelf: "flex-end",
              marginLeft: Dimensions.get("window").width / 3.75,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 20,
            }}
          ></Image>
        </View>
        <View
          style={{
            flexDirection: "column",
            margin: "3%",
            backgroundColor: "white",
            borderRadius: 25,
            width: Dimensions.get("window").width - 20,
            height: Dimensions.get("window").height - 150,
            overflow: "scroll",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 20,
            elevation: 15,
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginTop: "5%",
              gap: 25,
              width: Dimensions.get("window").width - 20,
            }}
          >
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
              }}
            >
              {doctor.properties.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "500",
                }}
              >
                Speciality:
              </Text>
              <Text
                style={{
                  color: "purple",
                  fontSize: 25,
                }}
              >
                {doctor.speciality}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "500",
                }}
              >
                City:
              </Text>
              <Text
                style={{
                  color: "purple",
                  fontSize: 25,
                }}
              >
                {doctor.properties.city}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "500",
                }}
              >
                Consultation Fee:
              </Text>
              <Text
                style={{
                  color: "purple",
                  fontSize: 25,
                }}
              >
                {doctor.fee}DHs
              </Text>
            </View>
            <Pressable
              style={{
                width: Dimensions.get("window").width - 50,
                height: "10%",
                backgroundColor: "darkblue",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2%",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 20,
                elevation: 15,
                borderColor: "black",
                borderWidth: 1,
              }}
              onPress={() => {
                navigation.navigate("Chatt", {
                  patient: user.email,
                  doctor: doctor.email,
                });
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                Message {doctor.name}
              </Text>
            </Pressable>
            <View
              style={{
                flexDirection: "column",
                gap: 10,
                marginTop: "2%",
                height: "60%",
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Book an appointment with {doctor.properties.name} on{" "}
                {selectedDate.currentDate}
              </Text>
              <Pressable
                style={{
                  borderRadius: 50,
                  width: 150,
                  height: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.2,
                  shadowRadius: 20,
                  elevation: 15,
                  backgroundColor: "darkblue",
                }}
                onPress={() => {
                  Alert.alert(
                    "Confirm",
                    "Are you sure you want to book an appointment with this doctor?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Confirm",
                        onPress: () => {
                          alert("Appointment Booked");
                          handleformat(selectedDate.currentDate).forEach(
                            (date) => {
                              var appointment = {
                                date: date,
                                patientmail: user.email,
                                patientname: user.properties.name,
                                doctorname: doctor.properties.name,
                                doctormail: doctor.email,
                              };
                              addtounavailabledates(
                                user.email,
                                doctor.email,
                                appointment
                              );
                              user.unavailableDates.push(appointment);
                            }
                          );

                          navigation.navigate("Main", {
                            doctor: doctor,
                          });
                        },
                      },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                <MaterialIcons name="library-add" size={80} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DoctorSearchProfile;

const styles = StyleSheet.create({});
