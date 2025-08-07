import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-X3otqZHBCrfqh6rjCnFtmbwCJZ_rsrQ",
  authDomain: "login-4ee7c.firebaseapp.com",
  projectId: "login-4ee7c",
  storageBucket: "login-4ee7c.firebasestorage.app",
  messagingSenderId: "760705165085",
  appId: "1:760705165085:web:4f7903d571636ec8b9e3f4",
  measurementId: "G-9YNZB75L12",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
