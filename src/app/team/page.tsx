"use client";
import React, { useEffect, useState } from "react";
import Member from "@/components/Member/Member";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";

type MemberType = {
  _id: string;
  name: string;
  img: string;
  github: string;
  linkedin: string;
  position: string;
  __v: number;
};

const Page = () => {
  const [membersData, setMembersData] = useState<MemberType[]>([]);

  useEffect(() => {
    fetch("/api/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMembersData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="md:px-64 px-4 flex md:flex-row flex-col justify-between items-center py-10 md:py-0 gap-8 md:gap-0 mt-16">
        <div className="left text-center md:text-start mt-12">
          <h1 className="text-5xl sm:text-5xl">Meet the</h1>
          <h1 className="text-5xl sm:text-5xl text-primary-default tracking-wide text-[#4763b7]">
            Kaizen Club Team
          </h1>
          <p className="mt-4 md:mt-8 text-xl text-gray-500 md:text-xl md:pr-24 lg:pr-20 font-light leading-tight tracking-tight text-justify w-1/2">
            Individual commitment to a group effort that is what makes a team
            work, a company work, a society work, a civilisation work.
          </p>
        </div>
        <div className="right right-0 md:absolute -z-50 mt-24 md:w-[40%]">
          <Image
            src="Hero/aboutus.svg"
            alt="Kaizen Club Team"
            width={500}
            height={300}
            loading="eager"
            priority
          />
        </div>
      </div>
      <div className="text-center flex flex-col gap-6">
        <h1 className="text-3xl font-bold md:text-4xl mt-8 md:mt-[10rem] text-[#004263]">
          Meet the Dream Team
        </h1>
        <p className="text-base text-gray-700 md:text-lg font-light">
          &quot;Talent wins games, but teamwork and intelligence win
          championships.&quot;
        </p>
        <p className="font-bold tracking-wider">- Michael Jordan</p>
      </div>
      <div className="flex flex-wrap justify-center items-center md:px-6 px-4 py-20 w-11/12 m-auto">
        {membersData.map((member) => (
          <Member key={member._id} {...member} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Page;
