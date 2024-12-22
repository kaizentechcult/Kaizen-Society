"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  label: string;
  to: string;
}

const navlinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Team", to: "/team" },
  { label: "Events", to: "/events-hosted" },
  { label: "Challenges", to: "/challenges" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  return (
    <div className="fixed top-0 w-full z-50">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          width: scrolled ? "80%" : "100%",
          y: scrolled ? 16 : 0,
          borderRadius: scrolled ? "20rem" : "0",
        }}
        transition={{
          duration: 0.5,
          ease: [0.42, 0, 0.58, 1] // easeInOutCubic bezier curve for smoother animation
        }}
        className={`mx-auto transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg max-w-6xl rounded-full"
          : "bg-black w-full"
          }`}
      >
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${scrolled ? "max-w-6xl" : "w-full"}`}>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/logoK.png"
                  alt="logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navlinks.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  <Link
                    href={link.to}
                    className={`text-sm ${scrolled ? "text-gray-800" : "text-white"
                      } hover:text-gray-600 transition-colors duration-200`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleMenu}
              className="md:hidden p-2"
            >
              <div className="w-6 flex flex-col items-end space-y-1.5">
                <motion.span
                  animate={{
                    width: isMenuOpen ? "24px" : "16px",
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 8 : 0,
                  }}
                  className={`h-0.5 ${scrolled ? "bg-gray-800" : "bg-white"
                    } rounded-full origin-center`}
                />
                <motion.span
                  animate={{
                    width: "24px",
                    opacity: isMenuOpen ? 0 : 1,
                  }}
                  className={`h-0.5 ${scrolled ? "bg-gray-800" : "bg-white"
                    } rounded-full`}
                />
                <motion.span
                  animate={{
                    width: isMenuOpen ? "24px" : "20px",
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -8 : 0,
                  }}
                  className={`h-0.5 ${scrolled ? "bg-gray-800" : "bg-white"
                    } rounded-full origin-center`}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-white md:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                {navlinks.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={link.to}
                      onClick={handleMenu}
                      className="text-gray-800 text-lg font-light"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;