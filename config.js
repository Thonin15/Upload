import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBqGgrlaraDRS8WzoblIN9kse27XD_pvsM",
  authDomain: "kitku-test.firebaseapp.com",
  projectId: "kitku-test",
  storageBucket: "kitku-test.appspot.com",
  messagingSenderId: "8398800678",
  appId: "1:8398800678:web:c1a465d75ca974f85c63e7"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}
export {firebase};