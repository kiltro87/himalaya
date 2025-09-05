
import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBNEzeYTeaLkrMxQhMh-08RwxmTFOPc32s",
  authDomain: "viaje-himalaya.firebaseapp.com",
  projectId: "viaje-himalaya",
  storageBucket: "viaje-himalaya.firebasestorage.app",
  messagingSenderId: "89001303026",
  appId: "1:89001303026:web:93e11085df1213a865296b"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
