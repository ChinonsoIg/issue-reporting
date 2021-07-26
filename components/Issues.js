import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TextInput, SectionList } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import IssuesList from "./IssuesList";
import { bgPrimary } from "../utils/colours";

const DATA = [
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"]
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"]
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"]
  }
];

const Issues = () => {
  const [text, onChangeText] = useState("");
  
  const updateSearch = (e) => {
    console.log('e ', e);
    onChangeText(e)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SearchBar 
          placeholder="Search issues"
          onChangeText={updateSearch}
          value={text} />
        </View>
        <SectionList
          sections={DATA} 
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <IssuesList title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      <View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: bgPrimary,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: "#fff"
  },
})


export default Issues;
