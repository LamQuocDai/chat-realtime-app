import react from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/login";
import Chat from "./components/chat";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
