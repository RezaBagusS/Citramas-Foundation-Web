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
  // const [dataSlider, setDataSlider] = useState<DataImage[]>([]);

  // useEffect(() => {
  //   activitySlider()
  //     .then((res) => {
  //       if (res.error === false) {
  //         setDataSlider(res.data || []);
  //       } else {
  //         console.log(res.message);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const res = await activitySlider();

  const dataSlider = res.error ? res.data : [];

  return (
    <div className="cust-container relative">
      <CustTagTittle text="Activity" />
      <ActivitySlider dataSlider={dataSlider || []} />
    </div>
  );
};

export default News;
