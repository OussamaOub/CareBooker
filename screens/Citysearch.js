import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Citysearchresults from "../components/Citysearchresults";

const cities = [
  {
    cityname: "Marrakech",
    short_description: "Known for its bustling markets",
    photo:
      "https://www.planetware.com/wpimages/2019/04/morocco-marrakesh-top-attractions-djemaa-el-fna.jpg",
  },
  {
    cityname: "Casablanca",
    short_description: "Famous for its beautiful beaches and lively nightlife",
    photo:
      "https://www.lopinion.ma/photo/art/grande/60734155-44420961.jpg?v=1638460848",
  },
  {
    cityname: "Fes",
    short_description: "Home to the world-famous Fes el-Bali medina",
    photo:
      "https://www.visitmorocco.com/sites/default/files/styles/thumbnail_destination_background_top5/public/thumbnails/image/tanneries-medina-of-fez-morocco-wizard8492.jpg",
  },
  {
    cityname: "Tangier",
    short_description:
      "Known for its stunning coastal views and historical landmarks",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Tanger_cor.jpg/800px-Tanger_cor.jpg",
  },
  {
    cityname: "Agadir",
    short_description: "Famous for its long sandy beaches and mild weather",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjgOm1e_5_eUocFAviz08KO47SmqaVFJKs1g&usqp=CAU",
  },
  {
    cityname: "Chefchaouen",
    short_description: "Famed for its picturesque blue-painted buildings",
    photo:
      "https://www.traveltalktours.com/wp-content/uploads/2022/03/milad-alizadeh-JibMa0FbyHw-unsplash-1024x683.jpg",
  },
  {
    cityname: "Essaouira",
    short_description:
      "Known for its charming white-washed buildings and vibrant arts scene",
    photo:
      "https://african-wanderlust.com/wp-content/uploads/2018/12/Essaouira-Maroc-Tout-Ce-Quil-Faut-Savoir-Avant-Votre-Voyage.jpg.webp",
  },
  {
    cityname: "Rabat",
    short_description:
      "Home to the Mausoleum of Mohammed V and the Hassan Tower",
    photo:
      "https://www.frs.es/fileadmin/_processed_/3/7/csm_csm-frs-iberia-destinos-rabat_06cdf5682b.jpg",
  },
  {
    cityname: "Meknes",
    short_description:
      "Famous for its ornate city gates and impressive historic landmarks",
    photo:
      "https://laterreestunjardin.com/wp-content/uploads/2018/10/Meknes-Bab-Mansour-1080x675.jpg",
  },
  {
    cityname: "Ouarzazate",
    short_description:
      "Known for its picturesque desert landscapes and famous film studios",
    photo:
      "https://www.historyhit.com/app/uploads/fly-images/5161755/ouarzazate-690x388-c.jpg?x70633",
  },
];

const Citysearch = () => {
  const [input, setInput] = useState("");
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          padding: 10,
          backgroundColor: "white",
          borderRadius: 30,
          width: Dimensions.get("window").width - 40,
          flexDirection: "row",
          alignItems: "center",
          borderColor: "#000",
          borderWidth: 1,
          marginTop: 50,
          margin: 10,
          justifyContent: "space-between",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.51,
          shadowRadius: 13.16,
          elevation: 20,
        }}
      >
        <TextInput
          placeholder="Enter your destination"
          placeholderTextColor={"black"}
          style={{
            width: Dimensions.get("window").width - 85,
            fontSize: 19,
            opacity: 0.8,
            textDecorationColor: "white",
          }}
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <MaterialIcons name="location-searching" size={26} color="black" />
      </View>
      <View
        style={{
          backgroundColor: "white",
          height: "100%",
        }}
      >
        <Citysearchresults data={cities} input={input} setInput={setInput} />
      </View>
    </SafeAreaView>
  );
};

export default Citysearch;

const styles = StyleSheet.create({});
