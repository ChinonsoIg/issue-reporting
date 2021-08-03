import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { purple, white, goldenRod, purple_95, purple_80, bgSecondary, darkerPurple, purple_70 } from "../utils/colours";


const Task = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
          <Text style={styles.boldText}>Title</Text>
          <MaterialCommunityIcons
            name="check-circle"
            color={purple_70}
            size={24} 
          />
        </View>
        <Text style={{marginVertical: 10}}>Date and time</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10}}>
          <Text>Reported by: </Text>
          <Text style={{marginHorizontal: 10}}>nn</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10}}>
          <Text>To be resoslved by: </Text>
          <Text style={{marginHorizontal: 10}}>nn </Text>
        </View>
        <View>
          <Text>Attachments: </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
          <Pressable style={styles.btnOutline}>
            <Text style={styles.btnTextOutline}>Mark as started</Text>
          </Pressable>
          <Pressable style={styles.btnOutline}>
            <Text style={styles.btnTextOutline}>Mark as done</Text>
          </Pressable>
        </View>
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
    fontSize: 18,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    borderRadius: 5,
    borderColor: purple,
    borderWidth: 5,
    backgroundColor: purple_95,
  },
  btnTextOutline: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: purple,
  },
})

export default Task;
