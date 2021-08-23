import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import { purple, gray } from "../../utils/colours";

import { HomeStackNavigator, IssuesStackNavigator, NotificationsStackNavigator, YouStackNavigator } from "./StackNavigator";



const Tab = createBottomTabNavigator();


const TabNavigator = (props) => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
            ? Platform.OS === 'ios' 
              ? 'ios-home-sharp' 
              : 'md-home-sharp' 
            : Platform.OS === 'ios'
                ? 'ios-home-outline'
                : 'md-home-outline'
            ;
          } else if (route.name === 'Issues') {
            iconName = focused 
              ? Platform.OS === 'ios' 
                  ? 'ios-list-circle' 
                  : 'md-list-circle' 
              : Platform.OS === 'ios'
                  ? 'ios-list'
                  : 'md-list'
              ;
          } else if (route.name === 'Notifications') {
            iconName = focused 
              ? Platform.OS === 'ios' 
                  ? 'ios-notifications-circle' 
                  : 'md-notifications-circle' 
              : Platform.OS === 'ios' 
                  ? 'ios-notifications' 
                  : 'md-notifications'
              ;
          } else if (route.name === 'You') {
            iconName = focused 
              ? Platform.OS === 'ios' 
                  ? 'ios-person-circle' 
                  : 'md-person-circle' 
              : Platform.OS === 'ios' 
                  ? 'ios-person' 
                  : 'md-person'
              ;
          } else if (route.name === 'Sign In') {
            iconName = focused 
              ? Platform.OS === 'ios'
                  ? 'ios-log-in'
                  : 'md-log-in'
              : Platform.OS === 'ios'
                  ? 'ios-log-in-outline'
                  : 'md-log-in-outline'
              ;
          } else if (route.name === 'Sign Up') {
            iconName = focused 
              ? Platform.OS === 'ios'
                  ? 'ios-log-out'
                  : 'md-log-out'
              : Platform.OS === 'ios'
                  ? 'ios-log-out-outline'
                  : 'md-log-out-outline'
              ;
            }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: purple,
        inactiveTintColor: gray,
      }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Issues" component={IssuesStackNavigator} />
      <Tab.Screen name="Notifications" component={NotificationsStackNavigator} />
      <Tab.Screen name="You" component={YouStackNavigator} />
    </Tab.Navigator>
  );
}



export default TabNavigator;