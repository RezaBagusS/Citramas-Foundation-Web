import React, { ReactElement } from "react";
import Link from "next/link";

interface CustCardEndeavourProps {
  title: string;
  icon: ReactElement;
  path: string;
}

const CustCardEndeavour = ({ title, icon, path }: CustCardEndeavourProps) => {
  return (
    <Link href={path} className="relative flex flex-col cursor-pointer gap-2 items-center px-5 py-8 bg-[#1B57A7] hover:bg-[#1b58a7bd] group">
      {icon}
      <h1 className="pointer-events-none text-base absolute top-full group-hover:top-5 text-center text-custWhite transition-all duration-200 w-full h-full p-2 bg-[#1a1141]">{title}</h1>
    </Link>
  );
};

export default CustCardEndeavour;
