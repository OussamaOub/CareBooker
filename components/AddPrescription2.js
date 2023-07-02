import { View, Text } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { addprescriptiontouser } from "./Users";
import { useUser } from "./UserProvider";

const AddPrescription2 = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { doctor, patient } = route.params;
  const [Notes, setNotes] = useState("");
  const [medicine, setMedicine] = useState("");
  const date = new Date().toLocaleDateString();
  const { user } = useUser();

  const handlesubmit = async (medicine, notes) => {
    const newprescription = {
      patient: patient.email,
      doctor: doctor.email,
      medicine: medicine,
      Notes: notes,
      date: new Date().toLocaleDateString(),
    };
    await addprescriptiontouser(newprescription, patient.email, doctor.email);
    user.prescriptions.push(newprescription);
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "darkblue",
          height: "20%",
          width: "100%",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 35,
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          Writing perscription
        </Text>
      </View>
      <View>
        <TextInput
          placeholder="Medicine"
          onChangeText={(text) => setMedicine(text)}
          style={{
            borderWidth: 1,
            borderColor: "darkblue",
            borderRadius: 10,
            margin: "3.5%",
            padding: "3%",
            fontSize: 20,
            fontWeight: "bold",
            color: "darkblue",
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "darkblue",
            marginLeft: "3.5%",
          }}
        >
          Notes:
        </Text>
        <TextInput
          onChangeText={(text) => setNotes(text)}
          style={{
            height: 200,
            borderWidth: 1,
            borderColor: "darkblue",
            borderRadius: 10,
            margin: "3.5%",
            padding: "2%",
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
          }}
          multiline={true}
        />
      </View>
      <Pressable
        style={{
          backgroundColor: "darkblue",
          height: "7%",
          width: "50%",
          alignSelf: "center",
          justifyContent: "center",
          marginTop: "5%",
          borderRadius: 10,
          alignItems: "center",
        }}
        onPress={() => {
          handlesubmit(medicine, Notes);
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Submit
        </Text>
      </Pressable>
    </View>
  );
};

export default AddPrescription2;
