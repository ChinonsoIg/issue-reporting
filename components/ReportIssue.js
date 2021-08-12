import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "react-native-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { Camera } from "expo-camera";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "firebase/app";

import { bgSecondary, darkerPurple, white, red, purple, purple_80, purple_40, purple_95, purple_70, black, darkPurple } from "../utils/colours";
import { dept, loc } from "../utils/api";
import CameraScreen from "./CameraScreen";
import { connect } from "react-redux";

// Uninstall this
import SelectDropdown from "react-native-select-dropdown";


const ReportIssue = (props) => {
  const { currentUser } = props;

  // For issue title
  const [title, setTitle] = useState("");

  // To select department
  const [deptOpen, setDeptOpen] = useState(false);
  const [department, setDepartment] = useState(null);
  const [depts, setDepts] = useState(dept);

  // To select location
  const [locationOpen, setLocationOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [locs, setLocs] = useState(loc);

  // For issue description
  const [description, setDescription] = useState(""); 


  
  const [pictureURI, setPictureURI] = useState(null);
  
  const sendData = (data) => {
    setPictureURI(data)
    alert(data);
    // console.log(data);
  };


  const uploadImage = async() => {
    const response = await fetch(pictureURI);
    const blob = await response.blob();
    const childPath = `issue/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`

    const task = firebase
      .storage()
      .ref()
      .child(childPath)
      .put(blob);

    const taskProgress = (snapshot) => {
      console.log('Transferred: ', snapshot.bytesTransferred)
    }
    
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL()
        .then((snapshot) => {
          savePostData(snapshot)
          console.log(snapshot);
        })
    }

    const taskError = (snapshot) => {
      console.log('Error: ', snapshot)
    }

    task.on("state_changed", taskProgress, taskError, taskCompleted)

  }

  const savePostData = (downloadURL) => {
    const { name, email } = currentUser
    const newPostData = firebase.firestore().collection("issues").doc()
      newPostData.set({
        downloadURL,
        title,
        department,
        location,
        description,
        reportedBy: name,
        creation: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log({
          title,
          department,
          location,
          description,
        });
      })
  }


  // const onSubmit = () => {
  //   console.log({
  //     title,
  //     department,
  //     location,
  //     description,
  //   })
  // }

  return (
    <SafeAreaView style={styles.container}>
     
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss} >
          <View style={{flex: 1, justifyContent: 'space-around'}}>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(e) => setTitle(e)}
              selectionColor={purple_40}
              placeholder='Issue title'
            />
            <View style={{marginVertical: 8}}>
              <Text>Assign department:</Text>
              <DropDownPicker
                placeholder='Select department'
                open={deptOpen}
                value={department}
                items={depts}
                setOpen={setDeptOpen}
                setValue={setDepartment}
                setItems={setDepts}
                zIndex={10000}
                style={{ borderWidth: 2, borderColor: purple_80, borderRadius: 5 }}
              />
            </View>
            
            <View style={{marginVertical: 8}}>
              <Text>Pick a location:</Text>
              <DropDownPicker
                placeholder='Select location'
                open={locationOpen}
                value={location}
                items={locs}
                setOpen={setLocationOpen}
                setValue={setLocation}
                setItems={setLocs}
                style={{borderWidth: 2, borderColor: purple_80, borderRadius: 5}}
              />
            </View>
            
            <View style={{borderColor: purple_80, borderWidth: 2, borderRadius: 5, marginVertical: 8, backgroundColor: white}}>
              <TextInput 
                multiline
                numberOfLines={5}
                value={description}
                onChangeText={(e) => setDescription(e)}
                selectionColor={purple_40}
                padding={5}
                placeholder="Issue description..."
              />
            </View>
            
            <View style={{marginVertical: 8}}>
              <Text>
                Tap the button below to share a photo from your phone or take a picture with your camera!
              </Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button
                  title="Take picture"
                  onPress={() =>
                    props.navigation.navigate('CameraScreen', {
                      sendData: sendData,
                    })
                  }
                />
              </View>
            </View>


            {/* {
              pictureURI && <Image source={pictureURI} style={{ width: 200, height: 150 }} />
            } */}
            <View><Text>Gads ka iopornr</Text></View>

            <View style={{marginVertical: 8, flex: 1, justifySelf: 'flex-start'}}>
              <TouchableOpacity
                onPress={() => {
                  uploadImage();
                  props.navigation.navigate("ReportIssueSuccess");
                }}                
                style={styles.btn}>
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
     
    </SafeAreaView>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: bgSecondary,
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
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: darkerPurple,
    marginTop: 6,
    textAlign: 'center'
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
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
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
    borderRadius: 4,
    borderColor: purple_80,
    borderWidth: 3,
    backgroundColor: purple_95,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnTextOutline: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: purple_70,
  },
})


const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  userIssues: store.userState.userIssues
});

// const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, null)(ReportIssue);

