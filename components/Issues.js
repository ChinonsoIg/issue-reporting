import React, { useState } from "react";
import { Text, View, StyleSheet, SectionList } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import IssuesList from "./IssuesList";
import { bgSecondary, darkerPurple, purple_40 } from "../utils/colours";

// For redux
import { useSelector } from "react-redux";


const ItemHeader = ({ title }) => (
  <View>
    <Text style={styles.header}>{title}</Text>
  </View>
);

const Issues = (props) => {
  const [query, setQuery] = useState("");

  const notStarted = useSelector((state) => {
    const vim = state.notStarted
    if (vim != undefined) {
      return vim
    }
    return null
  });

  const inProgress = useSelector((state) => {
    const vim = state.inProgress
    if (vim != undefined) {
      return vim
    }
    return null
  });

  const completed = useSelector((state) => {
    const vim = state.completed
    if (vim != undefined) {
      return vim
    }
    return null
  });


  const updateQuery = (query) => {
    const trimmedQuery = query.trim();
    setQuery(trimmedQuery)
  }
  
  // Delete clearQuery. The Searchbar installed already has the feature
  const clearQuery = () => {
    updateQuery("");
  }

  const data = [
    {title: 'Not Started', data: notStarted},
    {title: 'In Progress', data: inProgress},
    {title: 'Completed', data: completed}
  ];

  const result = data.reduce((acc, currentObj) => {
    let output = {}
    const transformedQuery = query.toLowerCase();
    const currentTitle = currentObj.title
    const currentData = currentObj.data

    const filteredData =currentData.filter(item => {
      const transformedItem = item.title.toLowerCase();
      return transformedItem.includes(transformedQuery)
    })

    if (filteredData.length) {
      output.title = currentTitle
      output.data = filteredData
    }

    if (Object.entries(output).length) {
      return [...acc, output]
    } else {
      return acc
    }
  }, [])


  const renderSectionHeader = ({ section }) => (
    <ItemHeader 
      title={section.title}
    />
  );

  const renderItem = ({ item, index }) => {
    // console.log('render: ',item)
    return (
    <IssuesList 
      issueUID={item.issueUID}
      navigation={props.navigation}
      // key={index}
      title={item.title}
      description={item.description}
      reportedBy={item.reportedBy} 
      reportedFor={item.department}
      attachments={item.downloadURL}
      isNotStarted={item.isNotStarted}
      isInProgress={item.isInProgress}
      isCompleted={item.isCompleted}
      // timestamp={item.creation.seconds} 
    />
  );
}
  
  if (notStarted.length === 0 && 
    inProgress.length === 0 && 
    completed.length === 0
    ) {
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar 
          placeholder="Search issues"
          onChangeText={(e) => updateQuery(e)}
          value={query} 
        />
        <View>
          <Text style={{fontSize: 18, color: purple_40}}>No issues!</Text>
        </View>
      </SafeAreaView>
    )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar 
        placeholder="Search issues"
        onChangeText={(e) => updateQuery(e)}
        value={query} 
      />
      <SectionList        
        sections={result} 
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: bgSecondary,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: darkerPurple,
    marginTop: 15,
  },
})


export default Issues;

