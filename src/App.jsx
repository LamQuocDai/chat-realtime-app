import react from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/login";
import Chat from "./components/chat";
import AuthProvider from "./components/context/authProvider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
