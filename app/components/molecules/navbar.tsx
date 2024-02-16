import { FC } from "react";
import logo from "../../assets/logo.png";
import Image from "next/image";
import CustNavbarList from "../atoms/custNavbarList";

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
  return (
    <div className="cust-container absolute top-0 left-1/2 -translate-x-1/2 w-full border-b border-custWhite/35">
      <div className=" flex justify-between py-8">
        <Image
          src={logo}
          priority
          alt="CITRAMAS FOUNDATION BATAM"
          height={60}
        />
        <div className="flex gap-10 items-center">
            {dataList.map((data, index) => {
            return (
                <CustNavbarList key={index} title={data.title} path={data.path} />
            );
            })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
