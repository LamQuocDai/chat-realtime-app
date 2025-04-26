import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
  or,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";

const useRecentChats = (currentUserId) => {
  const [recentChats, setRecentChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUserId) {
      setRecentChats([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // 1. Lấy tất cả tin nhắn liên quan đến currentUser, sắp xếp theo thời gian mới nhất
    const messagesRef = collection(db, "messages");
    const messagesQuery = query(
      messagesRef,
      or(
        where("senderId", "==", currentUserId),
        where("receiverId", "==", currentUserId)
      ),
      orderBy("createdAt", "desc") // Tin nhắn mới nhất lên đầu
    );

    const unsubscribe = onSnapshot(messagesQuery, async (snapshot) => {
      if (snapshot.empty) {
        setRecentChats([]);
        setLoading(false);
        return;
      }

      // 2. Tạo Map để lưu người dùng và tin nhắn mới nhất của họ
      const userLastMessageMap = new Map();

      snapshot.docs.forEach((doc) => {
        const message = { id: doc.id, ...doc.data() };
        const otherUserId =
          message.senderId === currentUserId
            ? message.receiverId
            : message.senderId;

        // Chỉ lưu tin nhắn mới nhất cho mỗi người dùng
        if (!userLastMessageMap.has(otherUserId)) {
          userLastMessageMap.set(otherUserId, message);
        }
      });

      // 3. Lấy thông tin chi tiết của các người dùng
      const usersRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersRef);

      const usersData = [];

      usersSnapshot.docs.forEach((doc) => {
        const userData = doc.data();

        if (userLastMessageMap.has(doc.id)) {
          usersData.push({
            id: doc.id,
            ...userData,
            lastMessage: userLastMessageMap.get(doc.id),
          });
        }
      });

      // 4. Sắp xếp theo thời gian tin nhắn mới nhất
      usersData.sort((a, b) => {
        const timeA = a.lastMessage.createdAt?.seconds || 0;
        const timeB = b.lastMessage.createdAt?.seconds || 0;
        return timeB - timeA;
      });

      setRecentChats(usersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUserId]);

  return { recentChats, loading };
};

export default useRecentChats;
