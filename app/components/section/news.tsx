"use client";

import CustTagTittle from "../atoms/custTagTittle";
import React, { useState, useEffect } from 'react';
// import activitySlider from "@/app/helpers/activitySlider";
import ActivitySlider from "../molecules/ActivitySlider";

interface DataImage {
  id: number;
  id_listActivity: number;
  url: string;
  name: string;
  description: string;
  activity: string;
}

const backendURL = "/api/v1/dataSlider";

const News = () => {
  const [dataSlider, setDataSlider] = useState<DataImage[]>([]);

  useEffect(() => {
    
    fetch("https://citramas-foundation-web.vercel.app/api/v1/dataSlider",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.message);
        } else {
          console.log(data.message);
          setDataSlider(data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  // useEffect(() => {
  //   console.log(dataSlider);
  // }, [dataSlider]);

  return (
    <div className="cust-container relative">
      <CustTagTittle text="Activity" />
      <ActivitySlider dataSlider={dataSlider} />
    </div>
  );
};

export default News;
