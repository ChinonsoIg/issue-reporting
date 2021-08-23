import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';

import { bgSecondary } from "./utils/colours";
import TabNavigator from "./components/navigation/TabNavigator";
import AuthNavigator from "./components/navigation/AuthNavigator";
import SplashScreen from "./components/SplashScreen";

// For redux
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import reducer from "./redux/reducer";
// const store = createStore(reducer, applyMiddleware(thunk))


import firebase from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCzj_doR5odD6sdXnvJL2ncpwiIL-HkVhU",
  authDomain: "react-native-f2f5f.firebaseapp.com",
  databaseURL: "https://react-native-f2f5f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-native-f2f5f",
  storageBucket: "react-native-f2f5f.appspot.com",
  messagingSenderId: "609734983271",
  appId: "1:609734983271:web:cbe5230643d3d0f91cdec2"
};

// This checks that no other instance of firebase is running
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}


const App = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

    firebase.auth().onAuthStateChanged((user) => {
      if(!user) {
        setIsLoading(false)
        setLoggedIn(false)        
      } else {
        setIsLoading(false)
        setLoggedIn(true)
      }

    })

  }, [loggedIn])


  if (isLoading) {
    return (
      <SafeAreaProvider style={styles.container}>
        <SplashScreen />
      </SafeAreaProvider>      
    )
  }

  return (
    <>
        {
          loggedIn
            ? (
              <Provider store={store}>
                <NavigationContainer>
                  <SafeAreaProvider style={styles.container}>
                    <TabNavigator />
                  </SafeAreaProvider>
                </NavigationContainer>
              </Provider>
            )
            : (
              <NavigationContainer>
                <SafeAreaProvider style={styles.container}>
                  <AuthNavigator />
                </SafeAreaProvider>
              </NavigationContainer>
            )            
        }
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgSecondary,
  },
})

export default App;
