import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useUser } from "../components/UserProvider";
import {
  getMessages,
  getchannel,
  getchannelbyuser,
  getperson,
} from "../components/Users";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Foundation } from "@expo/vector-icons";
import { Image } from "react-native";

var flag = 0;

const MessagesScreen = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  const [channel, setChannel] = useState(null);
  const [Doctor, setDoctor] = useState(null);
  const [Patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchChannel = async () => {
      const channel = await getchannelbyuser(user);
      if (channel) {
        setChannel(channel);
      } else {
        alert("Error fetching channel");
      }
    };
    fetchChannel();
  }, [user.email]);

  if (channel !== null && channel.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            flexWrap: "wrap",
            marginBottom: "10%",
          }}
        >
          It seems you currently have no messages
        </Text>
        <Image source={require("../assets/waiting.gif")} />
      </View>
    );
  }

  if (channel) {
    return (
      <View>
        <FlatList
          data={channel}
          renderItem={({ item }) =>
            item.doctor === user.email ? (
              <Pressable
                style={{
                  backgroundColor: "lightgrey",
                  margin: "5%",
                  padding: "3%",
                  borderRadius: 10,
                  alignSelf: "center",
                  width: "90%",
                  alignItems: "center",
                }}
                onPress={() =>
                  navigation.navigate("Chatt", {
                    doctor: item.doctor,
                    patient: item.patient,
                  })
                }
              >
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      alignSelf: "center",
                      textAlign: "center",
                      maxWidth: "90%",
                    }}
                  >
                    {item.patient}
                  </Text>
                  <Foundation
                    name="page-add"
                    size={28}
                    color="black"
                    style={{
                      position: "absolute",
                      right: "0%",
                    }}
                    onPress={() => {
                      navigation.navigate("AddPrescription", {
                        doctor: item.doctor,
                        patient: item.patient,
                      });
                    }}
                  />
                </View>
              </Pressable>
            ) : (
              <Pressable
                style={{
                  backgroundColor: "lightgrey",
                  margin: "5%",
                  padding: "3%",
                  borderRadius: 10,
                  alignSelf: "center",
                  width: "90%",
                  alignItems: "center",
                }}
                onPress={() =>
                  navigation.navigate("Chatt", {
                    doctor: item.doctor,
                    patient: item.patient,
                  })
                }
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {item.doctor}
                  </Text>
                </View>
              </Pressable>
            )
          }
        />
      </View>
    );
  }
};

export default MessagesScreen;

const styles = StyleSheet.create({});
