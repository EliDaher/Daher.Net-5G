import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbutton({ buttonText, linkDirectory, openNav, setOpenNav }) {
  const location = useLocation();

  // Check if the current path matches the button's link
  const isActive = location.pathname === `/${linkDirectory}`;

  return (
    <div
      className={`mt-2 w-100 ml-auto hover:bg-white text-center transition-all duration-700 ${
        isActive ? "bg-white text-primary" : "bg-primary text-white"
      }`}
      onClick={() => setOpenNav(!openNav)}
    >
      <Link
        to={`/${linkDirectory}`}
        className={`hover:text-primary text-inherit text-2xl font-bold select-none block p-1`}
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default Navbutton;
