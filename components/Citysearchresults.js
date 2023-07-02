import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Citysearchresults = ({ data, input, setInput }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item.cityname.toLowerCase().includes(input.toLowerCase())) {
            if (input === "") {
              return null;
            }
            return (
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderColor: "lightgrey",
                  shadowColor: "black",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.2,
                  shadowRadius: 20,
                  elevation: 15,
                  borderRadius: 20,
                  backgroundColor: "white",
                  marginBottom: 30,
                  gap: 10,
                  width: Dimensions.get("window").width - 20,
                }}
                onPress={() => {
                  setInput(item.cityname);
                  navigation.navigate("Home", {
                    selectedCity: item.cityname,
                  });
                }}
              >
                <View
                  style={{
                    borderRadius: 20,
                    gap: 10,
                    overflow: "hidden",
                    marginLeft: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.photo }}
                    style={{ width: 120, height: 120 }}
                  ></Image>
                </View>
                <View
                  style={{
                    width: Dimensions.get("window").width - 150,
                    marginVertical: 10,
                    gap: 10,
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      color: "purple",
                    }}
                  >
                    {item.cityname}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    {item.short_description}
                  </Text>
                </View>
              </Pressable>
            );
          }
        }}
      ></FlatList>
    </View>
  );
};

export default Citysearchresults;

const styles = StyleSheet.create({});
