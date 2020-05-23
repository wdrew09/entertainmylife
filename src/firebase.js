import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-storage'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/analytics'
import * as functions from 'firebase-functions'

var firebaseConfig = {
    apiKey: "AIzaSyCBeBmU8XvO7QckDyoUCAJSGpTzAO4l24Y",
    authDomain: "entertainmylife-dc14c.firebaseapp.com",
    databaseURL: "https://entertainmylife-dc14c.firebaseio.com",
    projectId: "entertainmylife-dc14c",
    storageBucket: "entertainmylife-dc14c.appspot.com",
    messagingSenderId: "348936309614",
    appId: "1:348936309614:web:ef05df72951f05c031cf7f",
    measurementId: "G-HTMRKZWLF6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default firebase
