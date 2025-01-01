"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import LoginButton from "../LoginButton";
import { MessageCircle, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const navlinks = [
  { label: "Home", to: "/" },
  { label: "Team", to: "/team" },
  { label: "Events", to: "/events-hosted" },
  { label: "Challenges", to: "/challenges" },
  // { label: "Projects", to: "/projects" },
  // { label: "About", to: "/about" },
];

const LINKTREE_LINK = "https://linktr.ee/kaizen_community";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
          width: scrolled ? "90%" : "100%",
          y: scrolled ? 16 : 0,
          borderRadius: scrolled ? "20rem" : "0",
        }}
        transition={{
          duration: 0.001,
          ease: [0.42, 0, 0.58, 1]
        }}
        className={`mx-auto transition-all duration-300 ${theme === "dark"
            ? scrolled
              ? "bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/50 shadow-lg"
              : "bg-black/60 backdrop-blur-lg border-b border-zinc-800/50"
            : scrolled
              ? "bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-lg"
              : "bg-white/80 backdrop-blur-lg border-b border-gray-200/50"
          }`}
      >
        <div
          className={`mx-auto px-4 sm:px-6 lg:px-8 ${scrolled ? "" : "w-full"}`}
        >
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/kaizenLogo.jpg"
                  alt="logo"
                  width={120}
                  height={20}
                  className="w-[80px] sm:w-[100px] md:w-[120px] rounded-full"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navlinks.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  <Link
                    href={link.to}
                    className={`text-sm font-medium transition-colors duration-200 ${theme === "dark"
                        ? "text-zinc-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {/* WhatsApp Link */}
              <motion.a
                href={LINKTREE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className={`md:flex hidden items-center gap-2 px-4 py-1.5 rounded-full border transition-colors duration-200 ${theme === "dark"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                    : "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
                  }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Join Us</span>
              </motion.a>
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${theme === "dark"
                    ? "text-zinc-400 hover:text-white hover:bg-white/5"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>
              <LoginButton />
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Theme Toggle - Mobile */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${theme === "dark"
                    ? "text-zinc-400 hover:text-white hover:bg-white/5"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>
              <LoginButton />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleMenu}
                className={`p-2 -mr-2 rounded-full transition-colors ${theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-100"
                  }`}
              >
                <div className="w-5 flex flex-col items-end space-y-1">
                  <motion.span
                    animate={{
                      width: isMenuOpen ? "20px" : "14px",
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 6 : 0,
                    }}
                    className={`h-0.5 rounded-full origin-center ${theme === "dark" ? "bg-white" : "bg-gray-900"
                      }`}
                  />
                  <motion.span
                    animate={{
                      width: "20px",
                      opacity: isMenuOpen ? 0 : 1,
                    }}
                    className={`h-0.5 rounded-full ${theme === "dark" ? "bg-white" : "bg-gray-900"
                      }`}
                  />
                  <motion.span
                    animate={{
                      width: isMenuOpen ? "20px" : "16px",
                      rotate: isMenuOpen ? -45 : 0,
                      y: isMenuOpen ? -6 : 0,
                    }}
                    className={`h-0.5 rounded-full origin-center ${theme === "dark" ? "bg-white" : "bg-gray-900"
                      }`}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 top-[64px] md:hidden"
            >
              {/* Backdrop layer */}
              <div
                className={`absolute inset-0 ${theme === "dark"
                    ? "bg-black"
                    : "bg-white"
                  }`}
              />

              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15, delay: 0.1 }}
                className={`relative backdrop-blur-lg border-t ${theme === "dark"
                    ? "bg-black/95 border-zinc-800/50"
                    : "bg-white border-gray-200/50"
                  } `}
              >
                <div className="max-w-6xl mx-auto">
                  <div className="p-4 space-y-1">
                    {navlinks.map((link, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.to}
                          onClick={handleMenu}
                          className={`block px-4 py-3 rounded-lg transition-colors text-base font-medium ${theme === "dark"
                              ? "text-zinc-300 hover:text-white hover:bg-white/5"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
                            }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}

                    {/* Join Us Link in Mobile Menu */}
                    <motion.a
                      href={LINKTREE_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navlinks.length * 0.05 }}
                      onClick={handleMenu}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${theme === "dark"
                          ? "text-emerald-400 hover:bg-emerald-500/10"
                          : "text-emerald-600 hover:bg-emerald-50/50"
                        }`}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-base font-medium">Join Us</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}