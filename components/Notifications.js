import React, {useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NotificationsList from "./NotificationsList";
import { bgSecondary, white } from "../utils/colours";
import Loading from "./Loading";

// For redux
import firebase from "firebase";
import { useSelector } from "react-redux";
import { currentUser } from "../redux/slices/userSlice";

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};


const Notifications = (props) => {

  const [refreshing, setRefreshing] = useState(false);
  const [notificationData, setNotificationData] = useState(null);

  const user = useSelector(currentUser);

  const fetchNotifications = () => {
    firebase.firestore()
    .collection("notifications")
    // .where("department", "==", department)
    .get()
    .then((snapshot) => {
      let notifications = snapshot.docs.map((doc) => {
        const notificationUID = doc.id;
        const data = doc.data();

        return { notificationUID, ...data };
      });
      setNotificationData(notifications);
    })
  }

  const renderItem = ({ item }) => (
    <NotificationsList 
      issueUID={item.issueUID}
      title={item.notificationTitle}
      reportedBy={item.notificationReportedBy}
      department={item.notificationDepartment}
      description={item.notificationDescription}
      isInProgress={item.notificationIsInProgress}
      isInProgressBy={item.notificationIsInProgressBy}
      isCompleted={item.notificationIsCompleted}
      isCompletedBy={item.notificationIsCompletedBy}
      isNewReport={item.isNewReport}
      createdAt={item.notificationCreatedAt}
      navigation={props.navigation}
    />
  );

  const onRefresh = () => {

    wait(6000).then(() => {
      setNotificationData(null)
      fetchNotifications()
    })
    
  };

  useEffect(() => {
    fetchNotifications();
  }, [])

  if(notificationData == null) {
    return (
      <Loading />
    );
  }

  if(notificationData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No notifications!</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={notificationData}
          renderItem={renderItem}
          keyExtractor={item => item.issueUID}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
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
})

export default Notifications;