// import { USER_STATE_CHANGE, IS_NOT_STARTED, IS_IN_PROGRESS, IS_COMPLETED } from "../constants/index";
// import firebase from "firebase";
// // require('firebase/firestore')

// const fetchUser = () => {

//   return ((dispatch) => {
//     firebase.firestore()
//       .collection("users")
//       .doc(firebase.auth().currentUser.uid)
//       .get()
//       .then((snapshot) => {
//         if (snapshot.exists) {
//           dispatch({ 
//             type: USER_STATE_CHANGE,
//             currentUser: snapshot.data()
//           })
//         } else {
//           console.log('Does not exist!!')
//         }
//       })
//   })
// }


// const fetchIsNotStarted = () => {

//   return ((dispatch) => {

//     firebase.firestore()
//     .collection("issues")
//     .where("isNotStarted", "==", true)
//     .get()
//     .then((snapshot) => {
//       let isNotStarted = snapshot.docs.map((doc) => {
//           const id = doc.id;
//           const data = doc.data();

//           return { id, ...data }
//       })
//       dispatch({ 
//         type: IS_NOT_STARTED,
//         isNotStarted
//       })
//     })
//   })
// }


// const fetchIsInProgress = () => {

//   return ((dispatch) => {

//     firebase.firestore()
//     .collection("issues")
//     .where("isInProgress", "==", true)
//     .get()
//     .then((snapshot) => {
//       let isInProgress = snapshot.docs.map((doc) => {
//           const id = doc.id;
//           const data = doc.data();

//           return { id, ...data }
//       })
//       dispatch({ 
//         type: IS_IN_PROGRESS,
//         isInProgress
//       })
//     })
//   })
// }


// const fetchIsCompleted = () => {

//   return ((dispatch) => {

//     firebase.firestore()
//     .collection("issues")
//     .where("isCompleted", "==", true)
//     .get()
//     .then((snapshot) => {
//       let isCompleted = snapshot.docs.map((doc) => {
//           const id = doc.id;
//           const data = doc.data();

//           return { id, ...data }
//       })
//       dispatch({ 
//         type: IS_COMPLETED,
//         isCompleted
//       })
//     })
//   })
// }


// export { fetchUser, fetchIsNotStarted, fetchIsInProgress , fetchIsCompleted };