import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { purple, darkPurple } from "../utils/colours";


const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.boldText}>issue</Text>
        <Text style={{ color: darkPurple }}>Report issues</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12
  },
  boldText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    // fontFamily: 'lucida grande',
    fontSize: 35,
    color: purple,
  }
})

export default SplashScreen;
