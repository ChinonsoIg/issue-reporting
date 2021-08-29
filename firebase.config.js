import firebase from "firebase/app";
import { 
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,  
  APP_ID,
  THE_KEY_TO_HAPPINESS, 
  THE_TEXT_TO_HAPPINESS
 } from "@env";

console.log(THE_TEXT_TO_HAPPINESS)
console.log(THE_KEY_TO_HAPPINESS)

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

export default firebaseConfig;