import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';    



const firebaseConfig = {
    apiKey: "AIzaSyCi5UGRp_jXAkdjcocHzzgCtzuLMyHW7Rw",
    authDomain: "leechat-6b49b.firebaseapp.com",
    projectId: "leechat-6b49b",
    storageBucket: "leechat-6b49b.appspot.com",
    messagingSenderId: "1056120381352",
    appId: "1:1056120381352:web:cf4014280630b78687479d"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {auth, db}