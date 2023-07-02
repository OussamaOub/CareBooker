import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  addMessageToChannel,
  createmessagechannel,
  db,
  getchannel,
  getperson,
} from "./Users";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "./UserProvider";
import { FlatList } from "react-native";
import { TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function Chatt() {
  const { user } = useUser();
  const route = useRoute();
  const { doctor, patient } = route.params;
  const [channel, setChannel] = useState(null);
  const [message, setMessage] = useState("");
  const [Doctor, setDoctor] = useState(null);
  const [Patient, setPatient] = useState(null);
  const navigation = useNavigation();

  const handleSendMessage = async (message, channel) => {
    if (message.trim() === "") {
      alert("Please refrain from sending empty messages.");
      return;
    }
    const newMessage = {
      sender: user.email,

      message: message,
      date: Date.now(),
    };

    if (user.properties.accountType === "patient") {
      newMessage.receiver = doctor;
    } else if (user.properties.accountType === "doctor") {
      newMessage.receiver = patient;
    }

    try {
      await addMessageToChannel(channel.id, newMessage);
      channel.messages.push(newMessage);
      setMessage("");
    } catch (error) {
      console.error("Failed to add message:", error);
    }
  };

  useEffect(() => {
    const getdoctor = async () => {
      const Doctor = await getperson(doctor);
      setDoctor(Doctor);
    };
    getdoctor();
  }, []);

  useEffect(() => {
    const getpatient = async () => {
      const Patient = await getperson(patient);
      setPatient(Patient);
    };

    getpatient();
  }, []);

  useLayoutEffect(() => {
    const fetchData = async () => {
      if (!channel) {
        await getchannel(doctor, patient);
      }
      const collectionref = collection(db, "channels");
      const q = query(
        collectionref,
        where("doctor", "==", doctor),
        where("patient", "==", patient)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const channel = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChannel(channel);
      });
      return () => {
        unsubscribe();
      };
    };

    fetchData();
  }, []);

  if (channel && Doctor && Patient) {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "darkblue",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              position: "absolute",
              left: 10,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Entypo name="arrow-with-circle-left" size={35} color="white" />
          </Pressable>
          {user.properties.accountType === "patient" ? (
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Chat with {Doctor[0].properties.name}
            </Text>
          ) : (
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Chat with {Patient[0].properties.name}
            </Text>
          )}
        </View>
        <FlatList
          data={channel[0].messages}
          renderItem={({ item }) => {
            if (item.sender === user.email) {
              return (
                <View
                  style={{
                    backgroundColor: "lightblue",
                    margin: 10,
                    padding: 10,
                    borderRadius: 10,
                    alignSelf: "flex-end",
                  }}
                >
                  <Text>{item.message}</Text>
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    backgroundColor: "lightgreen",
                    margin: 10,
                    padding: 10,
                    borderRadius: 10,
                    alignSelf: "flex-start",
                  }}
                >
                  <Text>{item.message}</Text>
                </View>
              );
            }
          }}
        />

        <TextInput
          placeholder="Type a message..."
          value={message}
          multiline={true}
          onChangeText={(text) => setMessage(text)}
          onSubmitEditing={() => {
            handleSendMessage(message, channel[0]);
            setMessage("");
          }}
          style={{
            backgroundColor: "white",
            margin: 10,
            padding: 10,
            borderRadius: 10,
          }}
        />
        <Feather
          name="send"
          size={24}
          color="black"
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
          }}
          onPress={() => {
            handleSendMessage(message, channel[0]);
          }}
        />
      </View>
    );
  }
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
