import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDacXsbA4JOMDmQG8PPZuvIWUjE1UjuUX4",
    authDomain: "cybermania-d663c.firebaseapp.com",
    projectId: "cybermania-d663c",
    storageBucket: "cybermania-d663c.appspot.com",
    messagingSenderId: "388761802614",
    appId: "1:388761802614:web:312614c1e4af31b1588c57"
  };

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, provider}