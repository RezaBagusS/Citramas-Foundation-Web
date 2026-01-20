'use client'

import React, { useEffect, useState } from "react";
import CustBannerPage from "../components/atoms/custBannerPage";
import banner from "@/app/assets/news-banner.webp";
import Calendar from "../components/molecules/calendar";
import LeftSide from "./leftside";

// Definisikan Interface di sini atau import dari types global
export interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: Date | string; // Handle kemungkinan string dari API
  note: string | null;
  path: string;
}

const Page: React.FC = () => {
  const [dataNews, setDataNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/v1/newsList`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // "Access-Control-Allow-Origin": "*", // Biasanya tidak perlu di client side fetch nextjs
                "Cache-Control": "no-cache",
            },
        });
        
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data = await res.json();
        setDataNews(data.data || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full relative pt-[69px]">
      <div className="drop-shadow-sm">
        <CustBannerPage
          title="Our News"
          desc="A collection of news related to activities and announcements from the Citramas Foundation"
          img={banner}
        />
      </div>

      <div className="cust-container py-10 grid grid-cols-12 gap-8">
        {loading ? (
          // ✅ SKELETON LOADER
          <>
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
               {/* Skeleton Search */}
               <div className="h-10 bg-gray-200 rounded w-full animate-pulse mb-2"></div>
               {/* Skeleton News Items */}
               {[...Array(3)].map((_, i) => (
                 <div key={i} className="flex gap-4 p-4 border rounded animate-pulse">
                    <div className="h-24 w-24 bg-gray-300 rounded flex-shrink-0"></div>
                    <div className="flex flex-col gap-2 w-full">
                       <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                       <div className="h-3 bg-gray-200 rounded w-full"></div>
                       <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                 </div>
               ))}
            </div>
            <div className="col-span-12 lg:col-span-5">
               {/* Skeleton Calendar */}
               <div className="h-64 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          </>
        ) : error ? (
            <div className="col-span-12 text-center py-10 text-red-500 bg-red-50 rounded-lg">
                <p>Failed to load news data. Please try again later.</p>
            </div>
        ) : dataNews.length === 0 ? (
            <div className="col-span-12 text-center py-20 text-2xl font-bold text-gray-400">
                No News Found
            </div>
        ) : (
          // ✅ CONTENT ASLI
          <>
            <div className="col-span-12 lg:col-span-7">
              <LeftSide data={dataNews} />
            </div>
            
            <div className="col-span-12 lg:col-span-5 lg:ps-10 space-y-5">
              <Calendar data={dataNews} />
              
              {/* Legend */}
              <div className="flex flex-col gap-2 py-5 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="font-semibold text-sm mb-1">Legend:</h4>
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 bg-red-600 rounded-full shadow-sm"></span>
                  <p className="text-sm text-gray-600">Current Date (Today)</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 bg-black rounded-full shadow-sm"></span>
                  <p className="text-sm text-gray-600">Has News Event</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;