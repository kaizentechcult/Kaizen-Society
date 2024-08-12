import Image from "next/image";
import React from "react";

type Props = {
  name: string;
  post: string;
  img: string;
  github?: string;
  linkedin?: string;
};

const Member = (props: Props) => {
  return (
    <div className="flex items-center p-8 sm:w-2/5 w-full lg:w-[31%] border border-gray-800 m-4 rounded-lg">
      <div className="flex items-center">
        {/* <LazyLoadImage
          src={img}
          alt="img"
          effect="blur"
          width={112}
          className="rounded-full"
        /> */}
        {/* <img src={props.img} alt="img" /> */}
        <Image src={props.img} alt="img" width={150} height={150} className="rounded-full"/>
      </div>
      <div className="text-center flex flex-col gap-2 md:items-center justify-end md:justify-center w-full">
        <p className="font-semibold">{props.name}</p>
        {/* <p className="font-semibold">Coding Club</p> */}
        <p className="text-gray-900">{props.post}</p>
        <div className="flex gap-10 justify-center">
          {props.github && (
            <a target="_blank" aria-label="Github" href={props.github}>
              <img alt="github" src="icons/github.svg" />
            </a>
          )}
          {props.linkedin && (
            <a target="_blank" aria-label="Linkedin" href={props.linkedin}>
              <img alt="linkedin" src="icons/linkedin.svg" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Member;
