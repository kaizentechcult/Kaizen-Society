import React from "react";
import Image from "next/image";
import img from "../../../public/hero.jpg";

const Hero = () => {
  return (
    <div className="pt-56 bg-white flex md:flex-row flex-col justify-center items-center gap-20  md:px-64 px-10 ">
      <div className="flex-1 md:flex md:flex-col md:justify-center md:items-center md:gap-10 flex flex-col justify-center items-center sm:gap-6 gap-4">
        <h1 className="text-5xl font-bold text-center">
          Kaizen Technical Community
        </h1>
        <p className="text-justify">
          As a part of the Institute Technical Council, we aim to provide a
          gateway for the people in our institute to join the coding community.
          We create a platform which allows students to gain assistance and
          mentorship to enhance their coding ability.
        </p>
      </div>
      <div className="flex-1 hidden md:block">
        <Image className="rounded-2xl w-auto h-auto " src={img} alt="img" />
      </div>
    </div>
  );
};

export default Hero;

