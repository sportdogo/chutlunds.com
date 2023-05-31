// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getMessaging } from "firebase/messaging";

export const firebaseConfig = {
    apiKey: "AIzaSyCVEgwafQ32QhL_3Ryy32HPWa9z0VwDvyE",
    authDomain: "chutlunds-bb715.firebaseapp.com",
    projectId: "chutlunds-bb715",
    storageBucket: "chutlunds-bb715.appspot.com",
    messagingSenderId: "222815612544",
    appId: "1:222815612544:web:0b6e300f86ac2e8f0c8065",
    measurementId: "G-QKBDVB9GVP",
    databaseURL: "https://chutlunds-bb715-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
// const messaging = getMessaging(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);