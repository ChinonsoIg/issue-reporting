import React, { Component, useState, useEffect } from "react";
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
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";
const store = createStore(rootReducer, applyMiddleware(thunk))


import firebase from "firebase/app";


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

      // return () => {
      //   setIsLoading(false);
      //   setLoggedIn(false)
      // };
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
