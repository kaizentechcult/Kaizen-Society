"use client";
import React from "react";
import NavLinks from "./NavLinks";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface NavLink {
  label: string;
  to: string;
}
const navlinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Team", to: "/team" },

  { label: "Events", to: "/events-hosted" },

  // { label: "Join Us", to: "https://forms.gle/dAGYv4SLC5wkFvxq9" },
];

const Navbar = () => {
  const handleMenu = () => {
    const menu = document.querySelector(".menu");
    const body = document.querySelector("body");
    // if (menu) {
    menu?.classList.toggle("hidden");
    body?.classList.toggle("overflow-hidden");
    // }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-50 w-full bg-[#1F2937] text-white flex md:flex-row flex-col justify-between md:px-64 px-4 h-[3.5rem] items-center navbar absolute top-0"
      >
        <div className="flex justify-between w-full mt-4 md:mt-0">
          <div className="logo">
            <Link href="/">
              <Image src="/LogoK.svg" alt="logo" width={16} height={16} />
            </Link>
          </div>
          <button className="md:hidden" onClick={handleMenu}>
            <Image src={"/icons/menu.svg"} alt="menu" width={25} height={25} />
          </button>
        </div>
        <div className="menu hidden w-full h-screen absolute top-0 right-0 bg-[#ffffff91] backdrop-blur-lg justify-center items-center">
          <div className="flex flex-col text-black w-full h-screen items-center justify-center gap-20">
            {navlinks.map((link: any, index: number) => (
              <NavLinks
                text={link.label}
                className="mb-3 md:mb-0 text-xl md:text-md font-bold"
                key={index}
                to={link.to}
                onClick={handleMenu}
              />
            ))}
          </div>
        </div>
        <div className="navlinks hidden flex-col md:flex md:flex-row md:gap-10 md:p-4 w-full md:w-auto">
          {navlinks.map((link: any, index: number) => (
            <NavLinks
              text={link.label}
              className="mb-3 md:mb-0"
              key={index}
              to={link.to}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
