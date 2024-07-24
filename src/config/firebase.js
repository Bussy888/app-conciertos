import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore'; // Usa la API modular

const firebaseConfig = {
  
  apiKey: "AIzaSyB5oEQE6vJSBebnKIRcPIsWGz8vS0hxagk",
  authDomain: "app-conciertos.firebaseapp.com",
  projectId: "app-conciertos",
  storageBucket: "app-conciertos.appspot.com",
  messagingSenderId: "637400342824",
  appId: "1:637400342824:web:8455ce61653d76cef5b01d"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { app, auth, db };
