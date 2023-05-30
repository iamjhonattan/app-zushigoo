import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBxjax8FnETyOtvGWSVF5WGAiwH42Rryfw",
    authDomain: "app-zushigoo.firebaseapp.com",
    databaseURL: "https://app-zushigoo-default-rtdb.firebaseio.com",
    projectId: "app-zushigoo",
    storageBucket: "app-zushigoo.appspot.com",
    messagingSenderId: "196650219340",
    appId: "1:196650219340:web:16d23a4b42a063a637c1e9",
    measurementId: "G-BQ9CF5Z75Y"
  };

  const app = getApp.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export { app, firestore, storage };
