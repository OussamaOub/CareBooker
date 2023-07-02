import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { Image } from "react-native";
import { FlatList } from "react-native";

const ShowPatient = () => {
  const route = useRoute();
  const { patient } = route.params;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View>
        <Image
          source={{ uri: patient.image }}
          style={{
            width: 250,
            height: 250,
            borderRadius: 150,
            alignSelf: "center",
            marginTop: "8%",
            resizeMode: "cover",
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: "5%",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Mr. </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {patient.properties.name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: "5%",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Age: </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {patient.properties.age}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: "5%",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Phone: </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {patient.properties.phone}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: "5%",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Email: </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {patient.email}
        </Text>
      </View>
      <View>
        <FlatList
          data={patient.prescriptions}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: "5%",
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Prescription:{" "}
              </Text>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Medicine: {item.medicine}
                </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Notes: {item.Notes}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ShowPatient;

const styles = StyleSheet.create({});
