import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { bgSecondary, darkerPurple, purple_70, purple, purple_95 } from "../utils/colours";

// For redux
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { currentUser} from "../redux/slices/userSlice"
import { deleteNotStarted } from "../redux/slices/notStartedSlice";
import { addInProgress, deleteInProgress } from "../redux/slices/inProgressSlice";
import { addCompleted } from "../redux/slices/completedSlice";

const Task = (props) => {
  const { route, navigation } = props;
  let uid = route.params.uid;
  const dispatch = useDispatch();

  const user = useSelector(currentUser);

  const [taskData, setTaskData] = useState([])

  const fetchTaskData = () => {
    firebase.firestore()
    .collection("issues")
    .doc(uid)
    .get()
    .then((snapshot) => {
      if(snapshot.exists) {
        let obj = () => {
          const id = uid
          const data = snapshot.data()
          return { id, ...data }
        }
        setTaskData([...taskData, obj()]);
      } else {
        console.log('data no dey')
      }
    })

  }

  useEffect(() => {
    fetchTaskData();
  }, [uid])

  const markAsInProgress = () => {
    const { name, department } = user;
    let markAsInProgressRef = firebase.firestore().collection("issues").doc(uid);

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
            isNotStarted: false,
            isInProgress: true,
            isInProgressBy: name,
            ...trimData
          })
        );

        dispatch(
          deleteNotStarted({ id: uid })
        );

        navigation.navigate("Home");
      })
      .catch((error) => {
          console.error("Error updating document: ", error);
      });
    } else {
      console.error("Not your dept");
    }
  }

  const markAsCompleted = () => {
    const { name, department } = user;
    let markAsCompletedRef = firebase.firestore().collection("issues").doc(uid);

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
              isInProgress: false,
              isCompleted: true,
              isCompletedBy: name,
              ...trimData
            })
          );
  
          dispatch(
            deleteInProgress({ id: uid })
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
            delete task.isInProgress;
            return { ...task }
          });
          let trimData = removeUnwanted[0];
  
          dispatch(
            addCompleted({ 
              isInProgress: false,
              isCompleted: true,
              isCompletedBy: name,
              ...trimData
            })
          );
  
          dispatch(
            deleteInProgress({ id: uid })
          );
  
          navigation.navigate("Home");
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        })
      )
    } else {
      console.error("Not your dept");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
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
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10}}>
            <Text>Reported by: {task.reportedBy}</Text>
            <Text style={{marginHorizontal: 10}}>time piece</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10}}>
            <View>
              {
                task.isNotStarted && (
                  <Text>To be resoslved by: {task.department} department.</Text>
                )
              }
              {
                task.isInProgress && (
                  <Text>Marked as in progress by: {task.isInProgressBy}</Text>
                )
              }
              {
                task.isCompleted && (
                  <>
                    <Text>Marked as in progress by: {task.isInProgressBy}</Text>
                    <Text>Resolved by: {task.isCompletedBy}</Text>
                  </>
                )
              }
            </View>
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
        </View>
      )})}
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
    color: darkerPurple,
    marginTop: 15,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  boldText: {
    fontWeight: 'bold',
    color: darkerPurple,
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
  }
})



export default Task;









