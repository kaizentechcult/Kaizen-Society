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
    <div className="flex items-center p-4 sm:w-2/5 w-full md:w-[20rem] border border-[#e5e7eb] m-4 rounded-lg">
      <div className="flex items-center">
        <Image
          src={props.img}
          alt="img"
          width={150}
          height={150}
          className="rounded-full"
        />
      </div>
      <div className="text-center flex flex-col gap-2 md:items-center justify-end md:justify-center w-full">
        <p className="font-semibold">{props.name}</p>
        <p className="text-gray-900">{props.post}</p>
        <div className="flex gap-10 justify-center">
          {props.github && (
            <a target="_blank" aria-label="Github" href={props.github}>
              <Image
                src={"icons/github.svg"}
                alt="github"
                width={20}
                height={20}
              />
            </a>
          )}
          {props.linkedin && (
            <a target="_blank" aria-label="Linkedin" href={props.linkedin}>
              <Image
                src={"icons/linkedin.svg"}
                alt="linkedin"
                width={20}
                height={20}
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Member;
