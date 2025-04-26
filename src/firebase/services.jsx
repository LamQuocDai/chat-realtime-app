import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
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

// Hàm thêm tin nhắn mới
export const sendMessage = async (senderId, receiverId, text) => {
  try {
    if (!text.trim() || !senderId || !receiverId) {
      throw new Error("Missing required fields");
    }

    const newMessage = {
      senderId,
      receiverId,
      text,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "messages"), newMessage);

    return {
      id: docRef.id,
      ...newMessage,
    };
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
