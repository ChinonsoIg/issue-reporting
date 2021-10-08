import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { purple } from "../utils/colours";



const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerItem}>
        <Text style={{color: purple}}>Loading...</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
  },
  centerItem: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",    
    fontSize: 20
  }
})
export default Loading;
