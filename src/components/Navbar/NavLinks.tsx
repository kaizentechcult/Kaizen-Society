import React from "react";
import Link from "next/link";

type Props = {
  to: string;
  text: string;
  className?: string;
  onClick?: () => void;
};

const NavLinks = (props: Props) => {
  return (
    <Link
      href={props.to}
      className={`hover:text-white   duration-500 ${props.className}`}
      onClick={props.onClick}
    >
      {props.text}
    </Link>
  );
};

export default NavLinks;
