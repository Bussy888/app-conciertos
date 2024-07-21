import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './src/config/firebase';

import MenuNavigation from "./src/navigation/MenuNavigation";
import AuthNavigation from "./src/navigation/AuthNavigation";

export default function App() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
    return unsubscribe;
  }, []);

  if (login === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#0095f6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {login ? <MenuNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}