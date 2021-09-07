import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Button, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Platform, Alert, Modal, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "react-native-vector-icons";

import { bgSecondary, darkerPurple, white, purple, purple_80, purple_40, purple_95, purple_70 } from "../utils/colours";
import { dept, loc } from "../utils/api";
import { generateId, removeWhitespace } from "../utils/helpers";

// For redux
import firebase from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import { currentUser} from "../redux/slices/userSlice";
import { addNotStarted } from "../redux/slices/notStartedSlice";



const ReportIssue = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const [modalVisible, setModalVisible] = useState(false);

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

  useEffect(() => {
    if (props.route.params?.pictureURI) {
      console.log(props.route.params?.pictureURI)
    }

  }, [props.route.params?.pictureURI]);


  // For notification
  // const messaging = firebase.messaging();
  // messaging.getToken({vapidKey: "BEwNLZryLtodn3Yh84PuAxfz0mPpHNUyNoVwE__FXDnVj9Rv7mo54VtU3SaLQDZBb-dXS0QvZA7KgTlaA4k-lLQ"});

  
  const uploadImage = async() => {
    // console.log('in modal');
    setModalVisible(!modalVisible);
    if ((title === null) || (department === null) || (location === null) || (description === null)) {
      console.log('No field should be empty');
      Alert.alert('No field should be empty!');
    } else {
      console.log('you are good to go');
      
      const response = await fetch(props.route.params?.pictureURI);
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
            console.log('snap ',snapshot);
            console.log('Done')
          })
      }

      const taskError = (snapshot) => {
        console.log('Error: ', snapshot)
      }

      task.on("state_changed", taskProgress, taskError, taskCompleted)
      // props.navigation.navigate("ReportIssueSuccess");
      setModalVisible(!modalVisible);

    }
  }

  const savePostData = (downloadURL) => {
    
    const { name, userId } = user;
    const word = removeWhitespace(title);
    const issueId = generateId(word, 'asdftyuiwxyz');

    firebase.firestore().collection("issues").doc()
      .set({
        downloadURL,
        issueId,
        title,
        department,
        location,
        description,
        reportedBy: name,
        reporterUserId: userId,
        isNotStarted: true,
        creation: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log('items: ',{
          issueId,
          downloadURL,
          title,
          department,
          location,
          description,
          reportedBy: name,
          reporterUserId: userId,
          isNotStarted: true,
          creation: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        dispatch(
          addNotStarted({
            issueId,
            downloadURL,
            title,
            department,
            location,
            description,
            reportedBy: name,
            reporterUserId: userId,
            isNotStarted: true,
          })
        );
        
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    
    firebase.firestore().collection("notifications").doc()
      .set({
        issueId,
        title,
        department,
        reportedBy: name,
        reporterUserId: userId,
        creation: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log('items: ',{
          issueId,
          title,
          department,
          reportedBy: name,
          reporterUserId: userId,
          creation: firebase.firestore.FieldValue.serverTimestamp()
        });
                
      })
      .catch((error) => {
        console.error("Error writing notification: ", error);
      });
  }
  
  const navigateToHome = () => {
    setModalVisible(!modalVisible)
    props.navigation.navigate("Home");
  }
  

  return (
    <SafeAreaView style={styles.container}>     
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
        
        
        {/* My Modal box */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onDismiss={navigateToHome}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ alignItems: 'center', marginBottom: 45 }} >
                <Ionicons
                  name={Platform.OS === "ios"
                    ? "ios-checkmark-circle"
                    : "md-checkmark-circle"
                  }
                  size={100}
                  color={purple}
                />
                <Text style={styles.bigFont}>Thanks</Text>
                <Text style={{textAlign: 'center'}}>
                  Your issue has been reported successfully!!
                </Text>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigateToHome()}
              >
                <Text style={styles.textStyle}>Go to home</Text>
              </Pressable>
            </View>
          </View>
        </Modal>


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
                    props.navigation.navigate('CameraScreen')
                  }
                />
              </View>
            </View>

            <View>
            {
              props.route.params?.pictureURI && <Image source={{ uri: props.route.params?.pictureURI }} style={{ width: "100%", height: 120 }} />
            }
            </View>

            <View style={{marginVertical: 8, flex: 1, justifySelf: 'flex-start'}}>
              <TouchableOpacity
                onPress={() => {
                  uploadImage();
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
  bigFont: {
    fontSize: 25,
    color: darkerPurple,
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
    alignItems: "center",
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
    // marginTop: 25,
    // width: 100
  },
  buttonClose: {
    backgroundColor: purple,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 25,
    textAlign: "center",
    fontSize: 16
  }
})



export default ReportIssue;

