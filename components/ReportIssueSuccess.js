import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "react-native-vector-icons";
import { purple, white, purple_95, darkerPurple, purple_40 } from "../utils/colours";


const ReportIssueSuccess = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View 
        style={{ flex: 1,
          alignItems: 'center',
          justifyContent: 'space-evenly' 
          }} >

        <View style={{ alignItems: 'center' }} >
          <Ionicons
            name={Platform.OS === "ios"
              ? "ios-checkmark-circle"
              : "md-checkmark-circle"
            }
            size={100}
            color={purple}
          />
          <Text style={styles.bigFont}>Thanks</Text>
          <Text style={[styles.bigFont, {textAlign: 'center'}]}>
            Your issue has been reported successfully!!
          </Text>
        </View>
        <Pressable style={styles.btnOutline}
          onPress={() => navigation.navigate("Home")} >
          <Text style={styles.btnTextOutline}>
            Return to home
          </Text>
        </Pressable>
      
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12
  },
  bigFont: {
    fontSize: 25,
    color: darkerPurple,
  },
  btnOutline: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: '50%',
    borderRadius: 4,
    elevation: 3,
    borderRadius: 5,
    borderColor: purple,
    borderWidth: 5,
    backgroundColor: purple_95,
  },
  btnTextOutline: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: purple,
  },
})

export default ReportIssueSuccess;
