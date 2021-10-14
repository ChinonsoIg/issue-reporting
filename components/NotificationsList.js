import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { white, purple, darkPurple, purple_40, purple_80, purple_95 } from "../utils/colours";
import { convertToUppercase } from "../utils/helpers";


const NotificationsList = ({ isNewReport, issueUID, title, department, reportedBy, createdAt, navigation, isInProgress, isInProgressBy, isCompletedBy }) => {

  return (
    <View style={styles.item}>
      <Pressable style={styles.btn}
        onPress={() => navigation.navigate("Task", {
          issueUID: issueUID
        })}
      >
        <Text style={styles.titleText}>{title}</Text>
        <View>
          <Text>
            <Text style={styles.boldText}>
              {reportedBy 
                ? reportedBy 
                : (isInProgressBy ? isInProgressBy : isCompletedBy)
              }
            </Text> 
            {isNewReport 
              ? ` reported a new issue to be resolved by ${convertToUppercase(department)} department.` 
              : (isInProgress 
                  ? ` set issue as in progress.` 
                  : ` resolved issue.`
                )
            }
          </Text>          
        </View>
        <View>
          <Text style={styles.time}>{createdAt}</Text>
        </View>
      </Pressable>
      <View style={{flex: 1, alignItems: 'center', paddingTop: 8}}>
        <View style={{width: '75%', borderBottomWidth: 1, borderBottomColor: purple_80,}}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  titleText: {
    fontWeight: '700',
    color: darkPurple,
  },
  boldText: {
    fontWeight: '700',
    color: purple,
  },
  time: {
    color: purple,
    fontStyle: 'italic'
  }
})


export default NotificationsList;
