// Hàm định dạng thời gian an toàn
export const formatTime = (timestamp) => {
  if (!timestamp) return ""; // Nếu timestamp là null hoặc undefined

  // Kiểm tra các kiểu timestamp khác nhau
  let date;

  // Kiểm tra nếu là Firestore Timestamp
  if (timestamp && typeof timestamp.toDate === "function") {
    date = timestamp.toDate();
  }
  // Nếu là timestamp Unix (số)
  else if (typeof timestamp === "number") {
    date = new Date(timestamp);
  }
  // Nếu đã là Date object
  else if (timestamp instanceof Date) {
    date = timestamp;
  }
  // Trường hợp khác - có thể không xử lý được
  else {
    console.log("Unknown timestamp format:", timestamp);
    return "";
  }

  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
