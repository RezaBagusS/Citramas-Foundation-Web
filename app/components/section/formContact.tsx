"use client";

import emailHelper from "@/app/helpers/emailHelper";
import CustContactField from "../atoms/custContactField";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setToaster } from "@/app/redux/slices/reduxToasterSlices";
import { FiLoader } from "react-icons/fi";

const FormContact = () => {
  const { register, handleSubmit, reset } = useForm();
  const [whileSubmit, setWhileSubmit] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    handleWhileSubmit();

    let res = await emailHelper({
      data,
    });

    if (res.error) {
      dispatch(setToaster({ message: res.message, show: true }));
      handleWhileSubmit();
    } else {
      dispatch(setToaster({ message: "Sukses Mengirim Pesan!!", show: true }));
      reset();
      handleWhileSubmit();
    }
  };

  const handleWhileSubmit = () => {
    setWhileSubmit((prev) => !prev);
  };

  const resetForm = () => {
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border bg-white drop-shadow-sm rounded-sm p-5 col-span-2 lg:col-span-1"
    >
      <h2 className="text-lg md:text-xl font-semibold text-custBlack">
        Send your messages
      </h2>
      <div className="flex flex-col gap-3 mt-5">
        <CustContactField
          regist={register}
          label="Subject"
          placeholder="Talk to volunteer"
          type="text"
        />
        <CustContactField
          regist={register}
          label="Name"
          placeholder="Ahmad Zainal"
          type="text"
        />
        <CustContactField
          regist={register}
          label="Email"
          placeholder="ahmadzainal@gmail.com"
          type="text"
        />
        <CustContactField
          regist={register}
          label="Message"
          placeholder="I want to ..."
          type="text"
        />
      </div>
      <div className="flex justify-start items-center gap-4 mt-5">
        <button
          disabled={whileSubmit}
          className="bg-custPrimary text-white text-sm md:text-base rounded-md hover:bg-custPrimary/90 py-2 px-4 disabled:cursor-not-allowed disabled:bg-custPrimary/70 transition-all duration-200"
        >
          {whileSubmit ? <FiLoader className="animate-spin text-2xl" /> : "Send"}
        </button>
        <div onClick={resetForm} className="text-custBlack/80 cursor-pointer text-sm md:text-base hover:underline">Reset</div>
      </div>
    </form>
  );
};

export default FormContact;
