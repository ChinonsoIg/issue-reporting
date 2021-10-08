import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { white, purple, darkPurple, purple_40 } from "../utils/colours";
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
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderTopColor: purple_40,
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
  }
})


export default NotificationsList;
