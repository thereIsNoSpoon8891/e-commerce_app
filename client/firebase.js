
import { initializeApp } from "firebase/app";
import { getStorage } from '@firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC3OfAXAvwzKLWvnd837VvbZk4EETKfl10",
  authDomain: "e-commerce-df7cb.firebaseapp.com",
  projectId: "e-commerce-df7cb",
  storageBucket: "e-commerce-df7cb.appspot.com",
  messagingSenderId: "141325179916",
  appId: "1:141325179916:web:9dc4c97d6ec21f91f32229"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);