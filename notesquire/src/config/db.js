
import Firebase from 'firebase'
let config = {
  apiKey: "AIzaSyC3DFVy3hInOy7dxoCVY6sD9mwqtFEoiCk",
  authDomain: "notesquire.firebaseapp.com",
  projectId: "notesquire",
  storageBucket: "notesquire.appspot.com",
  messagingSenderId: "532766710082",
  appId: "1:532766710082:web:81553be34737c9c21650db"

};
  export default !Firebase.apps.length ? Firebase.initializeApp(config) : Firebase.app();
  export const db =  !Firebase.apps.length ? Firebase.initializeApp(config) : Firebase.firestore();
  export const firestorage =  !Firebase.apps.length ? Firebase.initializeApp(config) : Firebase.storage();
  export const firestore = !Firebase.apps.length ? Firebase.initializeApp(config) : Firebase.firestore();
  export const googleProvider = new Firebase.auth.GoogleAuthProvider();