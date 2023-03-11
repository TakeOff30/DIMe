import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyDvqx6aavkZ95vai95O19wu9tg3wCLFGtc',
    authDomain: 'dime-20745.firebaseapp.com',
    projectId: 'dime-20745',
    storageBucket: 'dime-20745.appspot.com',
    messagingSenderId: '1005405323846',
    appId: '1:1005405323846:web:9eb6070bbe1c1d2e5c8047',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db}