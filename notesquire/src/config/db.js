
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
let config = {
  apiKey: "AIzaSyC3DFVy3hInOy7dxoCVY6sD9mwqtFEoiCk",
  authDomain: "notesquire.firebaseapp.com",
  projectId: "notesquire",
  storageBucket: "notesquire.appspot.com",
  messagingSenderId: "532766710082",
  appId: "1:532766710082:web:81553be34737c9c21650db"

};
  export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
  export const db =  !firebase.apps.length ? firebase.initializeApp(config) : firebase.firestore();
  export const firestorage =  !firebase.apps.length ? firebase.initializeApp(config) : firebase.storage();
  export const firestore = !firebase.apps.length ? firebase.initializeApp(config) : firebase.firestore();
  export const googleProvider = new firebase.auth.GoogleAuthProvider();