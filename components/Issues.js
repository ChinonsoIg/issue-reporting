import React, { useState } from "react";
import { Text, StyleSheet, SectionList } from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import IssuesList from "./IssuesList";
import { bgSecondary, darkerPurple } from "../utils/colours";

const DATA = {
  "results":[
    {
      "title": "Not Started",
      "data": [
        { 
          "issue": "Pipe leaking", 
          "reportedBy": "John Burger",
          "reportedFor": "SWG",
          "attachments": 5,
          "timestamp": "08 Jun 2021, 09:04 AM"
        },
        { 
          "issue": "Car not starting", 
          "reportedBy": "Jane Doe",
          "reportedFor": "AUT",
          "attachments": 2,
          "timestamp": "18 Jun 2021, 08:34 AM 2"
        },
        { 
          "issue": "Door key spoilt", 
          "reportedBy": "Sara Mandi",
          "reportedFor": "CAR",
          "attachments": 2,
          "timestamp": "18 Jun 2021, 07:54 AM"
        }
      ]
    },
    {
      "title": "In Progress",
      "data": [
        { 
          "issue": "Cable burnt", 
          "reportedBy": "Rebecca Fries", 
          "reportedFor": "ELC",
          "attachments": 0,
          "timestamp": "22 Jun 2021, 12:04 PM" 
        },
        { 
          "issue": "Kitchen tap not working", 
          "reportedBy": "Juliet Daniels", 
          "reportedFor": "PLM",
          "attachments": 2,
          "timestamp": "25 Jun 2021, 03:04 PM" 
        }
    ]
    },
    {
      "title": "Completed",
      "data": [
        { 
          "issue": "Printer not printing", 
          "reportedBy": "Charles McFish", 
          "reportedFor": "OFF",
          "attachments": 3,
          "timestamp": "24 Jun 2021, 01:14 PM" 
        },
        { 
          "issue": "Generator smoking", 
          "reportedBy": "Toni Daniels", 
          "reportedFor": "GEN",
          "attachments": 0,
          "timestamp": "29 Jun 2021, 04:04 PM" 
        }
      ]
    }
  ]
}


const Issues = ({ navigation }) => {

  const data = DATA.results
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

  const result = data.reduce((acc, currentObj) => {
    let output = {}
    const transformedQuery = query.toLowerCase();
    const currentTitle = currentObj.title
    const currentData = currentObj.data

    const filteredData =currentData.filter(item => {
      const transformedItem = item.issue.toLowerCase();
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

  // console.log(result);
  
  return (
    <SafeAreaView style={styles.container}>
        <SearchBar 
          // style={{backgroundColor: purple_95, color: darkPurple}}
          placeholder="Search issues"
          onChangeText={(e) => updateQuery(e)}
          value={query} 
        />
      <SectionList        
        sections={result} 
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => 
          <IssuesList 
            navigation={navigation}
            key={index}
            title={item.title}
            issue={item.issue}
            reportedBy={item.reportedBy} 
            reportedFor={item.reportedFor}
            attachments={item.attachments}
            timestamp={item.timestamp} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
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
