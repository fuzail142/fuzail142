import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyBgf5XlVuHhszXbFn1Vfur31GMvWaEYsIM",
    authDomain: "hackathon-ea5d4.firebaseapp.com",
    projectId: "hackathon-ea5d4",
    storageBucket: "hackathon-ea5d4.appspot.com",
    messagingSenderId: "786751276676",
    appId: "1:786751276676:web:9c4b268971c8fd2f6564d1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
