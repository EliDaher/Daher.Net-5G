import React, { useState } from "react"
import Dashboard from "./pages/Dahsboard"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./component/Navbar";
import Invoice from "./pages/Invoice";
import UserPage from "./pages/UserPage";

function App() {

  const [openNav, setOpenNav] = useState(false)

  return (
    <>
     <Router basename="/Daher.Net-5G">
     <div className="text-white flex items-center justify-between w-full bg-primary h-12">
      <h1 className="ml-5 text-3xl font-bold">Daher.Net</h1>
      <button className="p-3 pb-1 bg-primary" onClick={() => setOpenNav(!openNav)}><span className="material-symbols-outlined">menu</span></button>
     </div>
      <main className="flex max-w-full">
      <Navbar setOpenNav={setOpenNav} openNav={openNav} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/subscriber/:id" element={<UserPage />} />
        </Routes>

      </main>
    </Router>
    </>
  )
}

export default App
