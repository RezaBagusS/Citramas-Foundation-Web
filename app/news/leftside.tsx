"use client";

import SearchField from "../components/molecules/searchField";
import CustListNews from "../components/atoms/custListNews";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

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
    const [filteredData, setFilteredData] = useState<any[]>([]); 
    const [showMore, setShowMore] = useState(false); 
  
    const handleShowMore = () => {
      setShowMore((prevShowMore) => !prevShowMore); 
    };
  
    useEffect(() => {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredData(filtered);
    }, [data, keyword]);
  
    const slicedData = showMore ? filteredData : filteredData.slice(0, 4);

  return (
    <>
      <SearchField />
      <div className="border-b pb-2 text-xs mt-4">
        Search : <span className="font-semibold">{keyword}</span>
      </div>
      <div className="py-5 flex flex-col gap-3">
      {slicedData.map((item, index) => {
        return <CustListNews key={index} data={item} />;
      })}
      {slicedData.length < filteredData.length && (
        <button className="text-custPrimary text-xs sm:text-sm md:text-base font-medium py-1 px-4 bg-slate-100 w-fit mx-auto border-1" onClick={handleShowMore}>
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
    </>
  );
};

export default LeftSide;
