import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import moment from "moment";

import { bgSecondary, darkPurple, purple_70, purple, purple_95, white } from "../utils/colours";
import { convertToUppercase } from "../utils/helpers";

// For redux
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { currentUser} from "../redux/slices/userSlice"
import { deleteNotStarted } from "../redux/slices/notStartedSlice";
import { addInProgress, deleteInProgress } from "../redux/slices/inProgressSlice";
import { addCompleted, deleteCompleted } from "../redux/slices/completedSlice";
import { Alert } from "react-native";

const Task = (props) => {
  const { route, navigation } = props;
  let issueUID = route.params.issueUID;
  const dispatch = useDispatch();

  const user = useSelector(currentUser);

  const [taskData, setTaskData] = useState([])

  const fetchTaskData = () => {
    firebase.firestore()
    .collection("issues")
    .doc(issueUID)
    .get()
    .then((snapshot) => {
      if(snapshot.exists) {
        let obj = () => {
          const id = issueUID;
          const data = snapshot.data();
          return { id, ...data }
        }
        console.log(obj)
        setTaskData([...taskData, obj()]);
      } else {
        console.log('data no dey')
      }
    })

  }

  useEffect(() => {
    fetchTaskData();
  }, [issueUID])

  const markAsInProgress = () => {
    const { name, department, userUID } = user;
    let momentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    let notificationTitle = taskData[0].title;
    let notificationDescription = taskData[0].description;
    let notificationDepartment = taskData[0].department;
    let notificationIsInProgress = true;
    let notificationIsInProgressBy = name;

    let markAsInProgressRef = firebase.firestore().collection("issues").doc(issueUID);

    if(taskData[0].department === department) {
      markAsInProgressRef.update({
        "isNotStarted": false,
        isInProgress: true,
        isInProgressBy: name
      })
      .then(() => {
        console.log("Document successfully updated!");
        
        let removeUnwanted = taskData && taskData.map((task) => {
          delete task.creation;
          delete task.isNotStarted;
          return { ...task }
        });

        let trimData = removeUnwanted[0];

        dispatch(
          addInProgress({ 
            isInProgress: true,
            isInProgressBy: name,
            ...trimData
          })
        );

        dispatch(
          deleteNotStarted({ id: issueUID })
        );

        navigation.navigate("Home");
      })
      .catch((error) => {
          console.error("Error updating document: ", error);
      });
    } else {
      Alert.alert("This issue is not assigned to your department");
    }


    // Save notification for in progress tasks
    firebase.firestore().collection("notifications").doc()
      .set({
        issueUID,
        notificationTitle,
        notificationDescription,
        notificationDepartment,
        notificationIsInProgress,
        notificationIsInProgressBy,
        notificationIsInProgressByUserUID: userUID,
        createdAt: momentTime
      })
      .then(() => {
        console.log('items: ',{
          issueUID,
          notificationTitle,
          notificationDescription,
          notificationDepartment,
          notificationIsInProgress,
          notificationIsInProgressBy,
          notificationIsInProgressByUserUID: userUID,
          createdAt: momentTime
        });
                
      })
      .catch((error) => {
        console.error("Error writing notification: ", error);
      });
  }

  
  const markAsCompleted = () => {
    const { name, department, userUID } = user;
    let momentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    let notificationTitle = taskData[0].title;
    let notificationDescription = taskData[0].description;
    let notificationDepartment = taskData[0].department;
    let notificationIsCompleted = true;

    let markAsCompletedRef = firebase.firestore().collection("issues").doc(issueUID);

    if(taskData[0].department === department) {
      
      // If isInProgress is true, update isInProgress and add isCompleted, else
      // If false, add isInProgress and isCompleted as done by same user
      taskData[0].isInProgress ? (
        markAsCompletedRef.update({
          "isInProgress": false,
          isCompleted: true,
          isCompletedBy: name
        })
        .then(() => {
          console.log("Document successfully updated!");
  
          let removeUnwanted = taskData && taskData.map((task) => {
            delete task.creation;
            delete task.isInProgress;
            return { ...task }
          });
          let trimData = removeUnwanted[0];
  
          dispatch(
            addCompleted({ 
              isCompleted: true,
              isCompletedBy: name,
              ...trimData
            })
          );
  
          dispatch(
            deleteInProgress({ id: issueUID })
          );
  
          navigation.navigate("Home");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        })
      ) : (
        markAsCompletedRef.update({
          isInProgress: false,
          isInProgressBy: name,
          isCompleted: true,
          isCompletedBy: name
        })
        .then(() => {
          console.log("Document successfully updated!");
  
          let removeUnwanted = taskData && taskData.map((task) => {
            delete task.creation;
            delete task.isNotStarted;
            return { ...task }
          });
          let trimData = removeUnwanted[0];
  
          dispatch(
            addCompleted({ 
              isCompleted: true,
              isCompletedBy: name,
              ...trimData
            })
          );
  
          dispatch(
            deleteNotStarted({ id: issueUID })
          );
  
          navigation.navigate("Home");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        })
      )
    } else {
      console.error("You can't resolve an issue not assigned to your department");
    }

    // Save notification for completed tasks
    firebase.firestore().collection("notifications").doc()
      .set({
        issueUID,
        notificationTitle,
        notificationDescription,
        notificationDepartment,
        notificationIsCompleted,
        notificationIsCompletedBy: name,
        notificationIsCompletedByUserUID: userUID,
        isNewReport: false,
        createdAt: momentTime,
      })
      .then(() => {
        console.log('items: ',{
          issueUID,
          notificationTitle,
          notificationDescription,
          notificationDepartment,
          notificationIsCompleted,
          notificationIsCompletedBy: name,
          notificationIsCompletedByUserUID: userUID,
          isNewReport: false,
          createdAt: momentTime
        });
                
      })
      .catch((error) => {
        console.error("Error writing notification: ", error);
      });
  }

  const onDeleteIssue = () => {
    const { department } = user;

    if(taskData[0].department === department) {
      let deleteRef = firebase.firestore().collection("issues").doc(issueUID);

      deleteRef.delete().then(() => {
        console.log("Document successfully deleted!");
        dispatch(
          deleteCompleted({ id: issueUID })
        );
        setTimeout(() => {
          navigation.navigate("Home");
        }, 3000);

      }).catch((error) => {
        console.error("Error removing document: ", error);
      });

    } else {
      alert("You can't delete an issue not assigned to your unit");
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {taskData && taskData.map((task) => {
          return (
          <View style={{flex: 1}} key={task.id}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}} >
              <Text style={styles.boldText}>{task.title}</Text>
              <View>
                {
                  task.isNotStarted ? (
                    <MaterialCommunityIcons
                      name="checkbox-blank-circle-outline"
                      color={purple_70}
                      size={24} 
                    />
                  ) : (
                    task.isInProgress ? (
                      <MaterialCommunityIcons
                        name="circle-half-full"
                        color={purple_70}
                        size={24}
                      />
                    ) : (
                      <MaterialCommunityIcons
                      name="check-circle"
                      color={purple_70}
                      size={24} 
                    />
                    )
                  )
                }
              </View>
            </View>
            <View>
              <Image style={styles.image}
                source={{ uri: task.downloadURL }}
              />
            </View>
            <Text style={{marginVertical: 10}}>Issue description: {task.description}</Text>
            <View style={{flexDirection: 'column', justifyContent: 'flex-start', marginVertical: 10}}>
              <Text>Reported by: {task.reportedBy}</Text>
              <Text style={{fontStyle: 'italic'}}>Date: {task.createdAt}</Text>
            </View>
              {
                (task.isNotStarted || task.isInProgress) && (
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10}}>
                  <Text>To be resolved by: {convertToUppercase(task.department)} department.</Text>
                  </View>
                )
              }
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10}}>
              <View>
                {
                  task.isInProgress && (
                    <Text>Marked as in progress by: {task.isInProgressBy}</Text>
                  )
                }
                {
                  task.isCompleted && (
                    <>
                      <Text style={{marginVertical: 10}}>Marked as in progress by: {task.isInProgressBy}</Text>
                      <Text>{`Resolved by: ${task.isCompletedBy}, ${convertToUppercase(task.department)} unit.`}</Text>
                    </>
                  )
                }
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10}}>
              <Text>Location: {convertToUppercase(task.location)}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
              {
                task.isNotStarted && (
                  <Pressable 
                    style={styles.btnOutline}
                    onPress={() => markAsInProgress()}
                  >
                    <Text style={styles.btnTextOutline}>Mark as in progress</Text>
                  </Pressable> 
                )
              }
              {
                (task.isNotStarted || task.isInProgress) && (
                  <Pressable 
                    style={styles.btnOutline}
                    onPress={() => markAsCompleted()}
                  >
                    <Text style={styles.btnTextOutline}>Mark as completed</Text>
                  </Pressable>
                )
              }
            </View>
            <View>
              {
                task.isCompleted && (
                  <Pressable 
                    style={styles.btn}
                    onPress={() => onDeleteIssue()}
                  >
                    <Text style={styles.btnText}>Delete Issue</Text>
                  </Pressable> 
                )
              }
            </View>
          </View>
        )})}
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: bgSecondary,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: darkPurple,
    marginTop: 15,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
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
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    borderColor: purple,
    borderWidth: 3,
    backgroundColor: purple_95,
  },
  btnTextOutline: {
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: purple,
  },
  btnDanger: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderRadius: 5,
    backgroundColor: purple,
  },
  btnDangerText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: white,
  },
})



export default Task;









