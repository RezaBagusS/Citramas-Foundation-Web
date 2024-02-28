'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface CustNavbarListProps {
    title: string;
    path: string;
}

const CustNavbarList = ({title, path}:CustNavbarListProps) => {

  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {

    const handlePath = () => {
      if (pathname == path) {
        return setIsActive(true);
      }
  
      return setIsActive(false);
    }

    handlePath()

  },[pathname, path])

  return (
    <Link href={path} className="relative text-custWhite whitespace-nowrap hover:text-custWhite/70 group">
        <p>{title}</p>
        <span className={`absolute -bottom-2 bg-custPrimary h-1 rounded-full group-hover:w-full transition-all duration-300
        ${isActive ? "w-full" : "w-0"}
        `}></span>
    </Link>
  );
};

export default CustNavbarList;
