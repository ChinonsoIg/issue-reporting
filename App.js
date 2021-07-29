import React, { Component } from "react";
import { StyleSheet, Text, View, AppRegistry, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import { gray, btnPrimary, bgSecondary, purple } from "./utils/colours";

import HomeScreen from "./components/HomeScreen";
import Issues from "./components/Issues";
import ReportIssue from "./components/ReportIssue";
import You from "./components/You";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <SafeAreaProvider style={styles.container}>
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
              } else if (route.name === 'Report Issue') {
                iconName = focused 
                  ? Platform.OS === 'ios' 
                      ? 'ios-add-circle' 
                      : 'md-add-circle' 
                  : Platform.OS === 'ios' 
                      ? 'ios-add-circle-outline' 
                      : 'md-add-circle-outline'
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
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Issues" component={Issues} />
          <Tab.Screen name="Report Issue" component={ReportIssue} />
          <Tab.Screen name="You" component={You} />
        </Tab.Navigator>

      </SafeAreaProvider>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgSecondary,
  },
})

export default App;
