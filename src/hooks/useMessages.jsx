import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  or,
  limit,
  and,
} from "firebase/firestore";

const useMessages = (currentUserId, selectedUserId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!currentUserId || !selectedUserId) {
      setMessages([]);
      return;
    }

    const collectionRef = collection(db, "messages");

    // Query to get messages between two users
    const q = query(
      collectionRef,
      or(
        and(
          where("senderId", "==", currentUserId),
          where("receiverId", "==", selectedUserId)
        ),
        and(
          where("senderId", "==", selectedUserId),
          where("receiverId", "==", currentUserId)
        )
      ),
      orderBy("createAt"),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMessages(documents);
    });

    return () => unsubscribe();
  }, [currentUserId, selectedUserId]);
  return messages;
};

export default useMessages;
