import React, { useState } from "react";
import { HashRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Invoice from "./pages/Invoice";
import UserPage from "./pages/UserPage";
import Login from "./pages/Login";
import Balance from "./pages/Balance";
import EmployeeBalance from "./pages/EmployeeBalance";
import FinancialStatement from "./pages/FinancialStatement";
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
        <div className="fixed top-0 text-white flex items-center justify-between w-full bg-primary-950 h-12 z-40">
          <h1 className="ml-5 text-3xl font-bold font-Pacifico">Daher.Net</h1>
          <h5 className="text-xl opacity-30 select-none text-text-100">{user.username}</h5>
          <button
            type="button"
            className="p-3 pb-1 bg-transparent"
            onClick={() => {
              setOpenNav(!openNav);
            }}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

        {/* Main Layout */}
        <main className="flex max-w-full mt-12 overflow-y-scroll scrollbar-hide">
          <Navbar setOpenNav={setOpenNav} openNav={openNav} />
          <Routes>
            <Route path="/balance" element={<Balance />} />
            <Route path="/myBalance" element={<EmployeeBalance />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/FinancialStatement" element={<FinancialStatement />} />
            <Route path="/subscriber/:id" element={<UserPage />} />
          </Routes>
        </main>
      </>
    );
  };

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
