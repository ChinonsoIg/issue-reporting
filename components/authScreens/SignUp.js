import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { purple, white, goldenRod, purple_95, purple_80, bgSecondary, darkerPurple, purple_70 } from "../../utils/colours";


const SignUp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome Back!</Text>
        <Text>Sign in to continue</Text>
        <View>
          <Text>hhj</Text>
        </View>
        <View>

        </View>
        <View>
          <Text>Remember me</Text>
          <Text>Forgot password?</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12
  },
  boldText: {
    fontWeight: 'bold',
    color: darkerPurple,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderRadius: 5,
    backgroundColor: purple,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: white,
  },
  btnOutline: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    borderRadius: 5,
    borderColor: purple,
    borderWidth: 5,
    backgroundColor: purple_95,
  },
  btnTextOutline: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: purple,
  },
})

export default SignUp;
