// src/App.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import MainLayout from './components/MainLayout';
import AgeConfirmModal from './components/AgeConfirmModal';
import ScrollToTop from './components/ScrollToTop';

import Home from "./pages/Home";
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import ChatPage from './pages/ChatPage';

// ✅ IMPORT NECESSÁRIO PARA O CLUB POR LINK
import WSCClub from './pages/WSCClub';

export const AuthContext = createContext();

function PrivateRoute({ children }) {
  const { token, user } = useContext(AuthContext);
  return token && user ? children : <Navigate to="/" replace />;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
          setToken(null);
        });
    }
  }, [token]);

  const handleShowPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      <BrowserRouter>
        <ScrollToTop />
        <AgeConfirmModal backgroundImage="/images/bg-try-plans.jpeg" />

        <Routes>
          <Route path="/" element={<MainLayout onShowPopup={handleShowPopup} />}>
            <Route index element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile showPopup={showPopup} setShowPopup={setShowPopup} />
                </PrivateRoute>
              }
            />

            {/* 🔓 CLUB LIBERADO DE LOGIN (PROTEÇÃO É NO WSCClub) */}
            <Route path="/club" element={<WSCClub />} />

            <Route path="/chat" element={<ChatPage />} />
          </Route>

          {/* Página de pagamento */}
          <Route
            path="/payment_checkout.html"
            element={
              <div style={{ width: '100%', height: '100vh', border: 'none' }}>
                <iframe
                  src={`/payment_checkout.html${window.location.search}`}
                  title="Payment Checkout"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 'none' }}
                ></iframe>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
