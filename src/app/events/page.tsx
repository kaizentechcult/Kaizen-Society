import BuildWithDelhi from "@/components/BuildWithDelhi/BuildWithDelhi";
import KotlinGfg from "@/components/KotlinGfg/KotlinGfg";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <KotlinGfg />
      <BuildWithDelhi />
    </>
  );
};

export default page;
