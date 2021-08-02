import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, TouchableHighlight, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { purple, white, goldenRod, purple_95, purple_80, bgSecondary, darkerPurple, purple_70, darkPurple } from "../../utils/colours";
import logo from "../../image/processing_thoughts.png";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = () => {
    console.log(email, password)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View 
        style={{
          flex: 1, 
          alignItems: 'center', 
          justifyContent: 'center'
        }}
      >
        <Image source={logo} style={styles.profilePic} />
        <Text style={[styles.boldText, {alignSelf: 'flex-start'}]}>Welcome Back!</Text>
        <Text style={{alignSelf: 'flex-start'}}>Sign in to continue</Text>
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
        />
        <View 
          // style={{
          //   flex: 1,
          //   flexDirection: 'row', 
          //   alignItems: 'space-between', 
          //   justifyContent: 'space-between'
          // }}
        >
          <Text>Remember me</Text>
          <Text>Forgot password?</Text>
        </View>
        <TouchableHighlight style={styles.btn} onPress={onSubmit}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableHighlight>
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
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  boldText: {
    fontWeight: 'bold',
    color: darkPurple,
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
