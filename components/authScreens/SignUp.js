import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, TouchableHighlight, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { purple, white, purple_95, purple_80, darkPurple, purple_40, black } from "../../utils/colours";
import landingImage from "../../image/work_together.png";
import { depts, loc } from "../../utils/api";

import firebase from "firebase";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // To select department
  const [deptOpen, setDeptOpen] = useState(false);
  const [department, setDepartment] = useState(null);
  const [dept, setDept] = useState(depts);

  const onSignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
            password,
            department
          })
        console.log(result)
      })
      .then((error) => {
        console.log(error)
      })
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
            flex: 3, 
            justifyContent: 'space-around',
          }}
        >
        
          <View>
            <TextInput 
              style={styles.input} 
              onChangeText={(e) => setName(e)}
              value={name}
              placeholder="Full name"
            />
            <TextInput 
              style={styles.input} 
              onChangeText={(e) => setEmail(e)}
              value={email}
              placeholder="E-mail"
            />
            <View style={{marginVertical: 8}}>
              <Text style={{fontSize:12}}>Select your department:</Text>
              <DropDownPicker
                placeholder='Select department'
                open={deptOpen}
                value={deptValue}
                items={department}
                setOpen={setDeptOpen}
                setValue={setDeptValue}
                setItems={setDepartment}
                zIndex={10000}
                style={{borderWidth: 1, borderColor: purple_80, borderRadius: 5}}
              />
            </View>
            <TextInput 
              style={styles.input}
              onChangeText={(e) => setPassword(e)}
              value={password}
              placeholder="Password"
            />
            <TextInput 
              style={styles.input}
              onChangeText={(e) => setConfirmPassword(e)}
              value={confirmPassword}
              placeholder="Confirm password"
            />
            <View 
              style={{
                width: '100%',
                flexDirection: 'row',  
                justifyContent: 'center',
              }}
            >
              <Text style={{ marginHorizontal: 10, color: black }}>
                Already have an account? 
                <Text style={{ color:purple_40 }}> Sign In </Text>
                instead
              </Text>
            </View>
          </View>
          <TouchableHighlight style={styles.btn} onPress={onSignUp} underlayColor={purple_80} >
            <Text style={styles.btnText}>Sign Up</Text>
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
    height: 40,
    marginVertical: 8,
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
