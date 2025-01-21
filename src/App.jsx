import React from "react"
import Dashboard from "./pages/Dahsboard"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./component/Navbar";
import Invoice from "./pages/Invoice";
import UserPage from "./pages/UserPage";

function App() {

  return (
    <>
     <Router basename="/Daher.Net-5G">
      <main className="flex max-w-full">
      <Navbar />
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
