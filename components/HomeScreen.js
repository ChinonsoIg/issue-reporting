import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Pressable, Platform, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "./Loading";

import { useFonts, Roboto_400Regular, OpenSans_400Regular } from '@expo-google-fonts/dev';
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import { getTime, convertToUppercase, extractInitials } from "../utils/helpers";
import { purple, white, goldenRod, purple_95, purple_80, bgSecondary, darkPurple, purple_70, bgPrimary } from "../utils/colours";

// For redux
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, isLoggedIn, currentUser, logout} from "../redux/slices/userSlice";
import { getNotStarted } from "../redux/slices/notStartedSlice";
import { getInProgress } from "../redux/slices/inProgressSlice";
import { getCompleted } from "../redux/slices/completedSlice";
import { TouchableOpacity } from "react-native";


const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const HomeScreen = (props) => {

  const [refreshing, setRefreshing] = useState(false);
  const [count, setCount] = useState(0)

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    OpenSans_400Regular
  });

  const dispatch = useDispatch();
  const loggedIn = useSelector(isLoggedIn);
  const user = useSelector(currentUser);
  // console.log(user)


  const notStartedRedux = useSelector((state) => {
    const vim = state.notStarted
    if (vim != undefined) {
      return vim
    }
    return null
  });

  const inProgressRedux = useSelector((state) => {
    const vim = state.inProgress
    if (vim != undefined) {
      return vim
    }
    return null
  });

  const completedRedux = useSelector((state) => {
    const vim = state.completed
    if (vim != undefined) {
      return vim
    }
    return null
  });

  const completeByMyTeam = () => {
    const data =  completedRedux.filter(myTeam => myTeam.department === user.department).length;
    // console.log(data)
    return data
  }

  const manageSession = () => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }


  const fetchUser = () => {
    firebase.firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        
        let userData = {}
        const userUID = snapshot.id;
        const data = snapshot.data();

        userData = {userUID, ...data}
        console.log('user data: ', userData)
        dispatch(login(userData))
      } else {
        console.log('Does not exist!!')
        dispatch(logout());
      }
    })
  }
  
  const arrayComparer = (arrayToCompare) => {
    return (current) => {
      return arrayToCompare.filter((prev) => {
        return prev.id == current.id
      }).length == 0;
    }
  }

  const fetchNotStarted = () => {
    firebase.firestore()
    .collection("issues")
    .where("isNotStarted", "==", true)
    .get()
    .then((snapshot) => {
      let isNotStarted = snapshot.docs.map((doc) => {
        const issueUID = doc.id;
        const data = doc.data();

        return { issueUID, ...data };
      });
      let deleteTimer = isNotStarted.map((doc) => {
        delete doc.creation;
        return doc;
      });
      let onlyInFirestore = deleteTimer.filter(arrayComparer(notStartedRedux));
      dispatch(
        getNotStarted(onlyInFirestore)
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
          const issueUID = doc.id;
          const data = doc.data();

          return { issueUID, ...data }
      })
      let deleteTimer = isInProgress.map((doc) => {
        delete doc.creation;
        return doc;
      });
      let onlyInFirestore = deleteTimer.filter(arrayComparer(inProgressRedux));
      dispatch(
        getInProgress(onlyInFirestore)
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
          const issueUID = doc.id;
          const data = doc.data();

          return { issueUID, ...data }
      });
      let deleteTimer = isCompleted.map((doc) => {
        delete doc.creation;
        return doc;
      });
      let onlyInFirestore = deleteTimer.filter(arrayComparer(completedRedux));
      dispatch(
        getCompleted(onlyInFirestore)
      )
    })
  }

  const onRefresh = () => {

    wait(4000).then(() => {
      fetchUser();
      fetchNotStarted();
      fetchInProgress();
      fetchCompleted()
    })
    
  };

  useEffect(() => {
    fetchUser();
    fetchNotStarted();
    fetchInProgress();
    fetchCompleted();

    // manageSession()

  }, [dispatch])

  if (!user || user == undefined) {
    return (
      <Loading />
    )
  }

  console.log(convertToUppercase("ngolo kante odogwu"))
  console.log(extractInitials("ngolo kante odogwu"))
  const { name } = user;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

          <View style={styles.boxOne}>
            <Text 
              style={
                [styles.boldText, 
                // {fontFamily: fontsLoaded ? "Roboto_400Regular" : null}, 
                {fontSize: 18}]}
            >
              Good {getTime()}, {convertToUppercase(name)}
            </Text>
            <Text>Glad to have you here, we are ready to help you report an issue.</Text>
            <TouchableOpacity style={styles.btn}
              onPress={() => props.navigation.push("Report an Issue")} >
              <Text style={styles.btnText}>Report an issue</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.boxTwo}>
            <Text 
              style={[styles.boldText, {flex: 1}]}>
                Issues timeline
            </Text>
            <View style={styles.reportsByYou}>
              <View style={styles.reportsStats}>
                <View>
                  <MaterialCommunityIcons
                    name="check-circle"
                    color={purple_70}
                    size={24} />
                </View>
                <Text>{completedRedux.length}</Text>
                <Text>Completed</Text>
              </View>
              <View style={styles.reportsStats}>
                <View>
                  <MaterialCommunityIcons
                    name="circle-half-full"
                    color={purple_70}
                    size={24} />
                </View>
                <Text>{inProgressRedux.length}</Text>
                <Text>In progress</Text>
              </View>
              <View style={styles.reportsStats}>
                <View>
                  <MaterialCommunityIcons
                    name="checkbox-blank-circle-outline"
                    color={purple_70}
                    size={24} />
                </View>
                <Text>{notStartedRedux.length}</Text>
                <Text>Not started</Text>
              </View>
            </View>
            {/* <Pressable
              style={styles.btnOutline}
              onPress={() => props.navigation.navigate("Issues")} >
              <Text style={styles.btnTextOutline}>View issues</Text>
            </Pressable> */}
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
              <Text>Your team has completed <Text style={styles.boldText}>{completeByMyTeam()}</Text> issue
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
                There have been <Text style={styles.boldText}>{count}</Text> new issues reported.
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>
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
    backgroundColor: bgPrimary,
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