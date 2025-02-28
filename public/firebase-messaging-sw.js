importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// Initialize Firebase inside the service worker
firebase.initializeApp( {
  apiKey: "AIzaSyAYga6SFlqb5wpU2F6npP4AWotpI8yLDfM",
  authDomain: "chat-with-my-appo.firebaseapp.com",
  projectId: "chat-with-my-appo",
  storageBucket: "chat-with-my-appo.firebasestorage.app",
  messagingSenderId: "769681407653",
  appId: "1:769681407653:web:70b9c455a4b293fd25974c"
});
const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png", // Change this to your app icon
  });
});
