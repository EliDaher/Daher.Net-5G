import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Invoice from "./pages/Invoice";
import UserPage from "./pages/UserPage";
import Login from "./pages/Login";
import Navbar from "./component/Navbar";
import { useAuth } from "./context/AuthContext";

function App() {
  const [openNav, setOpenNav] = useState(false);
  const { user } = useAuth();

  const AppRoutes = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    if (!user) {
      return <Login />;
    }

    return (
      <>
        {/* Navbar */}
        <div className="text-white flex items-center justify-between w-full bg-primary-950 h-12">
          <h1 className="ml-5 text-3xl font-bold font-Pacifico">Daher.Net</h1>
          <h5 className="text-xl opacity-30 select-none text-text-100">{user.name}</h5>
          <button
            className="p-3 pb-1 bg-transparent"
            onClick={() => {
              setOpenNav(!openNav);
            }}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

        {/* Main Layout */}
        <main className="flex max-w-full">
          <Navbar setOpenNav={setOpenNav} openNav={openNav} />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/subscriber/:id" element={<UserPage />} />
            <Route path="*" element={<Navigate to={`${user.role == "admin"? "/dashboard" : "/invoice"}`} />} /> {/* Redirect unknown routes */}
          </Routes>
        </main>
      </>
    );
  };

  return (
    <Router basename="/Daher.Net-5G/">
      <AppRoutes />
    </Router>
  );
}

export default App;
