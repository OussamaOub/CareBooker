import {
  BackHandler,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../components/UserProvider";
import {
  changedoctorapproval,
  getDoctors,
  getImage,
} from "../components/Users";
import { Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";

var flag = 0;
const AdminScreen = () => {
  const [doctor, setDoctor] = useState([]);
  const [imagelink, setimagelink] = useState("");
  const [liscencelink, setliscencelink] = useState("");
  const navigation = useNavigation();
  const Getdoctors = async () => {
    const doctors = await getDoctors();
    for (var i = 0; i < doctors.length; i++) {
      doctor.push(doctors[i]);
      setDoctor(doctor);
    }
    setDoctor(checkduplicates());
    return doctor;
  };

  const getimage = async (imagename) => {
    const link = await getImage(imagename);
    setimagelink(link);
    console.log(link);
  };
  const getliscence = async (imagename) => {
    const link = await getImage(imagename);
    setliscencelink(link);
    console.log(link);
  };

  const changestate = async (item, state) => {
    changedoctorapproval(item.id, state);
  };
  const checkduplicates = () => {
    for (let i = 0; i < doctor.length; i++) {
      for (let j = i + 1; j < doctor.length; j++) {
        if (doctor[i].id == doctor[j].id) {
          doctor.splice(j, 1);
          setDoctor(doctor);
        }
      }
    }
    return doctor;
  };

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
    <ScrollView>
      <Pressable
        style={{
          position: "absolute",
        }}
        onPress={() => {
          navigation.navigate("Loginscreen");
        }}
      >
        <MaterialIcons
          name="logout"
          size={36}
          color="darkblue"
          style={{
            top: "80%",
            left: "40%",
            transform: [{ rotate: "180deg" }],
          }}
        />
      </Pressable>
      <Pressable
        style={{
          backgroundColor: "blue",
          width: 200,
          height: 50,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          marginTop: 20,
        }}
        onPress={() => {
          setDoctor(Getdoctors());
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Refresh Approval list
        </Text>
      </Pressable>
      <FlatList
        data={doctor}
        renderItem={(item) => {
          return (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                {item.item.properties.name}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                {item.item.email}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                {item.item.properties.accountType}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                {item.item.speciality}
              </Text>
              <Image
                source={{ uri: item.item.image }}
                style={{
                  width: "100%",
                  height: 250,
                  resizeMode: "cover",
                  marginTop: 10,
                }}
              />
              <Image
                source={{ uri: item.item.document }}
                style={{
                  width: "100%",
                  height: 250,
                  resizeMode: "cover",
                  marginTop: 10,
                }}
              />
              <Pressable
                style={{
                  backgroundColor: "blue",
                  width: 200,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  marginTop: 20,
                }}
                onPress={() => {
                  changestate(item.item, "true");
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Approve
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "red",
                  width: 200,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  marginTop: 20,
                }}
                onPress={() => {
                  changestate(item.item, "rejected");
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Reject
                </Text>
              </Pressable>
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({});
