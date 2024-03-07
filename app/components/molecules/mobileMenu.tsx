import Image from "next/image";
import { IoClose } from "react-icons/io5";
import logo from "../../assets/logo.webp";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setMobileMenu } from "@/app/redux/slices/reduxMobileMenuSlices";
import { motion } from "framer-motion";

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

const MobileMenu: React.FC = () => {
  const dispatch = useDispatch();
  const show = useSelector((state: any) => state.mobileMenu.data.show);

  const handleClose = () => {
    dispatch(setMobileMenu({ show: false }));
  };

  return (
    show && (
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{
          duration: 0.3,
          ease: "easeInOut", 
        }}
        className="h-screen w-screen fixed right-0 top-0 z-50 bg-slate-100 py-3 px-5 border-b-2 border-gray-200"
      >
        <div className="container mx-auto flex justify-between py-8">
          <Image
            src={logo}
            priority
            alt="CITRAMAS FOUNDATION BATAM"
            height={60}
          />
          <div className="md:hidden flex items-center">
            <IoClose
              onClick={handleClose}
              className="text-custBlack text-4xl cursor-pointer"
            />
          </div>
        </div>
        <div className="container mx-auto flex flex-col gap-3">
          {dataList.map((data, index) => (
            <Link
              href={data.path}
              onClick={handleClose}
              key={index}
              className={`relative whitespace-nowrap group bg-slate-200 hover:bg-slate-300 py-2 px-4 rounded-md text-sm md:text-base`}
            >
              <p>{data.title}</p>
            </Link>
          ))}
        </div>
      </motion.div>
    )
  );
};

export default MobileMenu;
