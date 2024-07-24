import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore'; // Usa la API modular

const firebaseConfig = {
  apiKey: "AIzaSyDbi9EH8Dy--V7J0HtVYEydXmZ7bwQV56o",
  authDomain: "c-instagram-7f86d.firebaseapp.com",
  databaseURL: "https://c-instagram-7f86d-default-rtdb.firebaseio.com",
  projectId: "c-instagram-7f86d",
  storageBucket: "c-instagram-7f86d.appspot.com",
  messagingSenderId: "515915126180",
  appId: "1:515915126180:web:2bb26ad614984e8a839d31",
  measurementId: "G-DSCM6JR5PB"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { app, auth, db };
