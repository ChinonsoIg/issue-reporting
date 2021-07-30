import React, {useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { bgSecondary, darkPurple, white, purple, purple_70, purple_80, purple_95, red, purple_40, darkerPurple } from "../utils/colours";
import logo from "../assets/logo.png";
import { color } from "react-native-elements/dist/helpers";

const You = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 5}}>
        <Image source={logo} style={styles.profilePic} />
        <Text style={{fontWeight: 'bold', color: darkerPurple}}>John Doe</Text>
        <Text>Department: Electrical</Text>
      </View>
      
      <View style={{marginVertical: 12}}>
        <Text style={styles.boldText}>
          Archived Issues
        </Text>
        <View style={{backgroundColor: white, paddingVertical: 8}}>
          <Text>List archived issues here</Text>
        </View>
      </View>
      <View style={{marginVertical: 12}}>
        <Text style={styles.boldText}>
          Help
        </Text>
        <View style={{backgroundColor: white, paddingVertical: 10}}>
          <View style={styles.helpItem}>
            <MaterialCommunityIcons
              name="card-account-phone"
              size={18}
              color={purple_80}
              style={{paddingRight: 12}}
            />
            <Pressable onPress={() => navigation.navigate("Contact Us")}>
              <Text>Contact us</Text>
            </Pressable>
          </View>
          <View style={styles.helpItem}>
            <MaterialCommunityIcons
              name="comment-question"
              size={18}
              color={purple_80}
              style={{paddingRight: 12}}
            />
            <Pressable onPress={() => navigation.navigate("Faq")}>
              <Text>Faq</Text>
            </Pressable>
          </View>
          <View style={styles.helpItem}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={18}
              color={purple_80}
              style={{paddingRight: 12}}
            />
            <Pressable onPress={() => navigation.navigate("Terms and Conditions")}>
              <Text>Terms &#38; conditions</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.signOut}>
        <MaterialCommunityIcons
          name="logout"
          size={18}
          color={red}
          style={{paddingRight: 12}}
        />
        <Text style={[styles.boldText, {color: red}]}>
          Sign Out
        </Text>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: bgSecondary,
  },
  profilePic: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 75,
  },
  boldText: {
    fontWeight: 'bold',
    color: darkPurple,
  },
  helpItem: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center',
    marginVertical: 25,
  },
  signOut: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: white,
    marginTop: 15,
    paddingVertical: 5,
  }
})


export default You;