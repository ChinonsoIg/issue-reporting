import React, {useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, Pressable, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import NotificationsList from "./NotificationsList";
import { bgSecondary, darkPurple, white, purple, purple_70, purple_80, purple_95, red, purple_40, darkerPurple } from "../utils/colours";
import logo from "../assets/logo.png";

// For redux
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../redux/slices/userSlice";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    main: 'Main 1'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    main: 'Main 2'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    main: 'Main 3'
  },
];

const Notifications = (props) => {

  const [notificationData, setNotificationData] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector(currentUser);

  const { name, department } = user;

  const renderItem = ({ item }) => (
    <NotificationsList 
      title={item.title}
      main={item.main} />
  );
  
  const fetchNotifications = () => {
    firebase.firestore()
    .collection("notifications")
    .where("department", "==", department)
    .get()
    .then((snapshot) => {
      let myNotifications = snapshot.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();

        return { id, ...data };
      });
      setNotificationData(myNotifications);
      console.log(myNotifications);
    })
  }

  useEffect(() => {
    fetchNotifications();
  }, [])

  if(DATA.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <Text>No notifications!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: bgSecondary,
  },
  boldText: {
    fontWeight: 'bold',
    color: darkPurple,
  }
})

export default Notifications;