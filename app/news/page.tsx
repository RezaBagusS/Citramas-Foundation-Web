'use client'

import CustBannerPage from "../components/atoms/custBannerPage";
import banner from "@/app/assets/news-banner.webp";
import Calendar from "../components/molecules/calendar";
import LeftSide from "./leftside";
import React, { useEffect } from "react";

const Page: React.FC = () => {

  const [dataNews, setDataNews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const data = fetch(`/api/v1/newsList`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
    });

    data.then((res) => {
      return res.json();
    }).then((data) => {
      setDataNews(data.data);
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setLoading(false);
    });
  }, [])

  return (
    <div className="w-full relative pt-[69px]">
      <div className="drop-shadow-sm">
        <CustBannerPage
          title="Our News"
          desc="A collection of news related to activities and announcements from the Citramas Foundation"
          img={banner}
        />
      </div>
      {
        loading ? (
          <div className="cust-container py-5 grid">
            <p className="animate-pulse text-center">
              Load Data . . .
            </p>
          </div>
        )
          : (
            < div className="cust-container py-5 grid grid-cols-12">
              {
                dataNews.length === 0 ?
                  (
                    <div className="col-span-12 text-center text-2xl font-bold text-gray-
                      500">
                        No News Found
                    </div>
                  )
                  :
                  (
                    <div className="col-span-12 lg:col-span-7">
                      <LeftSide data={dataNews} />
                    </div>
                  )
              }
              <div className="col-span-12 lg:col-span-5 mt-5 lg:mt-0 lg:ps-10">
                <Calendar data={dataNews} />
                <div className="flex flex-col gap-2 py-5">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 bg-red-600 rounded-full"></span>
                    <p className="italic text-sm">Today</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 bg-black rounded-full"></span>
                    <p className="italic text-sm">News day</p>
                  </div>
                </div>
              </div>
            </div>
          )
      }
    </div >
  );
};

export default Page;
