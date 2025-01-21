import React from "react";
import DaherLogo from "../images/DaherLogo";
import Navbutton from "./Navbutton";

function Navbar(){
    return<>
        <div className="bg-primary h-screen w-60">
            <div className="mb-20">
                <DaherLogo></DaherLogo>
                <h1 className="mt-6 text-center text-white font-bold text-4xl select-none">Daher.Net</h1>
            </div>
            
            <Navbutton buttonText={"Dashboard"} linkDirectory={""}></Navbutton>            
            <Navbutton buttonText={"Invoice"} linkDirectory={"Invoice"}></Navbutton>

        </div>
    </>
}

export default Navbar;