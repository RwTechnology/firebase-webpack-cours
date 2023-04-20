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


// ============================================================================= Les Requete
// => Requête simple
//1. Récuperer les villes de la Rd Congo
const q1 = query(citiesRef, where("pays", "==", "Rd Congo"));

//2. Récuperer toutes les villes sauf celles de la RDC
const q2 = query(citiesRef, where("pays", "!=", "Rd Congo"));

//3 Récuperer seulement les villes de la RD Congo et celles du Rwanda
const q3 = query(citiesRef, where("pays", "in", ["Rd Congo", "Rwanda"]));

//4. Récuperer toutes les villes sauf 'Bujumbura', 'Gisenyi', 'Goma'
const q4 = query(
    citiesRef,
    where("ville", "not-in", ["Bujumbura", "Gisenyi", "Goma"])
);


//5. Récuperer les villes dont la population est superieure à 1M
const q5 = query(citiesRef, where("population", ">", 1000000));

//6. Récuperer toutes les villes ajoutées entre le 10 et 30 juillet 2022
// et Arrangez-les selon l'odre decroissant
const q6 = query(
    citiesRef,
    where(
      "dateDajout",
      ">",
      new Date("Jul 10, 2022"),
      where("dateDajout", "<", new Date("Jul 30, 2022")),
      orderBy("dateDajout", "desc")
    )
  );


//7. Récuperer la ville avec comme commune 'Nyarugege'
const q7 = query(citiesRef, where("communes", "array-contains", "Nyarugenge"));

//8. Récuperer les villes avec comme commune 'Nyarugege', 'Bandale', 'Cyangugu', 'Ibanda'
const q8 = query(
    citiesRef,
    where("communes", "array-contains-any", [
      "Nyarugenge",
      "Bandale",
      "Cyangugu",
      "Ibanda",
    ])
  );

//9. Récuperer les 3 dernieres villes recement ajoutées
const q9 = query(citiesRef, orderBy("dateDajout", "desc"), limit(3));

// => Reqêtes composées
//10.Récuperer toutes les villes de la RD Congo
//dont la population est inferieure à 3M
const q10 = query(
    citiesRef,
    where("pays", "==", "Rd Congo"),
    where("population", "<", 3000000)
  );


// => Requêtes de groupe des collections
// Référence de la sous-collection (NB: ID unique pour les sous-collections)
const habitantsRef = collectionGroup(db, "habitants");

//11. Récuperer tous les habitants disponibles
const q11 = query(habitantsRef);

//12. Récuperer les habitants femins
const q12 = query(habitantsRef, where("sexe", "==", "F"));





// ================================================================ CRUD =================================

//affiche les utilisateurs des services
// getDocs(utilisateurs).then((snapshot) => {
//     let utilisateurs = []
//     snapshot.docs.forEach(doc => {
//         utilisateurs.push({ ...doc.data(), id: doc.id })
//         console.log(utilisateurs);
//     });
// });

//RealTime update
onSnapshot(q12, (snapshot) => {
    let villes = [];
    snapshot.docs.forEach((doc) => {
        villes.push({ ...doc.data(), id: doc.id });
    });
    console.log(villes);
});



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


