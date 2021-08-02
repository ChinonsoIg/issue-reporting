import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, TouchableHighlight, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { purple, white, purple_95, purple_80, darkPurple, purple_40 } from "../../utils/colours";
import landingImage from "../../image/work_together.png";


const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    console.log(email, password)
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
