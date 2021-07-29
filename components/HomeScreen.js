import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import { purple, white, goldenRod, purple_95, purple_80, bgSecondary, darkerPurple, purple_70 } from "../utils/colours";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.boxOne}>
        <Text style={[styles.boldText, {fontSize: 18}]}>Good evening</Text>
        <Text>Glad to have you here, we are ready to help you report an issue.</Text>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Report an issue</Text>
        </Pressable>
      </View>
      <View style={styles.boxTwo}>
        <Text 
          style={[styles.boldText, {flex: 1}]}>
            Issues reported by you
        </Text>
        <View style={styles.reportsByYou}>
          <View style={styles.reportsStats}>
            <View>
              <MaterialCommunityIcons
                name="check-circle"
                color={purple_70}
                size={24} />
            </View>
            <Text>4</Text>
            <Text>Completed</Text>
          </View>
          <View style={styles.reportsStats}>
            <View>
              <MaterialCommunityIcons
                name="circle-half-full"
                color={purple_70}
                size={24} />
            </View>
            <Text>2</Text>
            <Text>In progress</Text>
          </View>
          <View style={styles.reportsStats}>
            <View>
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                color={purple_70}
                size={24} />
            </View>
            <Text>4</Text>
            <Text>Not started</Text>
          </View>
        </View>
        <Pressable style={styles.btnOutline}>
          <Text style={styles.btnTextOutline}>View issues</Text>
        </Pressable>
      </View>
      <View style={styles.boxThree}>
        <Text 
          style={[styles.boldText, {flex: 1}, {justifyContent: 'flex-end'}, {paddingTop: 10}]}>
            Last 7 days
        </Text>
        <View style={styles.lastSevenDays}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <MaterialCommunityIcons name="medal" size={22} color={goldenRod}
            style={{paddingRight: 10}} />
            <Text>Your team has completed <Text style={styles.boldText}>4</Text> issue
              </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Ionicons 
              name={Platform.OS === "ios" 
                ? "ios-time-outline" 
                : "md-time-outline"} 
              size={22} 
              color={purple_80}
              style={{paddingRight: 10}} />
            <Text>The average completion time was <Text style={styles.boldText}>0</Text> days</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Ionicons 
              name={Platform.OS === "ios" 
                ? "ios-file-tray" 
                : "md-file-tray"} 
              size={22} 
              color={purple_80}
              style={{paddingRight: 10}} />
            <Text>There have been <Text style={styles.boldText}>11</Text> new issues reported</Text>
          </View>
        </View>
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
  boxOne: {
    flex: 2,
    justifyContent: 'space-between',
    backgroundColor: bgSecondary,
  },
  boxTwo: {
    flex: 3,
    justifyContent: 'space-between',
    paddingTop: 20,
    backgroundColor: bgSecondary,
  },
  boxThree: {
    flex: 3,
    paddingTop: 10,
    backgroundColor: bgSecondary,
  },
  boldText: {
    fontWeight: 'bold',
    color: darkerPurple,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderRadius: 5,
    backgroundColor: purple,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: white,
  },
  btnOutline: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
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
  reportsByYou: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    margin: 5,
    borderRadius: 5,
    backgroundColor: white,
  },
  reportsStats: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: white,
  },
  lastSevenDays: {
    flex: 4,
    justifyContent: 'space-between',
    paddingTop: 5,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: white,
  }
})

export default HomeScreen;
