// import React from "react";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

// const Footer = () => {
//   return (
//     <>

//     </>
//   );
// };

// export default Footer;

import Image from "next/image";
import React from "react";

type Props = {
  className?: string;
};

const Footer = (props: Props) => {
  return (
    <>
      <div
        className={`absolute w-full md:px-64 px-4 flex md:flex-row flex-col justify-center items-center md:justify-between py-4  bg-[#f3f4f6] gap-4 md:gap-0 ${
          props.className ? props.className : ""
        }`}
      >
        <div>2024 Kaizen Club </div>
        <div>Coded with ❤ and ☕ by Kaizen Team</div>
        <div className=" flex gap-10">
          <a
            target="_blank"
            aria-label="Github"
            href="https://github.com/kaizentechcult"
          >
            <Image
              src={"icons/github.svg"}
              alt="github"
              width={20}
              height={20}
            />
          </a>
          <a
            target="_blank"
            aria-label="LinkedIn"
            href="https://www.linkedin.com/company/kaizen-technical-society/"
          >
            <Image
              src={"icons/linkedin.svg"}
              alt="linkedin"
              width={20}
              height={20}
            />
          </a>
          <a
            target="_blank"
            aria-label="Instagram"
            href="https://www.instagram.com/tech_with_kaizen_"
          >
            <Image
              src={"icons/instagram.svg"}
              alt="linkedin"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
