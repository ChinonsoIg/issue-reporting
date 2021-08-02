import React, { Component, useState } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { bgSecondary } from "./utils/colours";
import TabNavigator from "./components/navigation/TabNavigator";
import AuthNavigator from "./components/navigation/AuthNavigator";
import SplashScreen from "./components/SplashScreen";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

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
          userToken === null
            ? (
              <AuthNavigator />
            )
            : (
              <TabNavigator/>
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
