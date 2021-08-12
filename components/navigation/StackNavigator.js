import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ReportIssue from "../ReportIssue";
import Issues from "../Issues";
import Task from "../Task";
import ReportIssueSuccess from "../ReportIssueSuccess";
import TermsAndConditions from "../help/TermsAndConditions";
import ContactUs from "../help/ContactUs";
import Faq from "../help/Faq";

import HomeScreen from "../HomeScreen";
import You from "../You";
import Notifications from "../Notifications";
import CameraScreen from "../CameraScreen";
import { bgSecondary, darkPurple } from "../../utils/colours";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: bgSecondary,
  },
  headerTintColor: darkPurple,
  headerBackTitle: "Back",
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="Issues" component={Issues} options={{headerTitleAlign: "center"}} />
      <Stack.Screen name="Report an Issue" component={ReportIssue} options={{headerTitleAlign: "center"}} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} options={{headerTitleAlign: "center"}} />
      <Stack.Screen name="ReportIssueSuccess" component={ReportIssueSuccess} options={{headerShown: false}} />
      <Stack.Screen name="Task" component={Task} options={{headerTitleAlign: "center"}} />
    </Stack.Navigator>
  );
}

const IssuesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Issues" component={Issues} options={{headerShown: false}} />
      <Stack.Screen name="Task" component={Task} options={{headerTitleAlign: "center"}} />
    </Stack.Navigator>
  );
}

const NotificationsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Notifications" component={Notifications} options={{headerTitleAlign: "center"}} />      
    </Stack.Navigator>
  );
}

const YouStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}
    >
      <Stack.Screen name="You" component={You} options={{headerShown: false}} options={{headerTitleAlign: "center"}} />
      <Stack.Screen name="Contact Us" component={ContactUs} options={{headerTitleAlign: "center"}} />
      <Stack.Screen name="Faq" component={Faq} options={{headerTitleAlign: "center"}} />
      <Stack.Screen name="Terms and Conditions" component={TermsAndConditions} options={{headerTitleAlign: "center"}} />
    </Stack.Navigator>
  );
}

export { HomeStackNavigator, IssuesStackNavigator, NotificationsStackNavigator, YouStackNavigator };