import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "react-native-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { Camera } from "expo-camera";

import { bgSecondary, darkerPurple, white, red, purple, purple_80, purple_40, purple_95, purple_70, black } from "../utils/colours";
import { depts, loc } from "../utils/api";

// Uninstall this
import SelectDropdown from "react-native-select-dropdown";


const ReportIssue = ({ navigation }) => {
  // For issue title
  const [text, onChangeText] = useState("");
  
  // To select department
  const [deptOpen, setDeptOpen] = useState(false);
  const [deptValue, setDeptValue] = useState(null);
  const [department, setDepartment] = useState(depts);
  
  // To select location
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationValue, setLocationValue] = useState(null);
  const [location, setLocation] = useState(loc);
  
  // For selecting photo
  const [selectedImage, setSelectedImage] = useState(null);
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    // console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  }

  // If selected image is a thing
  if (selectedImage !== null) {    
    return (
      <SafeAreaView style={styles.container}>        
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '350', borderWidth: 2, borderColor: red}}>
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
          />
        </View>
      </SafeAreaView>
    )
  } 

  // For camera
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }

  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
   console.log(photo);
  }

  // This is for Snackbar
  return (
    <SafeAreaView style={styles.container}>
      {startCamera ? (
        <Camera
          style={{flex: 1,width:"100%"}}
          ref={(r) => {
            let camera = r
          }}
        >
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              flex: 1,
              width: '100%',
              padding: 20,
              justifyContent: 'space-between'
            }}
          >
            <View
              style={{
                alignSelf: 'flex-start',
                flex: 1,
                alignItems: 'center'
              }}
            >
              <Ionicons 
                name="return-up-back"
                size={20}
                color={black}
              />
            </View>
            <View
              style={{
                alignSelf: 'center',
                flex: 1,
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                onPress={__takePicture}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 0,
                  borderRadius: 50,
                  backgroundColor: '#fff'
                }}
              />
            </View>
          </View>
        </Camera>
      ) : (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss} >
            <View style={{flex: 1, justifyContent: 'space-around'}}>
              <Text style={styles.header}>Report an Issue</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                selectionColor={purple_40}
                placeholder='Issue title'
              />
              <View style={{marginVertical: 8}}>
                <Text>Assign department:</Text>
                <DropDownPicker
                  placeholder='Select department'
                  open={deptOpen}
                  value={deptValue}
                  items={department}
                  setOpen={setDeptOpen}
                  setValue={setDeptValue}
                  setItems={setDepartment}
                  zIndex={10000}
                  style={{borderWidth: 2, borderColor: purple_80, borderRadius: 5}}
                />
              </View>
              
              <View style={{marginVertical: 8}}>
                <Text>Pick a location:</Text>
                <DropDownPicker
                  placeholder='Select location'
                  open={locationOpen}
                  value={locationValue}
                  items={location}
                  setOpen={setLocationOpen}
                  setValue={setLocationValue}
                  setItems={setLocation}
                  style={{borderWidth: 2, borderColor: purple_80, borderRadius: 5}}
                />
              </View>
              
              <View style={{borderColor: purple_80, borderWidth: 2, borderRadius: 5, marginVertical: 8, backgroundColor: white}}>
                <TextInput 
                  multiline
                  numberOfLines={5}
                  // editable
                  selectionColor={purple_40}
                  padding={5}
                  placeholder="Issue description..."
                />
              </View>
              
              <View style={{marginVertical: 8}}>
                <Text>
                  Tap on the suitable button below to share a photo from your phone or take a picture with your camera!
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                  <TouchableOpacity onPress={openImagePickerAsync} style={styles.btnOutline}>
                    <Ionicons 
                      name={Platform.OS === 'ios'
                        ? 'ios-folder'
                        : 'md-folder'
                      }
                      color={purple_70}
                      size={16}
                    />
                    <Text style={[styles.btnTextOutline]}>Pick a photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={__startCamera} style={styles.btnOutline}>
                  <Ionicons 
                    name={Platform.OS === 'ios'
                      ? 'ios-camera'
                      : 'md-camera'
                    }
                    color={purple_70}
                    size={16}
                  />
                  <Text style={[styles.btnTextOutline]}>Take picture</Text>
                </TouchableOpacity>
                </View>
              </View>
              
              <View style={{marginVertical: 8, flex: 1, justifySelf: 'flex-start'}}>
                <TouchableOpacity
                  onPress={() => {
                    alert('Hello, world!');
                    navigation.navigate("ReportIssueSuccess");
                  }}
                  style={styles.btn}>
                  <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
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
    borderWidth: 2,
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
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 3,
    borderRadius: 5,
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
  thumbnail: {
    width: 120,
    height: 120,
    resizeMode: "contain"
  },
})


export default ReportIssue;

