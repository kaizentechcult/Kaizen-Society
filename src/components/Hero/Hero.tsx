import React from "react";
import Image from "next/image";
import img from "../../../public/hero.jpg";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="md:px-64 px-4">
      <div className="hero md:h-screen relative flex md:flex-row flex-col lg:flex-row overflow-hidden py-10">
        <div className="left w-full flex flex-col md:gap-10 justify-center text-center md:text-left items-center md:items-start gap-10 py-10 md:py-0">
          <h1 className="font-sans text-5xl md:text-[64px]  font-semibold md:leading-[4rem]">
            Kaizen Technical <br /> Community
          </h1>
          <p className="md:text-xl w-5/6">
            As a part of the Institute Technical Council, we aim to provide a
            gateway for the people in our institute to join the coding
            community. We create a platform which allows students to gain
            assistance and mentorship to enhance their coding ability.
          </p>
        </div>
        <div className="right w-full flex justify-end rounded-3xl items-center md:hidden">
          <Image src={img} alt="img" width={400} height={300} />
        </div>
        <div className="right w-full md:flex justify-end rounded-3xl items-center hidden">
          <Image
            className="rounded-2xl"
            src={img}
            alt="img"
            width={600}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
