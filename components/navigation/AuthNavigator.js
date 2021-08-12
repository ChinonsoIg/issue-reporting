import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import { bgSecondary, darkPurple, purple, gray } from "../../utils/colours";

import SignIn from "../authScreens/SignIn";
import SignUp from "../authScreens/SignUp";
import ResetPassword from "../authScreens/ResetPassword";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: bgSecondary,
  },
  headerTintColor: darkPurple,
  // headerBackTitle: "Back",
};

const SignInStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen 
        name="Sign In"
        component={SignIn}
        options={{
          headerTitleAlign: "center",
          // animationTypeForReplace: isSignout ? 'pop' : 'push'
        }}
      />
      <Stack.Screen 
        name="Reset Password"
        component={ResetPassword}
        options={{headerTitleAlign: "center"}}
      />
    </Stack.Navigator>
  );
}

const SignUpStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen 
        name="Sign Up"
        component={SignUp}
        options={{headerTitleAlign: "center"}}
      />
      <Stack.Screen 
        name="Sign In"
        component={SignIn}
        options={{
          headerTitleAlign: "center",
          // animationTypeForReplace: isSignout ? 'pop' : 'push'
        }}
      />
      {/* <Stack.Screen 
        name="Reset Password"
        component={ResetPassword}
        options={{headerTitleAlign: "center"}}
      /> */}
    </Stack.Navigator>
  );
}


const AuthNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Sign In') {
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
      <Tab.Screen name="Sign In" component={SignInStackNavigator} />
      <Tab.Screen name="Sign Up" component={SignUpStackNavigator} />
    </Tab.Navigator>
  );
}


export default AuthNavigator;
