import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Entypo } from "react-native-vector-icons";
import { white, purple, darkPurple, purple_70 } from "../utils/colours";


const IssuesList = ({ title, reportedBy, reportedFor, timestamp, attachments, navigation, id}) => {

  const departmentAbbr = (name) => {
    switch (name) {
      case "electrical":
        return "ELC"

      case "automobile":
        return "AUT"

      case "information technology":
        return "IT"
      
      case "plumbing and sewage mgt":
        return "PSM"

      case "medical":
        return "MED"

      default:
        return name;
    }
  }

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <View 
          style={{flex: 1, 
            flexDirection: "row", 
            alignItems: "center"}}  >
          <Text>Reported by: </Text>
          <Text style={{color: purple_70}}>{reportedBy}</Text>
        </View>
        <Text>timestamp</Text>
      </View>
      <View 
        style={{flex:1, 
          marginTop: 12, 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center'}} >
        <Pressable style={styles.btn}
          onPress={() => navigation.navigate("Task", {
            uid: id
          })} 
        >
          <Text style={styles.btnText}>View in Tasks</Text>
        </Pressable>
        <View 
          style={{flex: 1, 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'flex-end'}}>
          {attachments > 0 && <Entypo name="attachment" />}
          {attachments > 0 && (
            <Text style={{paddingHorizontal: 5}}>
              {attachments}
            </Text>
          )}
          <View style={styles.circle}>
            <Text style={{color: white}}>{departmentAbbr(reportedFor)}</Text>
          </View>
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
    fontWeight: 'bold',
    color: darkPurple,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 3,
    borderRadius: 5,
    backgroundColor: purple,
  },
  btnText: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: white,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 40,
    fontSize: 13,
    backgroundColor: purple,
  }
})


export default IssuesList;
