'use client';

import Image from "next/image";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Github, Linkedin, Instagram } from "lucide-react";

type Props = {
  className?: string;
};

const Footer = (props: Props) => {
  const { theme } = useTheme();

  return (
    <div
      className={`absolute w-full md:px-64 px-4 flex md:flex-row flex-col justify-center items-center md:justify-between py-4 gap-4 md:gap-0 transition-colors ${
        theme === 'dark'
          ? 'bg-black text-white border-t border-zinc-800/50'
          : 'bg-white text-gray-900 border-t border-gray-200'
      } ${props.className ? props.className : ""}`}
    >
      <div className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
        2024 Kaizen Club
      </div>
      <div className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
        Coded with ❤ and ☕ by Kaizen Team
      </div>
      <div className="flex gap-10">
        <a
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
          href="https://github.com/kaizentechcult"
          className={`transition-colors ${
            theme === 'dark'
              ? 'text-zinc-400 hover:text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          href="https://www.linkedin.com/company/kaizen-technical-society/"
          className={`transition-colors ${
            theme === 'dark'
              ? 'text-zinc-400 hover:text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          href="https://www.instagram.com/kaizen_techsoc/"
          className={`transition-colors ${
            theme === 'dark'
              ? 'text-zinc-400 hover:text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Instagram className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
