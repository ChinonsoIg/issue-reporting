import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';

import { bgSecondary } from "./utils/colours";
import TabNavigator from "./components/navigation/TabNavigator";
import AuthNavigator from "./components/navigation/AuthNavigator";
import SplashScreen from "./components/SplashScreen";

// For redux and storage
import firebase from "firebase/app";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,  
  REACT_APP_APP_ID
 } from "@env";

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID
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
      if(!user || (user == undefined)) {
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
    <Provider store={store}>
      {
        loggedIn
          ? (            
            <NavigationContainer>
              <SafeAreaProvider style={styles.container}>
                <TabNavigator />
              </SafeAreaProvider>
            </NavigationContainer>            
          ) : (
            <NavigationContainer>
              <SafeAreaProvider style={styles.container}>
                <AuthNavigator />
              </SafeAreaProvider>
            </NavigationContainer>
          )            
      }
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgSecondary,
  },
})

export default App;
