import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { useUser } from "../components/UserProvider";
import { fetchdates } from "../components/Users";

const Bookingscreen = () => {
  const { user } = useUser();
  const [dates, setDates] = useState([]);
  const [flag, setFlag] = useState(0);

  let markedDates = {};

  useEffect(() => {
    const getdate = async () => {
      user.unavailableDates = await fetchdates(user.email);
      setFlag(flag);
    };
    setTimeout(() => {
      getdate(user.email);
    }, 3000);
  }, [flag]);

  user.unavailableDates.forEach((appointment) => {
    markedDates[appointment.date] = {
      selected: true,
      selectedColor: "red",
      patientname: appointment.patientname,
      patientmail: appointment.patientmail,
      doctorname: appointment.doctorname,
      doctormail: appointment.doctormail,
      marked: true,
    };
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          backgroundColor: "darkblue",
          padding: 10,
          width: "100%",
          height: "15%",
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
          Your Calendar
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "white",
          marginTop: 10,
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            color: "darkblue",
          }}
        >
          {user.properties.name}'s Calendar
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: "15%",
          margin: 10,
        }}
      >
        <Calendar
          minDate={Date()}
          markedDates={markedDates}
          onDayPress={(day) => {
            if (markedDates[day.dateString]) {
              alert(
                "You have an appointment with " +
                  markedDates[day.dateString].doctorname
              );
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Bookingscreen;

const styles = StyleSheet.create({});
