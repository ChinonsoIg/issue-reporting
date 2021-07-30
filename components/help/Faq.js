import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { purple, white, goldenRod, purple_95, purple_80, bgSecondary, darkerPurple, purple_70 } from "../../utils/colours";



const Faq = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Faq</Text>
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
  boldText: {
    fontWeight: 'bold',
    color: darkerPurple,
  }
})

export default Faq;
