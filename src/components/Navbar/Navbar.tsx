"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import LoginButton from "../LoginButton";
import { MessageCircle } from "lucide-react";

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

// WhatsApp group link
const WHATSAPP_LINK = "https://chat.whatsapp.com/FuuhxjicCHcFKNY8EOB4wq";

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
          width: scrolled ? "90%" : "100%",
          y: scrolled ? 16 : 0,
          borderRadius: scrolled ? "20rem" : "0",
        }}
        transition={{
          duration: 0.3,
          ease: [0.42, 0, 0.58, 1]
        }}
        className={`mx-auto transition-all duration-300 ${
          scrolled
            ? "bg-zinc-900/60 backdrop-blur-xl shadow-lg rounded-full border-zinc-800/50"
            : "bg-black/60 backdrop-blur-lg"
        }`}
      >
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${scrolled ? "" : "w-full"}`}>
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
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              {/* WhatsApp Link */}
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="md:flex hidden items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Join Group</span>
              </motion.a>
              <LoginButton />
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 md:hidden">
              {/* WhatsApp Link - Mobile */}
              {/* <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.95 }}
                className="p-2 text-emerald-400"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.a> */}
              <LoginButton />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleMenu}
                className="p-2 -mr-2"
              >
                <div className="w-5 flex flex-col items-end space-y-1">
                  <motion.span
                    animate={{
                      width: isMenuOpen ? "20px" : "14px",
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 6 : 0,
                    }}
                    className="h-0.5 bg-white rounded-full origin-center"
                  />
                  <motion.span
                    animate={{
                      width: "20px",
                      opacity: isMenuOpen ? 0 : 1,
                    }}
                    className="h-0.5 bg-white rounded-full"
                  />
                  <motion.span
                    animate={{
                      width: isMenuOpen ? "20px" : "16px",
                      rotate: isMenuOpen ? -45 : 0,
                      y: isMenuOpen ? -6 : 0,
                    }}
                    className="h-0.5 bg-white rounded-full origin-center"
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
              className="fixed inset-x-0 top-[64px] bg-black/80 backdrop-blur-xl md:hidden border-t border-zinc-800/50"
            >
              <div className="relative p-4">
                <div className="space-y-1">
                  {navlinks.map((link, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.to}
                        onClick={handleMenu}
                        className="text-zinc-300 hover:text-white text-base font-light transition-colors block px-4 py-3 rounded-lg hover:bg-white/5"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* WhatsApp Link in Mobile Menu */}
                  <motion.a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: navlinks.length * 0.05 }}
                    onClick={handleMenu}
                    className="flex items-center gap-3 text-emerald-400 px-4 py-3 rounded-lg hover:bg-emerald-500/10 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-base font-light">Join WhatsApp Group</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;