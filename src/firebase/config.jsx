import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  FacebookAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDu-li_OO1gNKyl4Y_qPP6V6kQSyRXeIP4",

  authDomain: "chat-app-e3fbf.firebaseapp.com",

  projectId: "chat-app-e3fbf",

  storageBucket: "chat-app-e3fbf.firebasestorage.app",

  messagingSenderId: "1059015352322",

  appId: "1:1059015352322:web:e09cffafeccb6724cd471b",

  measurementId: "G-FM0DBZZT87",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics();

const auth = getAuth();
const fbProvider = new FacebookAuthProvider();
fbProvider.addScope("public_profile");

const ggProvider = new GoogleAuthProvider();

const loginWithFacebook = async () => {
  try {
    await signInWithPopup(auth, fbProvider);
  } catch (error) {
    console.log("Facebook login fail");
    throw error;
  }
};

const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, ggProvider);
  } catch (error) {
    console.log("Google login fail");
    throw error;
  }
};

const regiterWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
    console.log("User regiter successfully");
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      try {
        console.log("email is regitered");
      } catch (error) {
        console.error(error);
      }
    }
    throw error;
  }
};

const db = getFirestore();

export {
  auth,
  fbProvider,
  loginWithFacebook,
  onAuthStateChanged,
  signOut,
  loginWithGoogle,
  regiterWithEmailAndPassword,
  db,
};
export default app;
