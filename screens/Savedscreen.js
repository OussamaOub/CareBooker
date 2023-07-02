import { StyleSheet, Text, View } from "react-native";
import { useUser } from "../components/UserProvider";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList } from "react-native";
import { Pressable } from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db, fetchprescriptions } from "../components/Users";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";

const Savedscreen = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const [flag, setFlag] = useState(0);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const getprescriptions = async () => {
      const something = await fetchprescriptions(user.email);
      setPrescriptions(something);
      setFlag(1);
    };
    getprescriptions();
  }, [flag]);

  return (
    <View>
      <Pressable
        style={{
          position: "absolute",
          zIndex: 10,
        }}
        onPress={() => {
          setFlag(0);
        }}
      >
        <Feather
          name="refresh-ccw"
          size={26}
          color="white"
          style={{
            left: "50%",
            top: "130%",
          }}
        />
      </Pressable>
      <View
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "darkblue",
          padding: 10,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
          }}
        >
          Your Prescriptions
        </Text>
      </View>
      <View>
        {prescriptions.length > 0 ? (
          <View>
            <FlatList
              data={prescriptions}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "lightgrey",
                  }}
                  onPress={() => {
                    navigation.navigate("ShowPrescriptions", {
                      medicine: item.medicine,
                      doctor: item.doctor,
                      date: item.date,
                      patient: item.patient,
                      note: item.Notes,
                    });
                  }}
                >
                  <Text>{item.medicine}</Text>
                  <Text>{item.doctor}</Text>
                  <Text>{item.date}</Text>
                </Pressable>
              )}
            />
          </View>
        ) : (
          <View
            style={{
              alignItems: "center",
              height: "100%",
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                marginTop: 25,
                textAlign: "center",
              }}
            >
              You have no prescriptions {"\n"}
              All healthy!
            </Text>
            <Image
              source={require("../assets/giphy.gif")}
              style={{
                width: "100%",
                height: 300,
                marginTop: 100,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Savedscreen;

const styles = StyleSheet.create({});
