import react from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/login";
import Chat from "./components/chat";
import AuthProvider from "./components/context/AuthProvider";
import AppProvider from "./components/context/AppProvider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
