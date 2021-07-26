import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "react-native-vector-icons";
import { bgPrimary, btnPrimary, white, black, goldenRod, gray } from "../utils/colours";

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
            <Text>img</Text>
            <Text>4</Text>
            <Text>Completed</Text>
          </View>
          <View style={styles.reportsStats}>
            <Text>img</Text>
            <Text>2</Text>
            <Text>In progress</Text>
          </View>
          <View style={styles.reportsStats}>
            <Text>img</Text>
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
            <Text>Your team has completed 1 issue</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Ionicons 
              name={Platform.OS === "ios" 
                ? "ios-time-outline" 
                : "md-time-outline"} 
              size={22} 
              color={gray}
              style={{paddingRight: 10}} />
            <Text>The average completion time was 0 days</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Ionicons 
              name={Platform.OS === "ios" 
                ? "ios-file-tray" 
                : "md-file-tray"} 
              size={22} 
              color={black}
              style={{paddingRight: 10}} />
            <Text>There have been 11 new issues reported</Text>
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
    backgroundColor: bgPrimary,
  },
  boxOne: {
    flex: 2,
    justifyContent: 'space-between',
    backgroundColor: bgPrimary,
  },
  boxTwo: {
    flex: 3,
    justifyContent: 'space-between',
    paddingTop: 20,
    backgroundColor: bgPrimary,
  },
  boxThree: {
    flex: 3,
    paddingTop: 10,
    backgroundColor: bgPrimary,
  },
  boldText: {
    fontWeight: 'bold',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderRadius: 5,
    backgroundColor: btnPrimary,
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
    borderColor: btnPrimary,
    borderWidth: 5,
    backgroundColor: white,
  },
  btnTextOutline: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: btnPrimary,
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
