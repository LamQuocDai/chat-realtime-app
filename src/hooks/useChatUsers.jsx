import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
  or,
  getDocs,
  orderBy,
} from "firebase/firestore";

/**
 * Hook trả về danh sách người dùng đã từng nhắn tin với người dùng hiện tại
 */
const useChatUsers = (currentUserId) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastMessages, setLastMessages] = useState({});

  //Fetch chat users
  useEffect(() => {
    if (!currentUserId) {
      setUsers([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Get messages where current user is sender or receiver
    const messagesRef = collection(db, "messages");
    const q = query(
      messagesRef,
      or(
        where("senderId", "==", currentUserId),
        where("receiverId", "==", currentUserId)
      ),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (snapshot.empty) {
        setUsers([]);
        setLoading(false);
        return;
      }

      // Extract unique user IDs and their last messages
      const userMessagesMap = {};

      snapshot.docs.forEach((doc) => {
        const message = doc.data();
        const otherUserId =
          message.senderId === currentUserId
            ? message.receiverId
            : message.senderId;

        // Only store the first message for each user
        if (!userMessagesMap[otherUserId]) {
          userMessagesMap[otherUserId] = {
            lastMessage: {
              id: doc.id,
              ...message,
            },
            lastMessageTime: message.createdAt,
          };
        }
      });

      // Get user details for each user ID
      const userIds = Object.keys(userMessagesMap);

      if (userIds.length === 0) {
        setUsers([]);
        setLoading(false);
        return;
      }

      // Fetch user details from users collection
      const usersRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersRef);

      const usersData = [];

      usersSnapshot.docs.forEach((doc) => {
        const userData = doc.data();
        if (userIds.includes(doc.id) && doc.id !== currentUserId) {
          const userWithLastMessage = {
            id: doc.id,
            ...userData,
            lastMessage: userMessagesMap[doc.id].lastMessage,
            lastTimestamp: userMessagesMap[doc.id].lastTimestamp,
          };
          usersData.push(userWithLastMessage);
        }
      });

      // Sort users by last message time
      usersData.sort((a, b) => b.lastTimestamp - a.lastTimestamp);
      setUsers(usersData);
      setLoading(false);

      // Store last message in a separate state
      const lastMsgs = {};
      usersData.forEach((user) => {
        lastMsgs[user.id] = user.lastMessage;
      });
      setLastMessages(lastMsgs);
    });

    return () => unsubscribe();
  }, [currentUserId]);

  return { users, loading, lastMessages };
};

export default useChatUsers;
