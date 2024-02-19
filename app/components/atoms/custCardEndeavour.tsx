import React, { ReactElement } from "react";

interface CustCardEndeavourProps {
  title: string;
  icon: ReactElement;
}

const CustCardEndeavour = ({ title, icon }: CustCardEndeavourProps) => {
  return (
    <div className="relative flex flex-col cursor-pointer gap-2 items-center px-5 py-8 bg-[#1B57A7] hover:bg-[#1b58a7bd] group">
      {icon}
      <h1 className="pointer-events-none text-base absolute top-full group-hover:top-5 text-center text-custWhite transition-all duration-200 w-full h-full p-2 bg-[#1a1141]">{title}</h1>
    </div>
  );
};

export default CustCardEndeavour;
