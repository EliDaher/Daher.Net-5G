import React from "react";
import DaherLogo from "../images/DaherLogo";
import Navbutton from "./Navbutton";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



function Navbar({setOpenNav, openNav}){
    const { logout, user } = useAuth();

    return<>
        <div className={`bg-primary-950 bg-gradient-to-br from-primary-800 via-primary-600 to-secondary-500 h-screen w-60 absolute top-0 ${openNav ? "left-0" : "-left-64"} transition-all z-40 shadow-lg`}>
            <button className="right-2 absolute p-1 bg-transparent" onClick={() => setOpenNav(!openNav)}>
                <i className="fa-solid fa-xmark text-2xl text-white"></i>
            </button>

            <div className="mb-10 mt-5">
                <DaherLogo></DaherLogo>
                <h1 className="mt-8 text-center text-white font-bold text-4xl select-none font-Pacifico">Daher.Net</h1>
            </div>
        
            <div className={`${user.role != "admin"? "hidden" : "block"}`}>
                <Navbutton buttonText={"Dashboard"} linkDirectory={"Dashboard"} setOpenNav={setOpenNav} openNav={openNav} ></Navbutton>            
            </div>
            <div className={`${(user.role != "admin" && user.role != "dealer") ? "hidden" : "block"}`}>
                <Navbutton buttonText={"Customers"} linkDirectory={"Customers"} setOpenNav={setOpenNav} openNav={openNav} ></Navbutton>            
            </div>
            <div className={`${user.role == "dealer" ? "hidden" : "block"}`}>
                <Navbutton buttonText={"Invoice"} linkDirectory={"Invoice"} setOpenNav={setOpenNav} openNav={openNav} ></Navbutton>
            </div>
            <div className={`${user.role == "dealer" ? "hidden" : "block"}`}>
                <Navbutton buttonText={"My Balance"} linkDirectory={"myBalance"} setOpenNav={setOpenNav} openNav={openNav} ></Navbutton>
            </div>
            <div className={`${user.role != "admin"? "hidden" : "block"}`}>
                <Navbutton buttonText={"Balance"} linkDirectory={"balance"} setOpenNav={setOpenNav} openNav={openNav} ></Navbutton>            
            </div>
            <div className={`${user.role != "admin" && user.role != "employee" ? "hidden" : "block"}`}>
                <Navbutton buttonText={"Financial statement"} linkDirectory={"FinancialStatement"} setOpenNav={setOpenNav} openNav={openNav} ></Navbutton>            
            </div>
            
            <div onClick={()=> logout()} className="w-20 text-center p-1 px-2 border border-primary-800 shadow shadow-primary-900 absolute bottom-2 left-1/3 font-bold text-text-100 rounded-lg hover:bg-primary-800">
                <Link to={"/login"}>
                    Logout
                </Link>
            </div>
        </div>
    </>
}

export default Navbar;