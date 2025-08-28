
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA_MhaAl359AVg_-0ZnGQ1WiY4R3lAG3ZE",
  authDomain: "mobile-app-f692a.firebaseapp.com",
  projectId: "mobile-app-f692a",
  storageBucket: "mobile-app-f692a.firebasestorage.app",
  messagingSenderId: "127907665052",
  appId: "1:127907665052:web:e62ab1ca8bb35bcdb34959",
  measurementId: "G-41NCEZ5N14"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };