import React, { Component, useState, useEffect } from "react";

import firebase from "firebase/app";

const firebaseConfig = {
  
};

// This checks that no other instance of firebase is running
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { bgSecondary } from "./utils/colours";
import TabNavigator from "./components/navigation/TabNavigator";
import AuthNavigator from "./components/navigation/AuthNavigator";
import SplashScreen from "./components/SplashScreen";

const App = () => {


  let five
  let two = 'gb';
  let three = 'nm';
  five = two + three;

  console.log(five)
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

  }, [])


  if (isLoading) {
    return (
      <SafeAreaProvider style={styles.container}>
        <SplashScreen />
      </SafeAreaProvider>      
    )
  }

  return (
    <NavigationContainer>
      <SafeAreaProvider style={styles.container}>
        {
          loggedIn
            ? (
              <TabNavigator/>
            )
            : (
              <AuthNavigator />
            )            
        }
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgSecondary,
  },
})

export default App;
