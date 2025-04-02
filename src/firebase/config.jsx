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
  signInWithEmailAndPassword,
  updateProfile,
  getAdditionalUserInfo,
  connectAuthEmulator,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  serverTimestamp,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { addCollection } from "./services";

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

const db = getFirestore();

if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  console.log("connect emulators success");
}

const loginWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, fbProvider);
    const user = result.user;
    if (getAdditionalUserInfo(result)?.isNewUser) {
      await addCollection(
        "users",
        {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          providerId: "facebook.com",
          createdAt: serverTimestamp(),
        },
        user.uid
      );
    }
  } catch (error) {
    console.log("Facebook login fail");
    throw error;
  }
};

const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, ggProvider);
    const user = result.user;
    if (getAdditionalUserInfo(result)?.isNewUser) {
      await addCollection(
        "users",
        {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          providerId: "google.com",
          createdAt: serverTimestamp(),
        },
        user.uid
      );
    }
  } catch (error) {
    console.log("Google login fail");
    throw error;
  }
};

const registerWithEmailAndPassword = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    if (name === "") {
      name = "New user";
    }
    await updateProfile(user, {
      displayName: name,
    });
    if (getAdditionalUserInfo(userCredential)?.isNewUser) {
      await addCollection(
        "users",
        {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          providerId: "password",
          createdAt: serverTimestamp(),
        },
        user.uid
      );
    }
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("User is register");
    }
  }
};

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};

export {
  auth,
  fbProvider,
  loginWithFacebook,
  onAuthStateChanged,
  signOut,
  loginWithGoogle,
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
  db,
};
export default app;
