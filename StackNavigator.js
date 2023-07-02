import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homescreen from "./screens/Homescreen";
import Profilescreen from "./screens/Profilescreen";
import Savedscreen from "./screens/Savedscreen";
import Bookingscreen from "./screens/Bookingscreen";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import DoctorSearchProfile from "./components/DoctorSearchProfile";
import Citysearch from "./screens/Citysearch";
import Doctorsearch from "./screens/Doctorsearch";
import Loginscreen from "./screens/Loginscreen";
import UserProvider from "./components/UserProvider";
import DoctorMainscreen from "./screens/Doctor/DoctorMainscreen";
import IdleScreen from "./screens/IdleScreen";
import BookedTimes from "./screens/Doctor/BookedTimes";
import Patients from "./screens/Doctor/Patients";
import SignupScreen from "./screens/SignupScreen";
import AddPrescription from "./components/AddPrescription";
import UploadPhoto from "./components/UploadPhoto";
import MessagesScreen from "./screens/MessagesScreen";
import Chatt from "./components/Chatt";
import BetweenChattandChatt from "./components/BetweenChattandChatt";
import AdminScreen from "./screens/AdminScreen";
import AddPrescription2 from "./components/AddPrescription2";
import ShowPrescriptions from "./screens/ShowPrescriptions";
import ShowPatient from "./screens/Doctor/ShowPatient";

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Homescreen}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#003580" />
              ) : (
                <AntDesign name="home" size={24} color="#1E90FF" />
              ),
          }}
        />
        <Tab.Screen
          name="Booking"
          component={Bookingscreen}
          options={{
            tabBarLabel: "Appointments",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="calendar" size={24} color="#003580" />
              ) : (
                <Feather name="calendar" size={24} color="#1E90FF" />
              ),
          }}
        />
        <Tab.Screen
          name="Saved"
          component={Savedscreen}
          options={{
            tabBarLabel: "Perscriptions",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="heart" size={24} color="#003580" />
              ) : (
                <Feather name="heart" size={24} color="#1E90FF" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profilescreen}
          options={{
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="ios-person" size={24} color="#003580" />
              ) : (
                <Ionicons name="person-outline" size={24} color="#1E90FF" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  function BottomTabsDoctor() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="DoctorMainScreen"
          component={DoctorMainscreen}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#003580" />
              ) : (
                <AntDesign name="home" size={24} color="#1E90FF" />
              ),
          }}
        />
        <Tab.Screen
          name="Booking"
          component={BookedTimes}
          options={{
            tabBarLabel: "Appointments",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="calendar" size={24} color="#003580" />
              ) : (
                <Feather name="calendar" size={24} color="#1E90FF" />
              ),
          }}
        />
        <Tab.Screen
          name="Patients"
          component={Patients}
          options={{
            tabBarLabel: "Patients",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="heart" size={24} color="#003580" />
              ) : (
                <Feather name="heart" size={24} color="#1E90FF" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profilescreen}
          options={{
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="ios-person" size={24} color="#003580" />
              ) : (
                <Ionicons name="person-outline" size={24} color="#1E90FF" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Loginscreen"
            component={Loginscreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Main"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DoctorProfileSearch"
            component={DoctorSearchProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Citysearch"
            component={Citysearch}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Doctorsearch"
            component={Doctorsearch}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DoctorMainscreen"
            component={BottomTabsDoctor}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="IdleScreen"
            component={IdleScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddPrescription"
            component={AddPrescription}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UploadPhoto"
            component={UploadPhoto}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MessagesScreen"
            component={MessagesScreen}
            options={{ headerTitle: "Messages" }}
          />
          <Stack.Screen
            name="Chatt"
            component={Chatt}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BetweenChattandChatt"
            component={BetweenChattandChatt}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminScreen"
            component={AdminScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddPrescription2"
            component={AddPrescription2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ShowPrescriptions"
            component={ShowPrescriptions}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ShowPatient"
            component={ShowPatient}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default StackNavigator;
