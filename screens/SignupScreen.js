import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import {
  addusertocollection,
  checkifuserexists,
  getImage,
  uploadImage,
  userss,
} from "../components/Users";
import { Picker } from "@react-native-picker/picker";
import { Pressable } from "react-native";
import { ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { adduser } from "../components/Users";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "@react-native-firebase/firestore";
import { Image } from "react-native";

let flag = 0;
const SignupScreen = () => {
  const [userslist, setUserslist] = useState([]);

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass2, setPass2] = useState("");
  const [accountType, setAccountType] = useState("patient");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [speciality, setSpeciality] = useState("Common");
  const [city, setCity] = useState("Casablanca");
  const [fee, setFee] = useState(0);
  const [clinic, setClinic] = useState("");
  const [approved, setApproved] = useState(false.toString());
  const [image, setImage] = useState(null);
  const [imagelink, setImagelink] = useState("");
  const [document, setDocument] = useState(null);
  const [documentlink, setDocumentlink] = useState("");
  const [unavailabledates, setUnavailabledates] = useState([]);
  const [securepassview, setSecurepassview] = useState(true);

  const handleSubmit = async () => {
    if (
      email === "" ||
      password === "" ||
      name === "" ||
      age === "" ||
      address === "" ||
      phone === "" ||
      imagelink === ""
    ) {
      if (
        accountType === "doctor" &&
        (speciality === "" || fee === "" || documentlink === "")
      ) {
        alert("Please fill all the fields");
      } else {
        alert("Please fill all the fields");
      }
      return;
    }

    if (emailchecker(email) === false) {
      alert("Invalid Email");
      return;
    }
    if (passwordchecker(password) === false) {
      alert("Password cannot be empty");
      return;
    }
    if (password !== pass2) {
      alert("Passwords do not match");
      return;
    }
    // setEmail(email.toLowerCase());
    const user = {
      email: email.toLowerCase(),
      password: password,
      prescriptions: prescriptions,
      image: imagelink,
      unavailableDates: unavailabledates,
      // generate random id
      id: Math.floor(Math.random() * 100000000),
      properties: {
        accountType: accountType,
        name: name,
        age: age,
        address: address,
        phone: phone,
      },
    };

    if (accountType === "doctor") {
      (user.speciality = speciality),
        (user.fee = fee),
        (user.properties.city = city),
        (user.properties.clinic = clinic);
      user.properties.approved = approved;
      user.document = documentlink;
      user.reviews = [];
    }
    const confirmation = await checkifuserexists(user.email);
    if (confirmation === true) {
      alert("User already exists");
      return;
    }
    await addusertocollection(user);
    alert("User added successfully");
    navigation.goBack();
  };

  function emailchecker(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function passwordchecker(password) {
    var re = /\S+/;
    return re.test(password);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      alert("image selected");
      setImage(result.assets[0].uri);
      const filename = result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf("/") + 1
      );

      try {
        const url = await uploadImage(result.assets[0].uri, filename);
        setImagelink(await getImage(url));
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  const pickDocument = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      alert("Document selected");
      setDocument(result.assets[0].uri);
      const filename = result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf("/") + 1
      );

      try {
        const url = await uploadImage(result.assets[0].uri, filename);
        setDocumentlink(await getImage(url));
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: "darkblue",
          height: "10%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Signup
        </Text>
      </View>

      <ScrollView
        style={{
          height: "90%",
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholderTextColor={"black"}
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          {emailchecker(email) === false && email !== "" ? (
            <Text style={{ color: "red" }}>Invalid Email</Text>
          ) : null}
          <View style={styles.input}>
            <TextInput
              placeholder="Password"
              value={password}
              secureTextEntry={securepassview}
              placeholderTextColor={"black"}
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
          </View>

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={pass2}
            placeholderTextColor={"black"}
            secureTextEntry={true}
            onChangeText={(text) => setPass2(text)}
          />
          {pass2 !== password && pass2 !== "" ? (
            <Text style={{ color: "red" }}>Passwords do not match</Text>
          ) : null}

          <TextInput
            placeholderTextColor={"black"}
            style={styles.input}
            placeholder="Full name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={"black"}
            placeholder="Age"
            value={age}
            onChangeText={(text) => setAge(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={"black"}
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor={"black"}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            keyboardType="numeric"
          />
          <Pressable
            style={{
              width: "100%",
              height: 50,
              borderWidth: 2,
              borderColor: "#ccc",
              borderRadius: 25,
            }}
          >
            <Picker
              mode="dropdown"
              selectedValue={accountType}
              onValueChange={(itemValue, itemIndex) =>
                setAccountType(itemValue)
              }
              style={{
                color: "black",
              }}
            >
              <Picker.Item label="Patient" value="patient" />
              <Picker.Item label="Doctor" value="doctor" />
            </Picker>
          </Pressable>

          {accountType === "doctor" ? (
            <>
              <Pressable
                style={{
                  marginTop: 10,
                  width: "100%",
                  height: 50,
                  borderWidth: 2,
                  borderColor: "#ccc",
                  borderRadius: 25,
                }}
              >
                <Picker
                  mode="dropdown"
                  selectedValue={speciality}
                  onValueChange={(itemValue, itemIndex) =>
                    setSpeciality(itemValue)
                  }
                  style={{
                    color: "black",
                  }}
                >
                  <Picker.Item label="Common" value="Common" />
                  <Picker.Item label="Cardiologist" value="Cardiologist" />
                  <Picker.Item label="Dentist" value="Dentist" />
                  <Picker.Item label="Dermatologist" value="Dermatologist" />
                  <Picker.Item
                    label="Endocrinologist"
                    value="Endocrinologist"
                  />
                  <Picker.Item
                    label="Gastroenterologist"
                    value="Gastroenterologist"
                  />
                  <Picker.Item label="Gynecologist" value="Gynecologist" />
                  <Picker.Item label="Neurologist" value="Neurologist" />
                  <Picker.Item label="Oncologist" value="Oncologist" />
                  <Picker.Item
                    label="Ophthalmologist"
                    value="Ophthalmologist"
                  />
                  <Picker.Item label="Orthopedist" value="Orthopedist" />
                  <Picker.Item label="Pediatrician" value="Pediatrician" />
                  <Picker.Item label="Psychiatrist" value="Psychiatrist" />
                  <Picker.Item label="Pulmonologist" value="Pulmonologist" />
                  <Picker.Item label="Rheumatologist" value="Rheumatologist" />
                  <Picker.Item label="Surgeon" value="Surgeon" />
                </Picker>
              </Pressable>
              <Pressable
                style={{
                  marginTop: 10,
                  width: "100%",
                  height: 50,
                  borderWidth: 2,
                  borderColor: "#ccc",
                  borderRadius: 25,
                }}
              >
                <Picker
                  mode="dropdown"
                  selectedValue={city}
                  style={{
                    color: "black",
                  }}
                  defaultValue={"Casablanca"}
                  onValueChange={(itemValue) => setCity(itemValue)}
                >
                  <Picker.Item label="Casablanca" value="Casablanca" />
                  <Picker.Item label="Rabat" value="Rabat" />
                  <Picker.Item label="Fes" value="Fes" />
                  <Picker.Item label="Meknes" value="Meknes" />
                  <Picker.Item label="Marrakech" value="Marrakech" />
                  <Picker.Item label="Essaouira" value="Essaouira" />
                  <Picker.Item label="Chefchaouen" value="Chefchaouen" />
                  <Picker.Item label="Tangier" value="Tangier" />
                </Picker>
              </Pressable>
              <TextInput
                style={styles.input}
                placeholder="Consultation fee"
                value={fee}
                onChangeText={(text) => setFee(text)}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Clinic (optional)"
                value={clinic}
                onChangeText={(text) => setClinic(text)}
              />
              <Pressable
                style={{
                  width: "100%",
                  height: 50,
                  borderWidth: 2,
                  borderColor: "#ccc",
                  borderRadius: 25,
                  marginTop: 10,
                  justifyContent: "center",
                }}
                onPress={() => {
                  pickDocument();
                }}
              >
                {documentlink ? (
                  <View>
                    <Image
                      source={{ uri: documentlink }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                      }}
                    />
                  </View>
                ) : (
                  <Text
                    style={{ color: "grey", alignSelf: "center", fontSize: 18 }}
                  >
                    Upload your medical license
                  </Text>
                )}
              </Pressable>
            </>
          ) : (
            <></>
          )}
          <Pressable
            style={{
              width: "100%",
              height: 50,
              borderWidth: 2,
              borderColor: "#ccc",
              borderRadius: 25,
              marginTop: 10,
              justifyContent: "center",
            }}
            onPress={() => {
              pickImage();
            }}
          >
            {imagelink ? (
              <View>
                <Image
                  source={{ uri: imagelink }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </View>
            ) : (
              <Text
                style={{ color: "grey", alignSelf: "center", fontSize: 18 }}
              >
                Upload your photo
              </Text>
            )}
          </Pressable>
        </View>
        <Pressable
          style={{
            width: 200,
            height: 50,
            justifyContent: "center",
            borderWidth: 2,
            borderColor: "#ccc",
            borderRadius: 25,
            marginVertical: 10,
            alignSelf: "center",
            alignContent: "center",
            backgroundColor: "darkblue",
          }}
          onPress={() => handleSubmit()}
        >
          <Text
            style={{
              transform: [{ translateY: -5 }],
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 5,
              color: "white",
            }}
          >
            Signup
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  genereal: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: -10,
    fontSize: 15,
  },
});

export default SignupScreen;
