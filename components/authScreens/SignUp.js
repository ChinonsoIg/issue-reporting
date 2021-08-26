import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, TouchableHighlight, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { purple, white, purple_95, purple_80, darkPurple, purple_40, black } from "../../utils/colours";
import landingImage from "../../image/work_together.png";
import { dept } from "../../utils/api";
import { generateId, removeWhitespace } from "../../utils/helpers";

import firebase from "firebase";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // To select department
  const [deptOpen, setDeptOpen] = useState(false);
  const [department, setDepartment] = useState(null);
  const [depts, setDepts] = useState(dept);

  const onSignUp = () => {
    const firstname = name.split(" ")[0];
    const lastname = name.split(" ")[1];
    const userId = generateId(firstname, lastname)

    if ((name === null) || (email === null) || (password === null) || (confirmPassword === null) || (department === null)) {
      console.log('No field should be empty');
      Alert.alert('No field should be empty');
    } else if (password.length < 6) {
      console.log('Passwords must be at least 6 characters long');
      Alert.alert('Passwords must be at least 6 characters long');
    } else if (password !== confirmPassword) {
      console.log('Passwords must match');
      Alert.alert('Passwords must match');
    } else {
      console.log('You are good to go');

      try {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
          firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
              name,
              email,
              password,
              confirmPassword,
              department,
              userId
            })
          console.log('result: ', result)
        })
        .catch((error) => {
          console.error('error: ', error)
          console.error('error: ', error.message)

          switch (error.code) {
            case "auth/email-already-in-use":
              Alert.alert("The email address is already in use by another account")
              break;
            case "auth/invalid-email":
              Alert.alert("Please enter a valid email address") 
              break;
            case "auth/weak-password":
              Alert.alert("Password mut be at least 6 characters long!")
              break;
            default:
              Alert.alert("Please cross-check that all the fields are properly filled")
              break;
          }
        })
      } catch (err) {
        console.error(err);
      }
    
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }} >
        <View
          style={{
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center'
          }}
        >
          <Image source={landingImage} style={styles.img} />
        </View>
        
        <View
          style={{
            flex: 3, 
            justifyContent: 'space-around',
          }}
        >        
          <View>
            <TextInput 
              style={styles.input} 
              onChangeText={(e) => setName(e)}
              value={name}
              placeholder="Full name"
            />
            <TextInput 
              style={styles.input} 
              onChangeText={(e) => setEmail(e)}
              value={email}
              placeholder="E-mail"
            />
            <View style={{marginVertical: 8}}>
              <Text style={{fontSize:12}}>Select your department:</Text>
              <DropDownPicker
                placeholder='Select department'
                open={deptOpen}
                value={department}
                items={depts}
                setOpen={setDeptOpen}
                setValue={setDepartment}
                setItems={setDepts}
                zIndex={10000}
                style={{borderWidth: 1, borderColor: purple_80, borderRadius: 5}}
              />
            </View>
            <TextInput 
              style={styles.input}
              onChangeText={(e) => setPassword(e)}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
            />
            <TextInput 
              style={styles.input}
              onChangeText={(e) => setConfirmPassword(e)}
              value={confirmPassword}
              placeholder="Confirm password"
              secureTextEntry={true}
            />
            <View 
              style={{
                width: '100%',
                flexDirection: 'row',  
                justifyContent: 'center',
              }}
            >
              <Text style={{ marginHorizontal: 10, color: black }}>
                Already have an account? 
                <Text style={{ color:purple_40 }}> Sign In </Text>
                instead
              </Text>
            </View>
          </View>
          <TouchableHighlight style={styles.btn} onPress={onSignUp} underlayColor={purple_80} >
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableHighlight>
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
  input: {
    height: 40,
    marginVertical: 8,
    padding: 5,
    borderWidth: 1,
    borderColor: purple_80,
    borderRadius: 5,
    backgroundColor: white,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: darkPurple,
  },
  img: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
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







// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, Pressable, TouchableHighlight, Image, Button } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import DropDownPicker from "react-native-dropdown-picker";
// import * as Yup from 'yup';

// import { purple, white, purple_95, purple_80, darkPurple, purple_40, black } from "../../utils/colours";
// import landingImage from "../../image/work_together.png";
// import { dept } from "../../utils/api";
// import { generateId, removeWhitespace } from "../../utils/helpers";

// import firebase from "firebase";
// import { Formik, Field } from 'formik';

// const validationSchema = Yup.object().shape({
//   name: Yup.string()
//     .required('Name is required')
//     .label('Name'),
//   email: Yup.string()
//     .email('Please enter valid email')
//     .required('Email is required')
//     .label('Email'),
//   password: Yup.string()
//     .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
//     .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
//     .matches(/\d/, 'Password must have a number')
//     .min(8, ({min}) => `Password must be at least ${min} characters`)
//     .required('Password is required')
//     .label('Password'),
// });



// const SignUp = () => {
//   return (
//     <>
//       <Text>Sign Up</Text>
//       <Formik
//         initialValues={{name: '', email: '', password: ''}}
//         validationSchema={validationSchema}
//         onSubmit={values => console.log(values)}
//       >
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           errors,
//           touched,}) => (
//             <View>
//               <TextInput 
//                 placeholder="Name" 
//                 onChangeText={handleChange('name')}
//                 onBlur={handleBlur('name')}
//                 value={values.name}
//                 autoCorrect={false}
//               />
//               {errors.name && touched.name && (
//                 <Text style={{color: 'red'}}>{errors.name}</Text>
//               )}
//               <TextInput
//                 placeholder="Email"
//                 onChangeText={handleChange('email')}
//                 onBlur={handleBlur('email')}
//                 autoCapitalize="none"
//                 autoCompleteType="email"
//                 autoCorrect={false}
//                 keyboardType="email-address"
//                 textContentType="emailAddress"
//                 value={values.email}
//               />
//               {errors.name && touched.name && (
//                 <Text style={{color: 'red'}}>{errors.email}</Text>
//               )}
//               <TextInput
//                 placeholder="Password"
//                 onChangeText={handleChange('password')}
//                 onBlur={handleBlur('password')}
//                 autoCapitalize="none"
//                 secureTextEntry
//                 textContentType="password"
//                 value={values.password}
//               />
//               {errors.name && touched.name && (
//                 <Text style={{color: 'red'}}>{errors.password}</Text>
//               )}
//               <Button 
//                 onPress={handleSubmit} 
//                 title="Submit" 
//               />
//             </View>
//           )}
//       </Formik>
//     </>
//   );
// };


// export default SignUp;

