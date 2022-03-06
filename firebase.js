import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDtepgvSO7AAWufNoDiLClQURr6vQ_vpdE",
  authDomain: "project-app-bc61e.firebaseapp.com",
  projectId: "project-app-bc61e",
  storageBucket: "project-app-bc61e.appspot.com",
  messagingSenderId: "641365944037",
  appId: "1:641365944037:web:bfbda4604680b9b351560c",
  measurementId: "G-EKP7MWQS1V",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
