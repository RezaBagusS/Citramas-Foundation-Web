"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

interface ActivityListProps {
  dataActivityList: {
    id: number;
    id_activity: number;
    name: string;
    createdAt: Date;
  }[];
  dataTab: {
    id: number;
    name: string;
    createdAt: Date;
  }[];
}

const ActivityList = ({ dataActivityList, dataTab }: ActivityListProps) => {
  const active = useSelector((state: any) => state.activeActivity.data.show);
  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState(
    useSearchParams().get("item") || ""
  );

  const getItem = searchParams.get("item") || "eye-screening";

  const getTab = dataTab.filter((item) => {
    return (
      item.name.replace(/ /g, "-").toLowerCase() ==
      active.replace(/ /g, "-").toLowerCase()
    );
  });

  const getIdTab = getTab.map((item) => {
    return item.id;
  });

  const filteredActivityList = dataActivityList.filter((item) => {
    return item.id_activity == getIdTab[0];
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(event.target.value);
  };

  return (
    <>
      <div className="hidden md:flex flex-col gap-4 text-xs md:text-sm p-3">
        {filteredActivityList.map((item, index) => {
          const lowerItem = item.name.replace(/ /g, "-").toLowerCase();

          return (
            <a
              href={`/activity?title=${getTab[0].name}&item=${lowerItem}`}
              className={`cursor-pointer hover:text-gray-500 text-gray-800
              ${
                getItem == lowerItem ? "font-semibold underline" : "font-normal"
              }
            `}
              key={index}
            >
              {item.name}
            </a>
          );
        })}
      </div>
      <div className="md:hidden flex gap-2">
        <select
          value={selectedItem}
          className="w-full text-sm sm:text-base p-1 mt-2"
          onChange={handleChange}
        >
          {filteredActivityList.map((item, index) => (
            <option
              key={index}
              value={item.name.replace(/ /g, "-").toLowerCase()}
            >
              {item.name}
            </option>
          ))}
        </select>
        <a
          href={`/activity?title=${getTab[0].name}&item=${selectedItem}`}
          className="md:hidden w-fit text-sm sm:text-base py-1 px-3 mt-2 bg-custPrimary text-white"
        >
          Go
        </a>
      </div>
    </>
  );
};

export default ActivityList;
