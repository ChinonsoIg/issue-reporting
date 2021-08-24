import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import { purple, white, goldenRod, purple_95, purple_80, bgSecondary, darkerPurple, purple_70 } from "../utils/colours";

// For redux
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";
import { getNotStarted } from "../redux/slices/notStartedSlice";
import { getInProgress } from "../redux/slices/inProgressSlice";
import { getCompleted } from "../redux/slices/completedSlice";

const HomeScreen = (props) => {
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

  const inProgress = useSelector((state) => {
    const vim = state.inProgress
    if (vim != undefined) {
      return vim
    }
    return null
  });

  const completed = useSelector((state) => {
    const vim = state.completed
    if (vim != undefined) {
      return vim
    }
    return null
  });
  
  const fetchUser = () => {
    firebase.firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data();
        dispatch(getUser(data))
      } else {
        console.log('Does not exist!!')
      }
    })
  }

  const fetchNotStarted = () => {
    firebase.firestore()
    .collection("issues")
    .where("isNotStarted", "==", true)
    .get()
    .then((snapshot) => {
      let isNotStarted = snapshot.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();

        return { id, ...data };
      });
      let deleteTimer = isNotStarted.map((doc) => {
        delete doc.creation;
        return doc;
      });

      dispatch(
        getNotStarted(deleteTimer)
      );
    })
  }

  const fetchInProgress = () => {
    firebase.firestore()
    .collection("issues")
    .where("isInProgress", "==", true)
    .get()
    .then((snapshot) => {
      let isInProgress = snapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();

          return { id, ...data }
      })
      let deleteTimer = isInProgress.map((doc) => {
        delete doc.creation;
        return doc;
      });

      dispatch(
        getInProgress(deleteTimer)
      )
    })
  }

  const fetchCompleted = () => {
    firebase.firestore()
    .collection("issues")
    .where("isCompleted", "==", true)
    .get()
    .then((snapshot) => {
      let isCompleted = snapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();

          return { id, ...data }
      });
      let deleteTimer = isCompleted.map((doc) => {
        delete doc.creation;
        return doc;
      });

      dispatch(
        getCompleted(deleteTimer)
      );
    })
  }

  useEffect(() => {
    fetchUser();
    fetchNotStarted();
    fetchInProgress();
    fetchCompleted();

  }, [dispatch])


  if (!currentUser || (currentUser == undefined)) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: purple, fontSize: 20 }}>Loading...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxOne}>
        <Text style={[styles.boldText, {fontSize: 18}]}>Good evening {currentUser.name}</Text>
        <Text>Glad to have you here, we are ready to help you report an issue.</Text>
        <Pressable style={styles.btn}
          onPress={() => props.navigation.push("Report an Issue")} >
          <Text style={styles.btnText}>Report an issue</Text>
        </Pressable>
      </View>
      <View style={styles.boxTwo}>
        <Text 
          style={[styles.boldText, {flex: 1}]}>
            Issues reported by you
        </Text>
        <View style={styles.reportsByYou}>
          <View style={styles.reportsStats}>
            <View>
              <MaterialCommunityIcons
                name="check-circle"
                color={purple_70}
                size={24} />
            </View>
            <Text>{completed.length}</Text>
            <Text>Completed</Text>
          </View>
          <View style={styles.reportsStats}>
            <View>
              <MaterialCommunityIcons
                name="circle-half-full"
                color={purple_70}
                size={24} />
            </View>
            <Text>{inProgress.length}</Text>
            <Text>In progress</Text>
          </View>
          <View style={styles.reportsStats}>
            <View>
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                color={purple_70}
                size={24} />
            </View>
            <Text>{notStarted.length}</Text>
            <Text>Not started</Text>
          </View>
        </View>
        <Pressable
          style={styles.btnOutline}
          onPress={() => props.navigation.navigate("Issues")} >
          <Text style={styles.btnTextOutline}>View issues</Text>
        </Pressable>
      </View>
      <View style={styles.boxThree}>
        <Text 
          style={[styles.boldText, {flex: 1}, {justifyContent: 'flex-end'}, {paddingTop: 10}]}>
            Last 7 days
        </Text>
        <View style={styles.lastSevenDays}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <MaterialCommunityIcons name="medal" size={22} color={goldenRod}
            style={{paddingRight: 10}} />
            <Text>Your team has completed <Text style={styles.boldText}>4</Text> issue
              </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Ionicons 
              name={Platform.OS === "ios" 
                ? "ios-time-outline" 
                : "md-time-outline"} 
              size={22} 
              color={purple_80}
              style={{paddingRight: 10}} />
            <Text>The average completion time was <Text style={styles.boldText}>0</Text> days</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Ionicons 
              name={Platform.OS === "ios" 
                ? "ios-file-tray" 
                : "md-file-tray"} 
              size={22} 
              color={purple_80}
              style={{paddingRight: 10}} />
            <Text>
              There have been <Text style={styles.boldText}>11</Text> new issues reported.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}








const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
  },
  boxOne: {
    flex: 2,
    justifyContent: 'space-between',
    marginTop: 15,
    backgroundColor: bgSecondary,
  },
  boxTwo: {
    flex: 3,
    justifyContent: 'space-between',
    paddingTop: 20,
    backgroundColor: bgSecondary,
  },
  boxThree: {
    flex: 3,
    paddingTop: 10,
    backgroundColor: bgSecondary,
  },
  boldText: {
    fontWeight: 'bold',
    color: darkerPurple,
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
  reportsByYou: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    margin: 5,
    borderRadius: 5,
    backgroundColor: white,
  },
  reportsStats: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: white,
  },
  lastSevenDays: {
    flex: 4,
    justifyContent: 'space-between',
    paddingTop: 5,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: white,
  }
})



export default HomeScreen;







