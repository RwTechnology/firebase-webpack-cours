// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    addDoc,
    collection,
    collectionGroup,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    limit,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
  } from "firebase/firestore";
  

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlcXdd_jwkP-BCJyLi7O_kH9ICLTdsgic",
  authDomain: "fir-demo-c90c1.firebaseapp.com",
  projectId: "fir-demo-c90c1",
  storageBucket: "fir-demo-c90c1.appspot.com",
  messagingSenderId: "39944992615",
  appId: "1:39944992615:web:fcc0309041d09d8dc961c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialisation des services
const db = getFirestore(app);

const utilisateurs = collection(db, "utilisateurs");

getDocs(utilisateurs).then((snapshot) => {
    let utilisateurs = []
    snapshot.docs.forEach(doc => {
        utilisateurs.push({...doc.data(), id: doc.id})
        console.log(utilisateurs);
    });
  });