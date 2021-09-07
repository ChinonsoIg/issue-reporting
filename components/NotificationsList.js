import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Entypo } from "react-native-vector-icons";
import * as Notifications from 'expo-notifications';
import { white, purple, darkPurple, darkerPurple, purple_70 } from "../utils/colours";


// const Item = ({ title }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );

// const App = () => {
//   const renderItem = ({ item }) => (
//     <Item title={item.title} />
//   );

  // return (
  //   <SafeAreaView style={styles.container}>
  //     <FlatList
  //       data={DATA}
  //       renderItem={renderItem}
  //       keyExtractor={item => item.id}
  //     />
  //   </SafeAreaView>
  // );

const NotificationsList = ({ issueId, title,main,id, department, reportedBy, navigation }) => {

  return (
    <View style={styles.item}>
      <Pressable style={styles.btn}
          onPress={() => navigation.navigate("Task", {
            uid: id
          })} 
        >
        <View>
          <Text><Text style={styles.boldText}>{title}</Text> reported a new issue to be resolved by your <Text style={styles.boldText}>{main}</Text>.</Text>
        </View>
        <View>
          <Text>Time report was filed</Text>
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
    // marginVertical: 8,
    // borderRadius: 5,
    borderBottomWidth: 1,
    borderTopColor: darkPurple,
  },
  boldText: {
    fontWeight: 'bold',
    color: darkerPurple,
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


export default NotificationsList;
