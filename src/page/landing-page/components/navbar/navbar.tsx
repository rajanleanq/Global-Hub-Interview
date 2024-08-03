import React from "react";
import logo_img from "../../../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { routes } from "../../../../core/constant/routes";
export default function Navbar() {
  return (
    <Link to={routes?.homepage} className=" border-b  px-6 py-3 sticky top-0 left-0 w-full bg-white z-10 cursor-pointer">
      <img src={logo_img} alt="logo" className="w-32" />
    </Link>
  );
}
