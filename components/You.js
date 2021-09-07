import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as Notifications from 'expo-notifications';

import { bgSecondary, darkPurple, white, purple_80, purple_95, red, darkerPurple, purple } from "../utils/colours";
import { convertToUppercase } from "../utils/helpers";
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

async function schedulePushNotification(name) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `$Thank you ${name}`,
      body: `You're signed out!`,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}


const You = (props) => {
  const dispatch = useDispatch()
  
  const user = useSelector(currentUser);

  const { name, department } = user;

  const [modalVisible, setModalVisible] = useState(false)

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
        schedulePushNotification(convertToUppercase(firstname));
      })
  }

  const onDeleteUser = () => {
    console.log('user deleted');
    setModalVisible(!modalVisible);
    // const userAccount = firebase.auth().currentUser;

    // userAccount.delete().then(() => {
    //   console.log('Your account has been deleted!!');
    //     dispatch(logout())
    //     // schedulePushNotification(name);
    // }).catch((error) => {
    //   console.log('An error ocurred: ', error)
    //   // ...
    // });
  }

  
  return (
    <SafeAreaView style={styles.container}>

      {/* My Modal box */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, styles.bigFont]}>Are you sure? This action cannot be undone!</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Pressable
                style={[styles.button, styles.buttonYes]}
                onPress={() => onDeleteUser()}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonNo]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      
      
      <View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 5}}>
        <Image source={logo} style={styles.profilePic} />
        <Text style={{fontWeight: 'bold', color: darkerPurple}}>{name}</Text>
        <Text>Department: {convertToUppercase(department)}</Text>
      </View>

        {/* TODO: List archived issues here */}
      {/* <View style={{marginVertical: 12}}>
        <Text style={styles.boldText}>
          Archived Issues
        </Text>
        <View style={{backgroundColor: white, paddingVertical: 8}}>
          <Text>List archived issues here</Text>
        </View>
      </View> */}
      
      <View style={{marginVertical: 12}}>
        <Text style={styles.boldText}>
          Help
        </Text>
        <View style={{backgroundColor: white, paddingVertical: 10}}>
          {/* {showBox && <View style={styles.box}></View>} */}
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
      
      <View style={styles.signOut}>
        <MaterialCommunityIcons
          name="delete"
          size={18}
          color={red}
          style={{paddingRight: 12}}
        />
        <Text 
          style={[styles.boldText, {color: red}]} 
          onPress={() => setModalVisible(true)} 
        >
          Delete account
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
  },


  // For Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: purple_95,
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 25,
    width: 100
  },
  buttonNo: {
    backgroundColor: purple,
  },
  buttonYes: {
    backgroundColor: red,
  },
  textStyle: {
    color: white,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 45,
    textAlign: "center",
    color: darkerPurple,
    fontSize: 16
  },
  bigFont: {
    fontSize: 25,
    color: darkerPurple,
  }
})


export default You;
