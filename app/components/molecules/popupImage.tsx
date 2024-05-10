"use client";

import { setOpenImage } from "@/app/redux/slices/reduxOpenImageSlices";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";


const PopupImage = () => {
  const dataPopupImage = useSelector((state: any) => state.openImage.data);
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(setOpenImage({
        show: false,
        url: "",
    }))
  };

  return (
    dataPopupImage.show && (
      <div className="w-screen h-screen fixed overflow-hidden flex justify-center items-center bg-black/70 z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
          className="w-10/12 h-screen py-10 flex items-center justify-center"
        >
            <span 
            onClick={handleCancel}
            className="text-3xl absolute top-4 right-8 bg-slate-200/30 hover:bg-slate-200/20 transition-all duration-200 flex justify-center items-center cursor-pointer w-10 h-10 rounded-full">
                x
            </span>
            <Image src={dataPopupImage.url} alt="image" height={100} width={400} className="w-auto h-full" />
        </motion.div>
      </div>
    )
  );
};

export default PopupImage;