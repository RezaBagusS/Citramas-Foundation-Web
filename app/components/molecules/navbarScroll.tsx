'use client'

import logo from "../../assets/logo.png";
import Image from "next/image";
import CustNavbarList from "../atoms/custNavbarList";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setMobileMenu } from "@/app/redux/slices/reduxMobileMenuSlices";

const dataList = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Activity",
    path: "/activity",
  },
  {
    title: "News",
    path: "/news",
  },
  {
    title: "Contact Us",
    path: "/contactus",
  },
];

const NavbarScroll = () => {

    const [scrollY, setScrollY] = useState(0);
    const pathname = usePathname();

    const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(setMobileMenu({ show: true }));
  }

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    },[]);

  return (
    <div className={`w-full fixed bg-slate-100 z-40 transition-all duration-300
        ${pathname == "/" ? scrollY > 120 ? "shadow-md top-0" : "-top-full" : "shadow-md top-0"}
    `}>
      <div className="cust-container flex justify-between py-3">
        <Image
          src={logo}
          priority
          alt="CITRAMAS FOUNDATION BATAM"
          width={100}
          className="h-auto"
        />
        <div className="md:hidden flex items-center">
          <IoMenu onClick={handleOpen} className="text-custBlack text-4xl cursor-pointer" />
        </div>
        <div className="hidden md:flex gap-10 items-center">
          {dataList.map((data, index) => {
            return (
              <CustNavbarList key={index} title={data.title} path={data.path} location="scroll" />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavbarScroll;
