// Hàm định dạng thời gian an toàn
export const formatTime = (timestamp) => {
  if (!timestamp) return "";

  try {
    // Nếu là Firestore timestamp
    if (timestamp && typeof timestamp.toDate === "function") {
      return timestamp.toDate().toLocaleTimeString();
    }

    // Nếu là Unix timestamp (seconds)
    if (typeof timestamp === "number" && timestamp < 2000000000) {
      return new Date(timestamp * 1000).toLocaleTimeString();
    }

    // Nếu là milliseconds
    return new Date(timestamp).toLocaleTimeString();
  } catch (error) {
    console.error("Error formatting date:", error, timestamp);
    return "Thời gian không hợp lệ";
  }
};
