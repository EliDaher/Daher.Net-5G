import React from "react"
import Dashboard from "./pages/Dahsboard"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./component/Navbar";
import Invoice from "./pages/Invoice";

function App() {

  return (
    <>
     <Router>
      <main className="flex">
      <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </main>
    </Router>
    </>
  )
}

export default App
