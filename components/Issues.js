import React, { useState } from "react";
import { Text, View, StyleSheet, SectionList } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import IssuesList from "./IssuesList";
import { bgSecondary, darkerPurple } from "../utils/colours";
import { connect } from "react-redux";


// Mock data
import _NOTSTARTED from "../utils/_NOTSTARTED.json";
import _INPROGRESS from "../utils/_INPROGRESS.json";
import _COMPLETED from "../utils/_COMPLETED.json";


const ItemHeader = ({ title }) => (
  <View>
    <Text style={styles.header}>{title}</Text>
    <Text style={styles.header}>{console.log(title)}</Text>
  </View>
);

const Issues = (props) => {

  const { currentUser, isInProgress, isCompleted } = props;

  const [notStarted, setNotStarted] = useState(_NOTSTARTED.notStarted);
  const [inProgress, setInProgress] = useState(isInProgress);
  const [completed, setCompleted] = useState(isCompleted);
  const [query, setQuery] = useState("");

  // const getMovies = async () => {
  //   try {
  //     const response = await fetch('https://reactnative.dev/movies.json');
  //     const json = await response.json();
  //     setData(json.movies);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   getMovies();
  // }, []);

  const updateQuery = (query) => {
    const trimmedQuery = query.trim();
    setQuery(trimmedQuery)
  }
  
  const clearQuery = () => {
    updateQuery("");
  }

  const data = [
    // {title: 'Not Started', data: notStarted},
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

  const renderItem = ({ item, index }) => (
    <IssuesList 
      navigation={props.navigation}
      key={index}
      title={item.title}
      description={item.description}
      reportedBy={item.reportedBy} 
      reportedFor={item.department}
      attachments={item.downloadURL}
      timestamp={item.creation.seconds} />
  );
  
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


const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  isInProgress: store.userState.isInProgress,
  isCompleted: store.userState.isCompleted
});

// const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, null)(Issues);

