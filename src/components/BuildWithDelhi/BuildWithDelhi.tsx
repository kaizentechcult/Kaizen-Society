import Image from "next/image";
import React from "react";

const teamImages: string[] = [
  "/Team/BWD/img1.jpg",
  "/Team/BWD/img2.jpg",
  "/Team/BWD/img3.jpg",
  "/Team/BWD/img5.jpg",
  "/Team/BWD/img4.jpg",
  "/Team/BWD/img8.jpg",
  "/Team/BWD/img6.jpg",
  "/Team/BWD/img7.jpg",
  "/Team/BWD/img9.jpg",
];

type Props = {};

const BuildWithDelhi = (props: Props) => {
  return (
    <>
      <div className="text-center my-16">
        <h1 className="text-[50px] font-bold">Build With Delhi Hackathon</h1>
        <div className="flex flex-wrap justify-center items-center gap-10">
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

export default BuildWithDelhi;
