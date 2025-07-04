import React, { useState } from "react";
import { NavLink } from "react-router";
import menuIcon from '../assets/images/menu.svg';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[rgba(0,0,0,0.19)] text-black px-6 py-4 shadow-sm relative">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold">One211</h1>

        {/* Hamburger Icon - visible on mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl focus:outline-none">
          <img src={menuIcon} alt="☰" />
        </button>

        {/* Menu for medium and up */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center justify-between gap-8">
            <li>
              <NavLink
                to="/"
                className="border-b-2 border-transparent pb-1 hover:border-b-2 hover:border-black focus:border-b-2 focus:border-black  transition ease-in duration-300">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/About"
                className="border-b-2 border-transparent pb-1 hover:border-b-2 hover:border-black focus:border-b-2 focus:border-black  transition ease-in duration-300">
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Contact"
                className="border-b-2 border-transparent pb-1 hover:border-b-2 hover:border-black focus:border-b-2 focus:border-black transition ease-in duration-300">
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="buttons flex items-center justify-between gap-5">
            <NavLink
              to="/Login">
              <button className="bg-black text-white border-1 border-black p-2 w-20 text-center rounded-sm hover:bg-white hover:text-black transition ease-in duration-300 cursor-pointer">
                Login
              </button>
            </NavLink>
            <NavLink
              to="/Signup">
              <button className="bg-black text-white border-1 border-black p-2 w-20 text-center rounded-sm hover:bg-white hover:text-black transition ease-in duration-300 cursor-pointer ">
                Signup
              </button>
            </NavLink>
            <NavLink
              to="/Administration">
              <button className="bg-black text-white border-1 border-black p-2 w-20 text-center rounded-sm hover:bg-white hover:text-black transition ease-in duration-300 cursor-pointer">
                Admin
              </button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 absolute top-9 right-6 w-3xs rounded-xs bg-gray-100 shadow-lg p-6 z-10">
          <ul className="flex flex-col gap-3">
            <li>
              <NavLink
                to="/"
                className="block hover:underline"
                onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/About"
                className="block hover:underline"
                onClick={() => setMenuOpen(false)}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Contact"
                className="block hover:underline"
                onClick={() => setMenuOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="flex flex-col gap-3">
            <NavLink to="/Login">
              <button
                className="w-full bg-black text-white px-4 py-2 rounded-sm hover:bg-white hover:text-black transition"
                onClick={() => setMenuOpen(false)}>
                Login
              </button>
            </NavLink>
            <NavLink to="/Signup">
              <button
                className="w-full bg-black text-white px-4 py-2 rounded-sm hover:bg-white hover:text-black transition"
                onClick={() => setMenuOpen(false)}>
                Signup
              </button>
            </NavLink>
            <NavLink to="/Administration">
              <button
                className="w-full bg-black text-white px-4 py-2 rounded-sm hover:bg-white hover:text-black transition"
                onClick={() => setMenuOpen(false)}>
                Admin
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
