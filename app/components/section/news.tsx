import CustTagTittle from "../atoms/custTagTittle";
import React, { useState, useEffect } from 'react';
import ActivitySlider from "../molecules/ActivitySlider";
import activitySlider from "@/app/helpers/activitySlider";

interface DataImage {
  id: number;
  id_listActivity: number;
  url: string;
  name: string;
  description: string;
  activity: string;
}

const News = async () => {

  const dataSlider = await activitySlider();

  return (
    <div className="cust-container relative">
      <CustTagTittle text="Activity" />
      <ActivitySlider dataSlider={dataSlider?.data || []} />
    </div>
  );
};

export default News;
