import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { TextInput } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../components/UserProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { getuserbyemail, userss } from "../components/Users";
import { Image } from "react-native";

const Loginscreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useUser();
  const [tosignup, setTosignup] = useState([]);
  const navigation = useNavigation();
  const [securepassview, setSecurepassview] = useState(true);

  const signup = () => {
    navigation.navigate("SignupScreen");
  };
  const logg = async (email, password) => {
    // let flag = 0;
    // const users = await userss();
    // for (let i = 0; i < users.length; i++) {
    //   if (
    //     users[i].email.toLowerCase().trim() === email.toLowerCase().trim() &&
    //     users[i].password === password
    //   ) {
    //     setUser(users[i]);
    //     flag = 1;
    //     break;
    //   }
    // }
    // if (flag === 0) {
    //   alert("Invalid Credentials");
    // } else {
    //   navigation.navigate("IdleScreen");
    // }
    const person = await getuserbyemail(email).then((person) => {
      if (person.length == 0) {
        alert("Invalid Credentials");
      } else {
        if (person.password == password) {
          setUser(person);
          navigation.navigate("IdleScreen");
        } else {
          alert("Invalid Credentials");
        }
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 60,
        backgroundColor: "white",
      }}
    >
      <FontAwesome5 name="hospital-user" size={99} color="darkblue" />
      <View
        style={{
          gap: 40,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#f2f2f2",
            width: 300,
            height: 60,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 5,
          }}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor={"grey"}
            style={{
              width: Dimensions.get("window").width - 100,
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
              textAlign: "center",
              opacity: 0.8,
            }}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#f2f2f2",
            width: 300,
            height: 60,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 5,
          }}
        >
          <TextInput
            placeholder="Password"
            placeholderTextColor={"grey"}
            style={{
              width: Dimensions.get("window").width - 100,
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
              textAlign: "center",
              opacity: 0.8,
            }}
            secureTextEntry={securepassview}
            value={password ? password : null}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          {securepassview ? (
            <Pressable
              style={{
                position: "absolute",
                top: 15,
                right: 20,
              }}
              onPress={() => {
                setSecurepassview(!securepassview);
              }}
            >
              <Image
                source={require("../assets/eye-closed.png")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </Pressable>
          ) : (
            <Pressable
              style={{
                position: "absolute",
                top: 15,
                right: 20,
              }}
              onPress={() => {
                setSecurepassview(!securepassview);
              }}
            >
              <Image
                source={require("../assets/eye-open.png")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </Pressable>
          )}
        </Pressable>
      </View>
      <View
        style={{
          gap: 10,
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#5c80ff",
            width: 300,
            height: 60,
            borderRadius: 20,
            borderColor: "white",
            borderWidth: 2,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 5,
          }}
          onPress={() => {
            logg(email, password);
          }}
        >
          <Text> Log in</Text>
        </Pressable>
        <Text>Don't have an account? </Text>
        <Pressable
          style={{
            backgroundColor: "#5c80ff",
            width: 300,
            height: 60,
            borderRadius: 20,
            borderColor: "white",
            borderWidth: 2,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 5,
          }}
          onPress={() => {
            signup();
          }}
        >
          <Text>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Loginscreen;
