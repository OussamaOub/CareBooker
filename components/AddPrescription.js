import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getperson, users } from "./Users";
import { useUser } from "./UserProvider";
import { SafeAreaView } from "react-native";
import { Pressable } from "react-native";
import { FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native";

const AddPrescription = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  const route = useRoute();
  const { doctor, patient } = route.params;
  const [Doctor, setDoctor] = useState(null);
  const [Patient, setPatient] = useState(null);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    const getdoctor = async () => {
      const Doctor = await getperson(doctor);
      setDoctor(Doctor);
    };
    getdoctor();
  }, [flag]);

  useEffect(() => {
    const getpatient = async () => {
      const Patient = await getperson(patient);
      setPatient(Patient);
    };
    getpatient(patient);
  }, [flag]);
  if (Doctor && Patient) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            backgroundColor: "darkblue",
            height: "15%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Feather
            name="refresh-ccw"
            size={24}
            color="white"
            style={{
              position: "absolute",
              left: "2%",
              borderColor: "white",
              borderWidth: 1,
            }}
            onPress={() => {
              setFlag(flag + 1);
            }}
          />
          <Ionicons
            name="add"
            size={30}
            color="black"
            style={{
              position: "absolute",
              right: "0%",
              color: "white",
              padding: "1.2%",
            }}
            onPress={() => {
              {
                navigation.navigate("AddPrescription2", {
                  doctor: Doctor[0],
                  patient: Patient[0],
                });
              }
              setFlag(flag + 1);
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              maxWidth: "80%",
            }}
          >
            Write a perscription for {Doctor[0].properties.name}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "darkblue",
              marginTop: "5%",
              marginLeft: "5%",
            }}
          >
            Information about the patient:
          </Text>
        </View>
        <ScrollView
          style={{
            margin: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "darkblue",
              marginLeft: "5%",
            }}
          >
            {Patient[0].properties.name} is {Patient[0].properties.age} years
            old.
          </Text>
          {Patient[0].prescriptions.length > 0 ? (
            <View>
              <Text
                style={{
                  marginLeft: "5%",
                }}
              >
                They have the following prescriptions:
              </Text>
              <ScrollView>
                <FlatList
                  scrollEnabled={true}
                  data={Patient[0].prescriptions}
                  renderItem={(item) => {
                    return (
                      <View
                        style={{
                          backgroundColor: "lightblue",
                          marginBottom: "5%",
                          padding: "3%",
                          borderRadius: 10,
                          alignSelf: "center",
                          width: "90%",
                        }}
                      >
                        <Text>Medicine: </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            borderBottomColor: "black",
                            borderBottomWidth: 1,
                          }}
                        >
                          {item.item.medicine}
                        </Text>
                        <Text>Notes: </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            borderBottomColor: "black",
                            borderBottomWidth: 1,
                          }}
                        >
                          {item.item.Notes}
                        </Text>
                        <Text>Assigning Doctor: </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            borderBottomColor: "black",
                            borderBottomWidth: 1,
                          }}
                        >
                          {item.item.doctor}
                        </Text>
                        <Text>Date: </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            borderBottomColor: "black",
                            borderBottomWidth: 1,
                          }}
                        >
                          {item.item.date}
                        </Text>
                      </View>
                    );
                  }}
                />
              </ScrollView>
            </View>
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "darkblue",
                }}
              >
                The patient is all healthy.
              </Text>
              <Image
                source={require("../assets/giphy.gif")}
                style={{
                  width: "100%",
                  height: 500,
                  resizeMode: "contain",
                }}
              />
            </View>
          )}
        </ScrollView>
        <View style={{}}></View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
};

export default AddPrescription;

const styles = StyleSheet.create({});
