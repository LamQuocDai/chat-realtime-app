import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
  or,
  getDocs,
} from "firebase/firestore";

/**
 * Hook trả về danh sách người dùng đã từng nhắn tin với người dùng hiện tại
 */
const useChatUsers = (currentUserId) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUserId) {
      setUsers([]);
      setLoading(false);
      return;
    }

    const fetchChatUsers = async () => {
      try {
        setLoading(true);

        // Query tất cả tin nhắn mà người dùng hiện tại đã gửi hoặc nhận
        const messagesRef = collection(db, "messages");
        const q = query(
          messagesRef,
          or(
            where("senderId", "==", currentUserId),
            where("receiverId", "==", currentUserId)
          )
        );

        const querySnapshot = await getDocs(q);

        // Tạo một Set để lưu trữ các ID người dùng duy nhất
        const userIds = new Set();

        // Lặp qua tất cả tin nhắn và thêm ID người dùng vào Set
        querySnapshot.forEach((doc) => {
          const message = doc.data();

          // Thêm người gửi (nếu không phải là người dùng hiện tại)
          if (message.senderId !== currentUserId) {
            userIds.add(message.senderId);
          }

          // Thêm người nhận (nếu không phải là người dùng hiện tại)
          if (message.receiverId !== currentUserId) {
            userIds.add(message.receiverId);
          }
        });

        // Chuyển đổi Set thành mảng
        const uniqueUserIds = Array.from(userIds);

        if (uniqueUserIds.length === 0) {
          setUsers([]);
          setLoading(false);
          return;
        }

        // Lấy thông tin chi tiết của từng người dùng
        const usersRef = collection(db, "users");

        // Listen for real-time updates on these users
        const unsubscribe = onSnapshot(
          usersRef,
          (snapshot) => {
            const usersData = snapshot.docs
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
              .filter((user) => uniqueUserIds.includes(user.id));

            setUsers(usersData);
            setLoading(false);
          },
          (error) => {
            console.error("Error getting chat users:", error);
            setLoading(false);
          }
        );

        return unsubscribe;
      } catch (error) {
        console.error("Error in useChatUsers:", error);
        setLoading(false);
      }
    };

    fetchChatUsers();
  }, [currentUserId]);

  return { users, loading };
};

export default useChatUsers;
