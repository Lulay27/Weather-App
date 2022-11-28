import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'weather-app-85e1f.firebaseapp.com',
  projectId: 'weather-app-85e1f',
  storageBucket: 'weather-app-85e1f.appspot.com',
  messagingSenderId: '734180277946',
  appId: '1:734180277946:web:1a1a64f63c71f3ae208c83',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
