// ========================================
// BVenture - Configuração do Firebase
// ========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";


// ========================================
// Configuração do projeto BVenture
// ========================================

const firebaseConfig = {
    apiKey: "AIzaSyBB-00TRF9gKzmSDu8PKxATryOboteI4Vs",
    authDomain: "bventure-ed6a7.firebaseapp.com",
    projectId: "bventure-ed6a7",
    storageBucket: "bventure-ed6a7.firebasestorage.app",
    messagingSenderId: "631390271111",
    appId: "1:631390271111:web:53284bfc163fc122e16a22"
};


// ========================================
// Inicialização
// ========================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();


// ========================================
// Exportações
// ========================================

export {
    app,
    auth,
    db,
    googleProvider
};