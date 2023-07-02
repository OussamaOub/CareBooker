import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { useUser } from "../components/UserProvider";

const BetweenChattandChatt = () => {
  const navigation = useNavigation();
  const { user } = useUser();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "darkblue",
          height: 80,
          borderBottomColor: "transparent",
          shadowColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{
            position: "absolute",
            left: 20,
            top: 40,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="arrowleft" size={26} color="white" />
        </Pressable>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 20,
          }}
        >
          Start a new conversation
        </Text>
      </View>
      <View>
        {user.properties.prescriptions.length === 0 ? (
          <View>
            <Pressable
              style={{
                backgroundColor: "blue",
                width: 150,
                height: 50,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Create a new conversation</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <Text>You currently have messages</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default BetweenChattandChatt;

const styles = StyleSheet.create({});
