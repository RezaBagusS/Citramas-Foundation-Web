'use client'

import { FC } from "react";
import logo from "../../assets/logo.webp";
import Image from "next/image";
import CustNavbarList from "../atoms/custNavbarList";
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

const Navbar: FC = () => {

  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(setMobileMenu({ show: true }));
  }

  return (
    <div className="cust-container absolute top-0 left-1/2 -translate-x-1/2 w-full border-b border-custWhite/35">
      <div className="flex justify-between py-8">
        <Image
          src={logo}
          priority
          alt="CITRAMAS FOUNDATION BATAM"
          height={60}
          width={120}
        />
        <div className="md:hidden flex items-center">
          <IoMenu onClick={handleOpen} className="text-custWhite text-4xl cursor-pointer" />
        </div>
        <div className="hidden md:flex gap-10 items-center">
            {dataList.map((data, index) => {
            return (
                <CustNavbarList key={index} title={data.title} path={data.path} location={"home"} />
            );
            })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
