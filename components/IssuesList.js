import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { Entypo } from "react-native-vector-icons";
import { white, btnPrimary } from "../utils/colours";



const IssuesList = ({ title }) => {

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text>Reported by: @John</Text>
        <Text>18 Jun 2021, 11:05 PM</Text>
      </View>
      <View 
        style={{flex:1, 
          marginTop: 12, 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center'}} >
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>View in Tasks</Text>
        </Pressable>
        <View 
          style={{flex: 1, 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'flex-end'}}>
          <Entypo name="attachment" />
          <Text style={{paddingHorizontal: 5}}>2</Text>
          <Text style={styles.circle}>JNG</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 3,
    borderRadius: 5,
    backgroundColor: btnPrimary,
  },
  btnText: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: white,
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 40,
    fontSize: 13,
    backgroundColor: btnPrimary,
    color: white,
    lineHeight: 31,
    textAlign: 'center',
  }
})


export default IssuesList;
