import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { bgSecondary } from "./utils/colours";
import TabNavigator from "./components/navigation/TabNavigator";


const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider style={styles.container}>
        <TabNavigator/>
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
