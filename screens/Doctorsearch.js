import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { specialities } from "./Homescreen";
import { fetchdoctors, userss } from "../components/Users";
import { useEffect } from "react";

const Doctorsearch = () => {
  route = useRoute();
  const navigation = useNavigation();
  const [Doctors, setDoctors] = useState([]);
  const [count, setCount] = useState(0);
  const [nodate, setNodate] = useState("");

  const handleformat = () => {
    const random = route.params.selectedDate.currentDate.split("/");
    const day = random[2];
    const month = random[1];
    const year = random[0];
    const finaldate = year + "-" + month + "-" + day;
    setNodate(finaldate);
  };

  useEffect(() => {
    const getDoctors = async () => {
      const doctors = await fetchdoctors();
      setDoctors(doctors);
    };

    getDoctors();
    handleformat();
  }, []);
  return (
    <View
      style={{
        transform: [{ translateY: 100 }],
      }}
    >
      <FlatList
        data={Doctors}
        renderItem={({ item }) => {
          if (
            item.speciality == route.params.selectedSpeciality &&
            item.properties.city == route.params.selectedCity &&
            item.properties.approved == true.toString()
          ) {
            if (
              (item.unavailableDates.length > 0 &&
                !item.unavailableDates.some((d) => d.date === nodate)) ||
              item.unavailableDates.length == 0
            ) {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate("DoctorProfileSearch", {
                      doctor: item,
                      selectedDate: route.params.selectedDate,
                    });
                  }}
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    padding: 10,
                    borderBottomWidth: 1,
                    borderColor: "lightgrey",
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.2,
                    shadowRadius: 20,
                    elevation: 15,
                    backgroundColor: "white",
                    borderRadius: 10,
                    margin: 10,
                  }}
                >
                  <View>
                    <Image
                      style={{
                        resizeMode: "contain",
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                      }}
                      source={{ uri: item.image }}
                    ></Image>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-around",
                      gap: 10,
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        fontVariant: ["oldstyle-nums"],
                      }}
                    >
                      {item.properties.name}
                    </Text>
                    <Text
                      style={{
                        color: "red",
                        fontSize: 15,
                      }}
                    >
                      {item.speciality}
                    </Text>
                    <Text>{item.properties.city}</Text>
                    <Text>Consultaion Fee: {item.fee}DHs</Text>
                  </View>
                </Pressable>
              );
            } else {
              if (count < Doctors.length) {
                setCount(count + 1);
              }
            }
          } else {
            if (count < Doctors.length) {
              setCount(count + 1);
            }
          }
        }}
      ></FlatList>
      {count == Doctors.length ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "darkblue",
            }}
          >
            No Doctors Available
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Doctorsearch;

const styles = StyleSheet.create({});
