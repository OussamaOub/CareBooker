import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../../components/UserProvider";
import { FlatList } from "react-native";
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getperson } from "../../components/Users";
import { Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
var i = 0;

const Patients = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const [patients, setPatients] = useState([]);
  const [flag, setFlag] = useState(0);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchpatients = async () => {
      const newpatients = [];
      for (const prescription of user.prescriptions) {
        const patientInfo = await getperson(prescription.patient);
        newpatients.push(patientInfo);
      }
      setPatients(newpatients);
    };
    fetchpatients();
  }, [flag, user.prescriptions]);

  if (patients.length > 0) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            backgroundColor: "#002d76",
            height: "15%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <MaterialIcons
            name="refresh"
            size={36}
            color="white"
            style={{
              position: "absolute",
              left: "3%",
            }}
            onPress={() => {
              setFlag(flag + 1);
            }}
          />
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: "white",
              borderWidth: 2,
              borderRadius: 30,
              padding: "3%",
            }}
          >
            <Entypo name="users" size={26} color="#fff" />
            <Text
              style={{
                marginLeft: "3%",
                fontWeight: "bold",
                color: "white",
                fontSize: 15,
              }}
            >
              Patients
            </Text>
          </Pressable>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "3%",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
            }}
          >
            <Text>Image</Text>
            <Text>Name</Text>
            <Text>Age</Text>
          </View>

          <FlatList
            data={patients}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate("ShowPatient", { patient: item[0] });
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "3%",
                    borderBottomColor: "#ccc",
                    borderBottomWidth: 1,
                    marginHorizontal: "3%",
                  }}
                >
                  <Image
                    source={{ uri: item[0].image }}
                    style={{ width: 70, height: 70, borderRadius: 50 }}
                  />
                  <Text>{item[0].properties.name}</Text>
                  <Text>{item[0].properties.age}</Text>
                </View>
              </Pressable>
            )}
          />
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            backgroundColor: "#002d76",
            height: "15%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{
              marginHorizontal: "3%",
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              flexWrap: "wrap",
            }}
          >
            It seems like you currently have no patients
          </Text>
        </View>
      </View>
    );
  }
};

export default Patients;

const styles = StyleSheet.create({});
