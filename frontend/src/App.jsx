import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AjustesPage from "./pages/AjustesPage";
import PerfilPage from "./pages/PerfilPage"

import { Route, Routes, Navigate } from "react-router";
import { estadoAuth } from "./estados/estadoAuth";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { estadoTheme } from "./estados/estadoTheme"

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = estadoAuth();
  console.log({ onlineUsers });
  const { theme } = estadoTheme();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });

  // Loader 
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );


  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register" element={!authUser ? <RegisterPage /> : <Navigate to="/" />} />
        <Route path="/ajustes" element={<AjustesPage />} />
        <Route path="/perfil" element={authUser ? <PerfilPage /> : <Navigate to="/login" />} />

      </Routes>
      <Toaster />
    </div>
  )
}
export default App;