
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB3EchtJRNCxzqrVxt98ZY1mh-UD8wcZUE",
  authDomain: "fortybunny-f922b.firebaseapp.com",
  databaseURL: "https://fortybunny-f922b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fortybunny-f922b",
  storageBucket: "fortybunny-f922b.firebasestorage.app",
  messagingSenderId: "985175347755",
  appId: "1:985175347755:web:68d3c04fb692ced4e9906e",
  measurementId: "G-VXW6F6506Y"
};

// Initialize Firebase
const firebaseAppConf = initializeApp(firebaseConfig);

export default firebaseAppConf;