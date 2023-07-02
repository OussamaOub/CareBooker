import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../components/UserProvider";
import { SafeAreaView } from "react-native";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import { edituser, getImage, getperson } from "../components/Users";
import { Image } from "react-native";
import { Alert } from "react-native";

const Profilescreen = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  const [newname, setnewname] = useState(user.properties.name);
  const [newemail, setnewemail] = useState(user.email);
  const [newpassword, setnewpassword] = useState(user.password);
  const [passtoconfirm, setpasstoconfirm] = useState(user.password);
  const [newphone, setnewphone] = useState(user.properties.phone);
  const [newaddress, setnewaddress] = useState(user.properties.address);
  const [newcity, setnewcity] = useState(user.properties.city);
  const [newage, setnewage] = useState(user.properties.age);
  const [newclinic, setnewclinic] = useState(user.properties.clinic);
  const [newfee, setnewfee] = useState(user.properties.fee);
  const [imagelink, setImagelink] = useState(user.image);
  const [confirm, setConfirm] = useState(false);

  const handlesubmit = async () => {
    if (newname === "") {
      setnewname(user.properties.name);
    }
    if (newemail === "") {
      setnewemail(user.properties.email);
    }

    if (newphone === "") {
      setnewphone(user.properties.phone);
    }
    if (newaddress === "") {
      setnewaddress(user.properties.address);
    }
    if (newcity === "" && user.properties.accountType == "doctor") {
      setnewcity(user.properties.city);
    }
    if (user.properties.age && newage === "") {
      setnewage(user.properties.age);
    }
    if (newclinic === "" && user.properties.accountType == "doctor") {
      setnewclinic(user.properties.clinic);
    }
    if (newfee === "" && user.properties.accountType == "doctor") {
      setnewfee(user.properties.fee);
    }
    if (user.properties.image && imagelink === "") {
      setImagelink(user.properties.image);
    }

    Alert.alert(
      "Confirm",
      "Are you sure you want to update your profile?",
      [
        {
          text: "Cancel",
          onPress: () => setConfirm(false),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            setConfirm(true);
            if (user.properties.accountType === "patient") {
              const newuser = {
                id: user.id,
              };
              await edituser(newuser);
              navigation.navigate("Home");
            } else if (user.properties.accountType === "doctor") {
              const newuser = {
                id: user.id,
                email: newemail,
                image: user.image,
                password: newpassword,
                properties: {
                  name: newname,
                  phone: newphone,
                  address: newaddress,
                  city: newcity,
                  age: newage,
                  clinic: newclinic,
                  fee: newfee,
                  accountType: user.properties.accountType,
                },
              };
              await edituser(newuser);
              navigation.navigate("Home");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
      stickyHeaderIndices={[0]}
    >
      <View
        style={{
          backgroundColor: "#002d76",
          height: 80,
          borderBottomColor: "transparent",
          shadowColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            flexWrap: "wrap",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            transform: [{ translateY: 25 }],
          }}
        >
          Profile
        </Text>
      </View>
      <View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          {/* Show profile picture */}
          <Image
            source={{ uri: user.image }}
            style={{
              width: 150,
              height: 150,
            }}
          />
        </View>
        <View
          style={{
            margin: 20,
            gap: 20,
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Name:
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#002d76",
                position: "absolute",
                right: 80,
              }}
            >
              {user.properties.name}
            </Text>
            <TextInput
              placeholder="Enter new name"
              value={newname}
              textAlign="center"
              onChangeText={(text) => setnewname(text)}
              style={{
                marginTop: 10,
                width: "100%",
                height: 40,
                padding: 10,
                borderWidth: 1,
                borderColor: "#002d76",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#002d76",
                borderRadius: 10,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Email:
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#002d76",
                maxWidth: "80%",
              }}
            >
              {user.email}
            </Text>
            <TextInput
              placeholder="Enter new email"
              value={newemail}
              textAlign="center"
              onChangeText={(text) => setnewemail(text)}
              style={{
                marginTop: 10,
                width: "100%",
                height: 40,
                padding: 10,
                borderWidth: 1,
                borderColor: "#002d76",
                borderRadius: 10,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Password:
            </Text>
            <TextInput
              placeholder="Enter new password"
              value={newpassword}
              textAlign="center"
              onChangeText={(text) => setnewpassword(text)}
              style={{
                marginTop: 10,
                width: "100%",
                height: 40,
                padding: 10,
                borderWidth: 1,
                borderColor: "#002d76",
                borderRadius: 10,
              }}
              secureTextEntry={true}
            />
            <TextInput
              placeholder="confirm new password"
              secureTextEntry={true}
              value={passtoconfirm}
              textAlign="center"
              onChangeText={(text) => setpasstoconfirm(text)}
              style={{
                marginTop: 10,
                width: "100%",
                height: 40,
                padding: 10,
                borderWidth: 1,
                borderColor: "#002d76",
                borderRadius: 10,
              }}
            />
            {newpassword !== passtoconfirm ? (
              <Text
                style={{
                  color: "red",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Passwords have to match
              </Text>
            ) : null}
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Address:
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#002d76",
              }}
            >
              {user.properties.address}
            </Text>

            <TextInput
              placeholder="Enter new address"
              value={newaddress}
              textAlign="center"
              keyboardAppearance="dark"
              onChangeText={(text) => setnewaddress(text)}
              style={{
                marginTop: 10,
                width: "100%",
                height: 40,
                padding: 10,
                borderWidth: 1,
                borderColor: "#002d76",
                borderRadius: 10,
              }}
            />
          </View>

          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Phone number:
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#002d76",
                position: "absolute",
                right: 80,
              }}
            >
              {user.properties.phone}
            </Text>

            <TextInput
              placeholder="Enter new phone number"
              value={newphone}
              textAlign="center"
              keyboardType="numeric"
              keyboardAppearance="dark"
              onChangeText={(text) => setnewphone(text)}
              style={{
                marginTop: 10,
                width: "100%",
                height: 40,
                padding: 10,
                borderWidth: 1,
                borderColor: "#002d76",
                borderRadius: 10,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Age:
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#002d76",
                position: "absolute",
                right: 80,
              }}
            >
              {user.properties.age}
            </Text>

            <TextInput
              placeholder="Enter new age"
              value={newage}
              textAlign="center"
              keyboardType="numeric"
              keyboardAppearance="dark"
              onChangeText={(text) => setnewage(text)}
              style={{
                marginTop: 10,
                width: "100%",
                height: 40,
                padding: 10,
                borderWidth: 1,
                borderColor: "#002d76",
                borderRadius: 10,
              }}
            />
          </View>
          {user.properties.accountType === "doctor" ? (
            <View>
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  City:
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "#002d76",
                    position: "absolute",
                    right: 80,
                  }}
                >
                  {user.properties.city}
                </Text>
                <TextInput
                  placeholder="Enter new city"
                  value={newcity}
                  textAlign="center"
                  onChangeText={(text) => setnewcity(text)}
                  style={{
                    marginTop: 10,
                    width: "100%",
                    height: 40,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "#002d76",
                    borderRadius: 10,
                  }}
                />
              </View>

              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Clinic:
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "#002d76",
                    position: "absolute",
                    right: 80,
                  }}
                >
                  {user.properties.clinic}
                </Text>

                <TextInput
                  placeholder="Enter new clinic"
                  value={newclinic}
                  textAlign="center"
                  keyboardAppearance="dark"
                  onChangeText={(text) => setnewclinic(text)}
                  style={{
                    marginTop: 10,
                    width: "100%",
                    height: 40,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "#002d76",
                    borderRadius: 10,
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Fee:
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "#002d76",
                    position: "absolute",
                    right: 80,
                  }}
                >
                  {user.fee} Dhs
                </Text>

                <TextInput
                  placeholder="Enter new fee"
                  value={newfee}
                  textAlign="center"
                  keyboardType="numeric"
                  keyboardAppearance="dark"
                  onChangeText={(text) => setnewfee(text)}
                  style={{
                    marginTop: 10,
                    width: "100%",
                    height: 40,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "#002d76",
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
          ) : null}
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        >
          {/* {/ Save button */}
          <Pressable
            style={{
              alignItems: "center",
              height: 50,
              alignSelf: "center",
            }}
            onPress={() => {
              handlesubmit();
            }}
          >
            <MaterialIcons name="save" size={55} color="#002d76" />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profilescreen;
