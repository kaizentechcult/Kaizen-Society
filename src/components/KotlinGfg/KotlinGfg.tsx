import Image from "next/image";
import React from "react";

const teamImages: string[] = [
  "/Team/KotlinGFG/img1.jpg",
  "/Team/KotlinGFG/img2.jpg",
  "/Team/KotlinGFG/img3.jpg",
  "/Team/KotlinGFG/img5.jpg",
  "/Team/KotlinGFG/img4.jpg",
  "/Team/KotlinGFG/img8.jpg",
  "/Team/KotlinGFG/img6.jpg",
  "/Team/KotlinGFG/img7.jpg",
  "/Team/KotlinGFG/img9.jpg",
];

type Props = {};

const KotlinGfg = (props: Props) => {
  return (
    <>
      <div className="text-center my-16">
        <h1 className="text-[50px] font-bold  p-8">Kotlin GFG Meetup</h1>
        <div className="flex flex-wrap justify-center items-center gap-10 mx-10 md:m-0">
          {teamImages.map((img, index) => (
            <Image
              src={img}
              alt="img"
              key={index}
              width={450}
              height={300}
              className="object-cover w-[450px] h-[300px]"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default KotlinGfg;
