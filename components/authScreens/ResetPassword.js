import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, TouchableHighlight, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "react-native-vector-icons";

import { purple, white, purple_95, purple_80, darkPurple, purple_40 } from "../../utils/colours";
// import landingImage from "../../image/work_together.png";


const SignIn = ({ navigation }) => {
  // const [email, setEmail] = useState("");
  const [emailForResetPassword, setEmailForResetPassword] = useState("");

  const onSubmit = () => {
    console.log(email, password)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }} >        
        <View
          style={{
            flex: 1, 
            justifyContent: 'space-around',
          }}
        >
          <View>
            <Text style={{alignSelf: 'flex-start'}}>
              Please enter your e-mail address below. We will send you a link on how to recover your password.
            </Text>
            <TextInput 
              style={styles.input} 
              onChangeText={(e) => setEmailForResetPassword(e)}
              value={emailForResetPassword}
              placeholder="E-mail"
            />
            <View 
              style={{
                width: '100%',
                flexDirection: 'row',  
                justifyContent: 'flex-end',
              }}
            >
              <Ionicons
                name="ios-return-up-back"
                size={20}
                color={purple_40}
              />
              <Text 
                style={{ marginHorizontal: 5, 
                  color:purple_40 
                }}
                onPress={() => navigation.navigate("Sign In")}
              >
                Go back
              </Text>
            </View>
          </View>
          <TouchableHighlight style={styles.btn} onPress={onSubmit} underlayColor={purple_80} >
            <Text style={styles.btnText}>Submit</Text>
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
