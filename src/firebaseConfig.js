// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKEAcA5YjJcDdjICBZQVfx81bdcNbzvP0",
  authDomain: "internetbillingsystem-9d4fe.firebaseapp.com",
  databaseURL: "https://internetbillingsystem-9d4fe-default-rtdb.firebaseio.com", // Your Firebase Realtime Database URL
  projectId: "internetbillingsystem-9d4fe",
  storageBucket: "internetbillingsystem-9d4fe.firebasestorage.app",
  messagingSenderId: "203101832242",
  appId: "1:203101832242:web:09198a7b73cc3115c8682b",
  measurementId: "G-RC84E6QDEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database };
