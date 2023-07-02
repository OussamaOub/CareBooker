import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { getperson } from "../components/Users";

const ShowPrescriptions = () => {
  const route = useRoute();
  const { medicine, doctor, date, patient, note } = route.params;
  const [Doctor, setDoctor] = useState(null);
  const [Patient, setPatient] = useState(null);
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
      }}
    >
      {Doctor && Patient ? (
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            width: "100%",
            height: "100%",
          }}
        >
          <View>
            <Text
              style={{
                marginTop: 50,
                fontSize: 25,
                fontWeight: "bold",
                color: "darkblue",
              }}
            >
              Medicine:
            </Text>
            <Text
              style={{
                position: "absolute",
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: 50,
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
              }}
            >
              {medicine}
            </Text>
          </View>
          <View>
            <Text
              style={{
                marginTop: 50,
                fontSize: 25,
                fontWeight: "bold",
                color: "darkblue",
              }}
            >
              Doctor:
            </Text>
            <Text
              style={{
                position: "absolute",
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: 50,
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
              }}
            >
              {Doctor[0].properties.name}
            </Text>
          </View>
          <View>
            <Text
              style={{
                marginTop: 50,
                fontSize: 25,
                fontWeight: "bold",
                color: "darkblue",
              }}
            >
              Date:
            </Text>
            <Text
              style={{
                position: "absolute",
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: 50,
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
              }}
            >
              {date}
            </Text>
          </View>
          <View>
            <Text
              style={{
                marginTop: 50,
                fontSize: 25,
                fontWeight: "bold",
                color: "darkblue",
              }}
            >
              Note:
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
              multiline={true}
            >
              {note}
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <Text> Loading... </Text>
        </View>
      )}
    </View>
  );
};

export default ShowPrescriptions;

const styles = StyleSheet.create({});
