import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
// import moment from "moment";
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
              ? (
                <Text> reported a new issue to be resolved by <Text style={styles.boldText}>{convertToUppercase(department)}</Text> department.</Text>
              ) 
              : (isInProgress 
                  ? ` set issue as in progress.` 
                  : ` resolved an issue.`
                )
            }
          </Text>          
        </View>
        <View>
          <Text style={styles.time}>{createdAt}</Text>
        </View>
      </Pressable>
      <View style={{flex: 1, alignItems: 'center', paddingTop: 8}}>
        <View style={{width: '80%', borderBottomWidth: 3, borderBottomColor: white}}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
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
