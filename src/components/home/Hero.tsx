"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const gradientVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const shimmerVariants = {
  initial: {
    backgroundPosition: "0 0",
  },
  animate: {
    backgroundPosition: "100% 100%",
    transition: {
      repeat: Infinity,
      repeatType: "reverse" as const,
      duration: 3,
    },
  },
};

export default function Hero() {
  const { theme } = useTheme();

  return (
    <motion.div
      variants={shimmerVariants}
      initial="initial"
      animate="animate"
      className="relative flex place-items-center"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
      />
      <motion.h1 className="text-5xl sm:text-7xl font-bold text-center mb-8">
        Building the Future{" "}
        <motion.span
          className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 text-transparent bg-clip-text"
          animate={{
            backgroundPosition: ["0%", "100%"],
            transition: {
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          style={{ backgroundSize: "200%" }}
        >
          Together
        </motion.span>
      </motion.h1>
    </motion.div>
  );
}
