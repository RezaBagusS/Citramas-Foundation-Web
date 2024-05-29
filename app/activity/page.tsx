'use client'

import CustBannerPage from "../components/atoms/custBannerPage";
import banner from "@/app/assets/activity-activity.png";
import ActivityMenu from "../components/molecules/activityMenu";
import ActivityList from "../components/molecules/activityList";
import GalleryActivity from "../components/molecules/galleryActivity";
import { useEffect, useState } from "react";

const Page: React.FC = () => {
  const [dataTab, setDataTab] = useState([]);
  const [dataActivityList, setDataActivityList] = useState([]);

  useEffect(() => {

    const fetchData = () => {

      const getDataTab = fetch(`/api/v1/tabActivity`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
      });

      const getDataActivityList = fetch(`/api/v1/activityList`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
      });

      getDataTab.then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
        setDataTab(data.data);
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        console.log("done");
      });

      getDataActivityList.then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
        setDataActivityList(data.data);
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        console.log("done");
      });
    }

    fetchData();

  },[]);

  return (
    <div className="w-full relative pt-[69px]">
      <div className="relative drop-shadow-sm min-h-52">
        <CustBannerPage
          title="Our Activity"
          desc="We have several activities that have been implemented and are running well."
          img={banner}
        />

        {/* Activity Menu PC */}
        <div className="absolute z-30 -bottom-12 right-1/2 translate-x-1/2 cust-container hidden sm:grid grid-cols-2 md:grid-cols-4 gap-3 py-5">
          <ActivityMenu dataTab={dataTab} />
        </div>

      </div>
      <div className="cust-container pt-8 md:pt-14 pb-16 grid grid-cols-12 gap-5">
        {/* Activity Menu Mobile */}
        <div className="col-span-12 sm:hidden grid grid-cols-2 gap-3">
          <ActivityMenu dataTab={dataTab} />
        </div>

        <div className="col-span-12 md:col-span-3 bg-slate-100 rounded-sm sm:mt-8">
          <h3 className="p-3 border-b-2 text-lg font-medium">
            List Of Activity
          </h3>

          {/* Activity List */}
          <ActivityList
            dataTab={dataTab}
            dataActivityList={dataActivityList}
          />
        </div>
        <div className="col-span-12 md:col-span-9">
          {/* Galery List */}
          <GalleryActivity dataActivityList={dataActivityList} />
        </div>
      </div>
    </div>
  );
};

export default Page;
