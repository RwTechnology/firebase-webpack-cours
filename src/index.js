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
const citiesRef = collection(db, "Villes");

//affiche les utilisateurs des services
// getDocs(utilisateurs).then((snapshot) => {
//     let utilisateurs = []
//     snapshot.docs.forEach(doc => {
//         utilisateurs.push({ ...doc.data(), id: doc.id })
//         console.log(utilisateurs);
//     });
// });

//RealTime update
// onSnapshot(citiesRef, (snapshot) => {
//     let villes = [];
//     snapshot.docs.forEach((doc) => {
//       villes.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(villes);
// });



// affiche les villes des services
// getDocs(citiesRef).then((snapshot) => {
//     let villes = []
//     snapshot.docs.forEach(doc => {
//         villes.push({ ...doc.data(), id: doc.id })
//         console.log(villes);
//     });
// });


//Ajouter un document
const addCityForm = document.querySelector(".ajouter");
addCityForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //Ajouter un nouveau document avec un id généré
    addDoc(citiesRef, {
        pays: addCityForm.pays.value,
        ville: addCityForm.ville.value,
        capital: addCityForm.capital.value === "true" ? true : false,
        dateDajout: serverTimestamp(),
    }).then(() => addCityForm.reset());

    //Ajout du document avec un id personalisé
    /* setDoc(doc(db, "Villes", "KIN"), {
      pays: addCityForm.pays.value,
      ville: addCityForm.ville.value,
      capital: addCityForm.capital.value === "true" ? true : false,
      dateDajout: serverTimestamp(),
    }).then(() => addCityForm.reset()); */
});

//Suppression d'un document
const deleteCityForm = document.querySelector(".suppression");
deleteCityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "Villes", deleteCityForm.id.value);

  deleteDoc(docRef).then(() => deleteCityForm.reset());
});

//Modification d'un document
const updateCityForm = document.querySelector(".update");
updateCityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "Villes", updateCityForm.id.value);

  updateDoc(docRef, { ville: "La ville à jour, ok" }).then(() =>
    updateCityForm.reset()
  );
});




