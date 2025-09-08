
import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAnhCzmmVs3cvURiEDvH9RoLDb2hr4AZhA",
  authDomain: "nepal-v2.firebaseapp.com",
  projectId: "nepal-v2",
  storageBucket: "nepal-v2.appspot.com",
  messagingSenderId: "724157932457",
  appId: "1:724157932457:web:873d92b8dbc656d3655ab8"
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app, "viaje");

export { db };
