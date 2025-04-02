import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./config";

export const addCollection = async (collectionName, data, docId = null) => {
  try {
    let docRef;
    if (docId) {
      docRef = doc(db, collectionName, docId);
      await setDoc(docRef, data);
    } else {
      docRef = await addDoc(collection(db, collectionName), data);
    }
    return docRef || docId;
  } catch (error) {
    console.error(error);
    return null;
  }
};
