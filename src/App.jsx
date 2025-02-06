import React, { useState } from "react"
import Dashboard from "./pages/Dashboard"
import Customers from "./pages/Customers"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./component/Navbar";
import Invoice from "./pages/Invoice";
import UserPage from "./pages/UserPage";

function App() {

  const [openNav, setOpenNav] = useState(false)

  return (
    <>
     <Router basename="/Daher.Net-5G">
     <div className="text-white flex items-center justify-between w-full bg-primary-950 h-12">
      <h1 className="ml-5 text-3xl font-bold font-Pacifico">Daher.Net</h1>
      <button className="p-3 pb-1 bg-transparent" onClick={() => setOpenNav(!openNav)}><span className="material-symbols-outlined">menu</span></button>
     </div>
      <main className="flex max-w-full">
      <Navbar setOpenNav={setOpenNav} openNav={openNav} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Customers" element={<Customers />} />
          <Route path="/Invoice" element={<Invoice />} />
          <Route path="/subscriber/:id" element={<UserPage />} />
        </Routes>

      </main>
    </Router>
    </>
  )
}

export default App
