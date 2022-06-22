// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, where, query } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCADzzllzRYMrhpiuGgKZSWwltU6cLKiTA",
  authDomain: "herbcare-4eda0.firebaseapp.com",
  databaseURL: "https://herbcare-4eda0-default-rtdb.firebaseio.com",
  projectId: "herbcare-4eda0",
  storageBucket: "herbcare-4eda0.appspot.com",
  messagingSenderId: "1096727822062",
  appId: "1:1096727822062:web:fb226e9abca18b61ebfdff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const getDocsSnap = (collectionName) => {
  return getDocs(collection(getFirestore(app), collectionName))
}

const getDocsSnapWhere = (collectionName, conditions) => {
  const db = getFirestore(app)
  const collectionRef = collection(db, collectionName)
  const whereConditions = where(conditions[0], conditions[1], conditions[2])
  const q = query(collectionRef, whereConditions)

  return getDocs(q)
}

const getDocSnapWhere = (collectionName, conditions) => {
  const db = getFirestore(app)
  const collectionRef = collection(db, collectionName)
  const whereConditions = where(conditions[0], conditions[1], conditions[2])
  const q = query(collectionRef, whereConditions)

  return getDoc(q)
}

const getDocSnap = (collectionName, id) => {
  return getDoc(doc(getFirestore(app), collectionName, id))
}

export { getDocsSnap, getDocSnap, getDocsSnapWhere, getDocSnapWhere }
