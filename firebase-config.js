const firebase = require("firebase");

// Firebase konfiguratsiya
const firebaseConfig = {
  apiKey: "AIzaSyAfbD8w3MkFKbQuSjtsOUjNLpGUAVOyGac",
  authDomain: "alpamis-ubaydullaev.firebaseapp.com",
  databaseURL: "https://alpamis-ubaydullaev-default-rtdb.firebaseio.com",
  projectId: "alpamis-ubaydullaev",
  storageBucket: "alpamis-ubaydullaev.appspot.com",
  messagingSenderId: "999957582874",
  appId: "1:999957582874:web:fcf02d51fdc1f9287dada3",
  measurementId: "G-DYT827TBC6"
};

// Firebase ishga tushirish
firebase.initializeApp(firebaseConfig);

// Realtime Database ulash
const db = firebase.database();

// 🔑 Tashqariga eksport qilish
module.exports = db;
