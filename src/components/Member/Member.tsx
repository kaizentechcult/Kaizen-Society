import Image from "next/image";
import React from "react";

const Member = (membersData: any) => {
  return (
    <div className="flex items-center p-4 sm:w-2/5 w-full md:w-[20rem] border border-gray-200 m-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">
      <div className="flex items-center mr-4">
        <Image
          src={membersData.img}
          alt="img"
          width={150}
          height={150}
          className="rounded-full object-cover border-2 border-blue-50"
        />
      </div>
      <div className="text-center flex flex-col gap-2 md:items-center justify-end md:justify-center w-full">
        <p className="font-semibold text-gray-800 text-base">
          {membersData.name}
        </p>
        <p className="text-gray-600 text-sm">{membersData.position}</p>
        <div className="flex gap-10 justify-center">
          {membersData.github && (
            <a
              target="_blank"
              aria-label="Github"
              href={membersData.github}
              className="hover:opacity-75 transition-opacity"
            >
              <Image
                src={"icons/github.svg"}
                alt="github"
                width={20}
                height={20}
              />
            </a>
          )}
          {membersData.linkedin && (
            <a
              target="_blank"
              aria-label="Linkedin"
              href={membersData.linkedin}
              className="hover:opacity-75 transition-opacity"
            >
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
