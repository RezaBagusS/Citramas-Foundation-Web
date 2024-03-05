"use client";

import SearchField from "../components/molecules/searchField";
import CustListNews from "../components/atoms/custListNews";
import { useSelector } from "react-redux";

interface LeftSideProps {
  data: {
    id: number;
    title: string;
    description: string;
    date: Date | null;
    note: string | null;
    path: string;
  }[];
}

const LeftSide = ({ data }: LeftSideProps) => {
  const keyword = useSelector((state: any) => state.keywordSearch.data.keyword);

  const filteredData = data.filter((item) => {
    return item.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <>
      <SearchField />
      <div className="border-b pb-2 text-xs mt-4">
        Search : <span className="font-semibold">{keyword}</span>
      </div>
      <div className="py-5 flex flex-col gap-3">
        {filteredData.map((item, index) => {
          return <CustListNews key={index} data={item} />;
        })}
      </div>
    </>
  );
};

export default LeftSide;
