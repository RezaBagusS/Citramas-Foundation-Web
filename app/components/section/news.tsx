'use client'

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

const backendURL = "/api/v1/dataSlider";

const News = () => {
  const [dataSlider, setDataSlider] = useState<DataImage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(backendURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        console.log("RESPONSE 1 : ",response);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        console.log("RESPONSE 2 : ",response);
        

        const data = await response.json();
        console.log("DATA : ",data);
        
        // setDataSlider(data.data || []); // Set to empty array if data.data is missing
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error gracefully, e.g., display an error message to the user
      }
    };

    fetchData();

    const fetchUsingPrisma = async () => {
      await activitySlider()
        .then((res) => {
          console.log("RES : ",res);
        })
        .catch((err) => {
          console.log("Error : ",err);
        });
    }

    fetchUsingPrisma();
  }, []);

  return (
    <div className="cust-container relative">
      <CustTagTittle text="Activity" />
      {/* <ActivitySlider dataSlider={dataSlider} /> */}
    </div>
  );
};

export default News;
