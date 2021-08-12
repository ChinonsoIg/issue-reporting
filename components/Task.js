import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, SectionList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { purple, white, purple_95, darkerPurple } from "../utils/colours";


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



export default Task;

// var washingtonRef = db.collection("cities").doc("DC");

// // Set the "capital" field of the city 'DC'
// return washingtonRef.update({
//     capital: true
// })
// .then(() => {
//     console.log("Document successfully updated!");
// })
// .catch((error) => {
//     // The document probably doesn't exist.
//     console.error("Error updating document: ", error);
// });
