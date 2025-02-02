import React from "react";
import DaherLogo from "../images/DaherLogo";
import Navbutton from "./Navbutton";

function Navbar({setOpenNav, openNav}){
    return<>
        <div className={`bg-primary-950 h-screen w-60 h-100 absolute top-0 ${openNav ? "left-0" : "-left-64"} transition-all z-40 shadow-lg`}>
            <button className="right-2 absolute p-1 bg-primary-950" onClick={() => setOpenNav(!openNav)}>
                <i className="fa-solid fa-xmark text-2xl text-white"></i>
            </button>

            <div className="mb-20">
                <DaherLogo></DaherLogo>
                <h1 className="mt-8 text-center text-white font-bold text-4xl select-none font-Pacifico">Daher.Net</h1>
            </div>
        
            <Navbutton buttonText={"Dashboard"} linkDirectory={""} setOpenNav={setOpenNav} openNav={openNav} ></Navbutton>            
            <Navbutton buttonText={"Customers"} linkDirectory={"Customers"} setOpenNav={setOpenNav} openNav={openNav} ></Navbutton>            
            <Navbutton buttonText={"Invoice"} linkDirectory={"Invoice"} setOpenNav={setOpenNav} openNav={openNav} ></Navbutton>

        </div>
    </>
}

export default Navbar;