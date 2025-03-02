import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbutton({ buttonText, linkDirectory, openNav, setOpenNav }) {
  const location = useLocation();

  // Ensure compatibility with HashRouter by using location.hash
  const isActive = location.pathname === `/${linkDirectory}` || location.hash === `#/${linkDirectory}`;

  return (
    <div
      className={`mt-2 w-100 ml-auto hover:bg-primary-500 text-center transition-all duration-500 ${
        isActive ? "bg-primary-500 text-white" : "text-white"
      }`}
      onClick={() => setOpenNav(!openNav)}
    >
      <Link
        to={`/${linkDirectory}`}
        className={`hover:text-primary text-inherit text-xl font-bold select-none block p-1`}
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default Navbutton;
