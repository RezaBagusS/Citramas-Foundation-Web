"use client";

import SearchField from "../components/molecules/searchField";
import CustListNews from "../components/atoms/custListNews";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { NewsItem } from "@/app/news/page"; // Import interface dari parent jika memungkinkan, atau define ulang

interface LeftSideProps {
  data: NewsItem[]; // Gunakan strict type
}

const LeftSide = ({ data }: LeftSideProps) => {
  // Mengambil keyword dari Redux
  const keyword = useSelector((state: any) => state.keywordSearch.data.keyword);

  // State lokal untuk toggle show more
  const [showMore, setShowMore] = useState(false);
  const ITEMS_LIMIT = 4;

  // ✅ 1. Gunakan useMemo (Hapus useEffect + useState filteredData)
  // Filter hanya akan jalan ulang jika 'data' atau 'keyword' berubah
  const filteredData = useMemo(() => {
    if (!keyword) return data;
    return data.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [data, keyword]);

  // ✅ 2. Slicing data berdasarkan state showMore
  const displayedData = showMore
    ? filteredData
    : filteredData.slice(0, ITEMS_LIMIT);

  // Reset showMore jika user melakukan search baru
  useMemo(() => {
    setShowMore(false);
  }, [keyword]);

  return (
    <div className="flex flex-col h-full">
      <SearchField />

      {/* Info Search */}
      {keyword && (
        <div className="border-b pb-2 text-xs mt-4 text-gray-600">
          Showing results for: <span className="font-semibold text-custPrimary">&quot;{keyword}&quot;</span>
          <span className="ml-2">({filteredData.length} found)</span>
        </div>
      )}

      <div className="py-5 flex flex-col gap-4">
        {displayedData.length === 0 ? (
          <p className="text-center text-gray-500 py-10 italic">
            No news matches &quot;{keyword}&quot;
          </p>
        ) : (
          displayedData.map((item) => (
            // ✅ 3. Gunakan ID sebagai key
            <CustListNews key={item.id} data={item} />
          ))
        )}
      </div>

      {/* ✅ 4. Logic Tombol Show More / Less */}
      {/* Tombol hanya muncul jika total data hasil filter LEBIH BANYAK dari limit */}
      {filteredData.length > ITEMS_LIMIT && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-2 text-custPrimary text-sm font-medium py-2 px-6 bg-slate-50 border border-slate-200 rounded-full hover:bg-slate-100 transition-all w-fit mx-auto"
        >
          {showMore ? "Show Less" : `Show More (${filteredData.length - ITEMS_LIMIT} others)`}
        </button>
      )}
    </div>
  );
};

export default LeftSide;