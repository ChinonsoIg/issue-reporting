import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { StackActions } from '@react-navigation/native';

import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { bgSecondary, darkerPurple, purple_70, purple, white, purple_95 } from "../utils/colours";

// For redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchIsNotStarted, fetchIsInProgress, fetchIsCompleted } from "../redux/actions/index";
import { IS_NOT_STARTED, IS_IN_PROGRESS, IS_COMPLETED } from "../redux/constants/index";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { getNotStarted, deleteNotStarted } from "../redux/slices/notStartedSlice";
import { addInProgress, deleteInProgress, getInProgress } from "../redux/slices/inProgressSlice";
import { addCompleted } from "../redux/slices/completedSlice";

const Task = (props) => {
  const { route, navigation } = props;
  let uid = route.params.uid;
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => {
    const vim = state.user
    const vimc = vim[0]
    if (vimc != undefined) {
      return vimc
    }
    return null
  });

  const notStarted = useSelector((state) => {
    const vim = state.notStarted
    if (vim != undefined) {
      return vim
    }
    return null
  });

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
    const { name, department } = currentUser;
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
        })
        let trimData = removeUnwanted[0];
        dispatch(
          addInProgress({ 
            isNotStarted: false,
            isInProgress: true,
            isInProgressBy: name,
            ...trimData
          })
        )
        dispatch(
          deleteNotStarted({ id: uid })
        )
         props.navigation.navigate("Home")
      })
      .catch((error) => {
          console.error("Error updating document: ", error);
      });
    } else {
      console.error("Not your dept");
    }
  }

  const markAsCompleted = () => {
    const { name, department } = currentUser;
    let markAsCompletedRef = firebase.firestore().collection("issues").doc(uid);

    if(taskData[0].department === department) {
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
        })
        let trimData = removeUnwanted[0];
        dispatch(
          addCompleted({ 
            isInProgress: false,
            isCompleted: true,
            isCompletedBy: name,
            ...trimData
          })
        )
        dispatch(
          deleteInProgress({ id: uid })
        )

         props.navigation.navigate("Home")
      })
      .catch((error) => {
          console.error("Error updating document: ", error);
      });
    } else {
      console.error("Not your dept");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {taskData && taskData.map((task) => {
        return (
        <View style={{flex: 1}} key={task.title}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}} >
            <Text style={styles.boldText}>{task.title}</Text>
            <MaterialCommunityIcons
              name="check-circle"
              color={purple_70}
              size={24} 
            />
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
            <Text>To be resoslved by: {task.department} department</Text>
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
    width: 300,
    height: 300,
    resizeMode: 'cover',
    // borderRadius: 75,
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
    // fontWeight: 'bold',
    letterSpacing: 0.25,
    color: purple,
  }
})



export default Task;









