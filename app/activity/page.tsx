'use client'

import CustBannerPage from "../components/atoms/custBannerPage";
import banner from "@/app/assets/activity-activity.png";
import ActivityMenu from "../components/molecules/activityMenu";
import ActivityList from "../components/molecules/activityList";
import GalleryActivity from "../components/molecules/galleryActivity";
import SkeletonTab from "../components/molecules/skeletonTab";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Page: React.FC = () => {
  const [dataTab, setDataTab] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const titleParam = searchParams.get("title");

  // 1. Fetch Data Tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/tabActivity`);
        const data = await res.json();
        setDataTab(data.data || []);

        // 2. Logic Redirect Default (Hanya jika tidak ada params sama sekali)
        // Pindahkan logic redirect ke sini setelah data didapat (opsional) 
        // atau biarkan di useEffect terpisah tapi pastikan params kosong.
        if (!titleParam && data.data && data.data.length > 0) {
          // Contoh: Default ke tab pertama jika ada
          const defaultTitle = data.data[0].name;
          // router.replace(...) lebih baik daripada push untuk default redirect
        }

      } catch (err) {
        console.error("Failed to fetch tabs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Run once on mount

  // Redirect safety check
  useEffect(() => {
    if (!searchParams.has("title") && !loading) {
      // Default Hardcoded (Sesuai kode lama anda)
      router.replace("/activity?title=Health&item=eye-screening");
    }
  }, [searchParams, loading, router]);

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
          {loading ? <SkeletonTab /> : <ActivityMenu dataTab={dataTab} />}
        </div>
      </div>

      <div className="cust-container pt-8 md:pt-14 pb-16 grid grid-cols-12 gap-5">
        {/* Activity Menu Mobile */}
        <div className="col-span-12 sm:hidden grid grid-cols-2 gap-3">
          {loading ? <SkeletonTab /> : <ActivityMenu dataTab={dataTab} />}
        </div>

        <div className="col-span-12 md:col-span-3 bg-slate-50 rounded-sm sm:mt-8 h-fit shadow-sm border border-slate-100">
          <h3 className="p-3 border-b-2 border-slate-200 text-lg font-medium text-gray-800">
            List Of Activity
          </h3>
          <ActivityList />
        </div>

        <div className="col-span-12 md:col-span-9">
          <GalleryActivity />
        </div>
      </div>
    </div>
  );
};

export default Page;