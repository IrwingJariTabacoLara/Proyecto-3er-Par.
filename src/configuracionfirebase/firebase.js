import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDp1h5OOi-3hzWnSLWr6lCxeWq4K_4LXvI",
  authDomain: "agenda-xd.firebaseapp.com",
  projectId: "agenda-xd",
  storageBucket: "agenda-xd.appspot.com",
  messagingSenderId: "48141471707",
  appId: "1:48141471707:web:9b4259329c0c51117a61fe"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const { Timestamp } = firebase.firestore;  // Asegúrate de que Timestamp esté importado correctamente

export { db, Timestamp };

