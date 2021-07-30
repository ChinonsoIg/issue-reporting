import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const LandingPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Landing page</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    // backgroundColor: bgSecondary,
  },
})
export default LandingPage;
