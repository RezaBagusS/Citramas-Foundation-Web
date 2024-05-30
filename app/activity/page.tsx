'use client'

import CustBannerPage from "../components/atoms/custBannerPage";
import banner from "@/app/assets/activity-activity.png";
import ActivityMenu from "../components/molecules/activityMenu";
import ActivityList from "../components/molecules/activityList";
import GalleryActivity from "../components/molecules/galleryActivity";
import SkeletonTab from "../components/molecules/skeletonTab";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Page: React.FC = () => {
  const [dataTab, setDataTab] = useState([]);
  const [loading, setLoading] = useState(true);
  const path = usePathname();

  const location = useRouter();
  const searchParams = useSearchParams();
  const itemParams = searchParams.get("item");

  useEffect(() => {

    setLoading(true);

    if (!itemParams) {
      location.push("/activity?title=Health&item=eye-screening");
    }

    const getDataTab = fetch(`/api/v1/tabActivity`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
    });

    getDataTab.then((res) => {
      return res.json();
    }).then((data) => {
      setDataTab(data.data);
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setLoading(false);
    });

  }, [path]);

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
          {
            loading ? (
              <SkeletonTab />
            ) : (
              <ActivityMenu dataTab={dataTab} />
            )
          }
        </div>

      </div>
      <div className="cust-container pt-8 md:pt-14 pb-16 grid grid-cols-12 gap-5">
        {/* Activity Menu Mobile */}
        <div className="col-span-12 sm:hidden grid grid-cols-2 gap-3">
          {
            loading ? (
              <SkeletonTab />
            ) : (
              <ActivityMenu dataTab={dataTab} />
            )
          }
        </div>

        <div className="col-span-12 md:col-span-3 bg-slate-100 rounded-sm sm:mt-8">
          <h3 className="p-3 border-b-2 text-lg font-medium">
            List Of Activity
          </h3>

          {/* Activity List */}
          <ActivityList
          />
        </div>
        <div className="col-span-12 md:col-span-9">
          {/* Galery List */}
          <GalleryActivity />
        </div>
      </div>
    </div>
  );
};

export default Page;
