import React from "react";
import Image from "next/image";
import img from "../../../public/hero.jpg";
import * as motion from "framer-motion/client";

const Hero = () => {
  return (
    <div className="h-screen flex md:flex-row flex-col justify-center items-center gap-20  md:px-64 px-10 ">
      <div className="flex-1 md:flex md:flex-col md:justify-center md:items-center md:gap-10 flex flex-col justify-center items-center sm:gap-6 gap-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-5xl font-bold text-center"
        >
          Kaizen Technical Community
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: 0.25 }}
          className="text-justify"
        >
          As a part of the Institute Technical Council, we aim to provide a
          gateway for the people in our institute to join the coding community.
          We create a platform which allows students to gain assistance and
          mentorship to enhance their coding ability.
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.5 }}
        className="flex-1 hidden md:block"
      >
        <Image className="rounded-2xl w-auto h-auto " src={img} alt="img" />
      </motion.div>
    </div>
  );
};

export default Hero;
