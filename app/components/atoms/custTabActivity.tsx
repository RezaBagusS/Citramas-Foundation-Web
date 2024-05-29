import React from "react";

interface CustTabActivityProps {
  text: string;
  isActive: string;
  handleActive: (title: string) => void;
}

const CustTabActivity = ({
  text,
  isActive,
  handleActive,
}: CustTabActivityProps) => {

  const isSame = () => {
    
    return isActive.replace(/ /g, "-").toLowerCase() === text.replace(/ /g, "-").toLowerCase();
  }

  return (
    <div
      onClick={() => handleActive(text)}
      className={`relative w-full text-sm flex overflow-hidden items-center gap-5 p-5 z-30 bg-white hover:bg-gray-50 cursor-pointer border drop-shadow-sm hover:drop-shadow-md rounded-md transition-all duration-150
        ${isSame() ? "border-gray-300" : ""}
      `}
    >
      {text}
        <span className={`absolute top-0 rounded-bl-md text-xs bg-custPrimary text-white px-3 py-1 transition-all duration-200
            ${isSame() ? "right-0" : "-right-20"}
        `}>
          show
        </span>
    </div>
  );
};

export default CustTabActivity;
