import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as Notifications from 'expo-notifications';

import { bgSecondary, darkPurple, white, purple_80, red, darkerPurple } from "../utils/colours";
import logo from "../assets/logo.png";

// For redux
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";
import { logout, currentUser } from "../redux/slices/userSlice";


// For notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification(title) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: `You're signed out!`,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}


const You = (props) => {

  const dispatch = useDispatch()
  
  const user = useSelector(currentUser);

  const { name, department } = user

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
  
  const onSignOut = () => {
    const firstname = name.split(' ')[0];
  
    firebase.auth().signOut()
      .then(() => {
        console.log('User signed out');
        dispatch(logout())
        // schedulePushNotification(firstname);
      })
  }

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 5}}>
        <Image source={logo} style={styles.profilePic} />
        <Text style={{fontWeight: 'bold', color: darkerPurple}}>{name}</Text>
        <Text>Department: {department}</Text>
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
        <Text 
          style={[styles.boldText, {color: red}]} 
          onPress={onSignOut} 
        >
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
