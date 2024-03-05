"use client";

import { useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { setKeyword } from "@/app/redux/slices/reduxKeywordSearchSlices";

const SearchField = () => {
  const dispatch = useDispatch();

  const handleSearch = (e: any) => {
    console.log(e.target.value);
    setTimeout(() => {
      dispatch(setKeyword({ keyword: e.target.value }));
    }, 1000);
  };

  return (
    <div className="w-full flex items-center relative rounded-full overflow-hidden">
      <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        onChange={handleSearch}
        className="w-full bg-slate-100 ps-14 text-sm pe-4 py-3 active:outline-none focus:outline-none"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchField;
