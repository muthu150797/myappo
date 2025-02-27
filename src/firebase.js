import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAYga6SFlqb5wpU2F6npP4AWotpI8yLDfM",
    authDomain: "chat-with-my-appo.firebaseapp.com",
    projectId: "chat-with-my-appo",
    storageBucket: "chat-with-my-appo.firebasestorage.app",
    messagingSenderId: "769681407653",
    appId: "1:769681407653:web:70b9c455a4b293fd25974c"
  };
 
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
export const db = getFirestore(app);
export const dbReal = getDatabase(app);
export const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
      try {
          const token = await getToken(messaging);
          console.log("FCM Token:", token);
          return token;
      } catch (error) {
          console.error("Error getting FCM token:", error);
      }
  } else {
      console.warn("Notification permission denied.");
  }
};

// Listen for incoming messages

onMessage(messaging, (payload) => {
  console.log("Message received in foreground:", payload);
});
