import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { purple, white, goldenRod, purple_95, purple_80, bgSecondary, darkerPurple, purple_70 } from "../utils/colours";


const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.boldText}>Splash screen</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12
  },
  boldText: {
    fontWeight: 'bold',
    color: darkerPurple,
  }
})

export default SplashScreen;
