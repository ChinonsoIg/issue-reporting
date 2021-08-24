import React, {useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { bgSecondary, darkPurple, white, purple, purple_70, purple_80, purple_95, red, purple_40, darkerPurple } from "../utils/colours";
import logo from "../assets/logo.png";

// For redux
import { useSelector } from "react-redux";

const Notifications = (props) => {

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>List notifications</Text>
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