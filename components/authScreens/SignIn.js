import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, TouchableHighlight, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from 'expo-notifications';
import landingImage from "../../image/work_together.png";
import { purple, white, purple_95, purple_80, darkPurple, purple_40 } from "../../utils/colours";

import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../redux/slices/userSlice";

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
      title: `${name} Welcome back`,
      body: "You're signed in!",
      // data: { data: 'goes here njj hjjj' },
    },
    trigger: { seconds: 2 },
  });
}


const SignIn = ({ navigation }) => {
  // const dispatch = useDispatch()
  const user = useSelector(currentUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('signin: ',result);
        // schedulePushNotification(user.name);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            Alert.alert("Please enter a valid email address")          
            break;
          case "auth/user-not-found":
            Alert.alert("User not found")
            break;        
          default:
            Alert.alert("Email and/or password incorrect")
            break;
        }
      })
    } catch (err) {
      console.error(err);
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }} >
        <View
          style={{
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center'
          }}
        >
          <Image source={landingImage} style={styles.img} />
        </View>
        
        <View
          style={{
            flex: 2, 
            justifyContent: 'space-around',
          }}
        >
          <View>
            <Text style={[styles.boldText, {alignSelf: 'flex-start'}]}>Welcome back!</Text>
            <Text style={{alignSelf: 'flex-start'}}>Sign in to continue</Text>
          </View>
        
          <View>
            <TextInput 
              style={styles.input} 
              onChangeText={(e) => setEmail(e)}
              value={email}
              placeholder="E-mail"
            />
            <TextInput 
              style={styles.input}
              onChangeText={(e) => setPassword(e)}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
            />
            <View 
              style={{
                width: '100%',
                flexDirection: 'row',  
                justifyContent: 'flex-end',
              }}
            >
              <Text 
                style={{ marginHorizontal: 10, 
                  color:purple_40 
                }}
                onPress={() => navigation.navigate("Reset Password")}
              >
                Forgot password?
              </Text>
            </View>
          </View>
          <TouchableHighlight 
            style={styles.btn} 
            onPress={onSignIn} 
            underlayColor={purple_80} 
          >
            <Text style={styles.btnText}>Sign In</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12
  },
  input: {
    height: 50,
    marginVertical: 15,
    padding: 5,
    borderWidth: 1,
    borderColor: purple_80,
    borderRadius: 5,
    backgroundColor: white,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: darkPurple,
  },
  img: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderRadius: 5,
    backgroundColor: purple,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: white,
  },
  btnOutline: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderRadius: 5,
    borderColor: purple,
    borderWidth: 5,
    backgroundColor: purple_95,
  },
  btnTextOutline: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: purple,
  },
})


export default SignIn;
