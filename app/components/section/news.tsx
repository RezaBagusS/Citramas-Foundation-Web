"use client";

import CustTagTittle from "../atoms/custTagTittle";
import React, { useState, useEffect } from 'react';
import activitySlider from "@/app/helpers/activitySlider";
import ActivitySlider from "../molecules/ActivitySlider";

interface DataImage {
  id: number;
  id_listActivity: number;
  url: string;
  name: string;
  description: string;
  activity: string;
}

const News = () => {
  const [dataSlider, setDataSlider] = useState<DataImage[]>([]);

  useEffect(() => {
    activitySlider()
      .then((res) => {
        if (res.error === false) {
          setDataSlider(res.data || []);
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="cust-container relative">
      <CustTagTittle text="Activity" />
      <ActivitySlider dataSlider={dataSlider} />
      {/* <div className="flex justify-center mb-5">
        <Link
          href={"/news"}
          className="text-sm px-4 py-2 bg-custPrimary hover:bg-custPrimary/70 transition-all duration-200 text-custWhite"
        >
          See All News
        </Link>
      </div> */}
    </div>
  );
};

export default News;
