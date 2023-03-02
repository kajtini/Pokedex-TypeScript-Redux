import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2OAt-Nw6vrzEyK7le_s5mnDuJdAZZ8Lg",
  authDomain: "pokedex-f50cb.firebaseapp.com",
  projectId: "pokedex-f50cb",
  storageBucket: "pokedex-f50cb.appspot.com",
  messagingSenderId: "440620830529",
  appId: "1:440620830529:web:8921e7340b1dc86dff1bc0",
  measurementId: "G-2WXKMTWMPC",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
