import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBM93NbBkaHdRYHTYNSG5N30d0VkYGBhR8",
  authDomain: "mobile-app-d34e2.firebaseapp.com",
  projectId: "mobile-app-d34e2",
  storageBucket: "mobile-app-d34e2.appspot.com",  
  messagingSenderId: "495322594392",
  appId: "1:495322594392:web:cf20342e5a69512f9d5e2d",
  measurementId: "G-3TBN6TQWZK"
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);


export { db };
