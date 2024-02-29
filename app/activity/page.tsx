"use client";

import CustBannerPage from "../components/atoms/custBannerPage";
import banner from "@/app/assets/cs-contact.jpg";
import CustTabActivity from "../components/atoms/custTabActivity";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const dataTab = [
  {
    title: "Health",
    icon: "health",
    activityList: [
      "Eye Screening",
      "Health Screening",
      "Medical Screening",
      "Healthcare Center",
      "Soedarsono Darmosoewito Hospital",
      "Supplement Food",
      "Equipments",
    ],
  },
  {
    title: "Education",
    icon: "education",
    activityList: [
      "Scholarships",
      "English Language to Children",
      "Renovation and Building of Classrooms",
      "Donationto Primary School",
    ],
  },
  {
    title: "Sport",
    icon: "sport",
    activityList: [
      "Sport Hall, Futsal and Citramas Stadium",
      "Football Academy and Athletics",
      "Training of Athletes in Sailing",
      "Citramas 10k run",
    ],
  },
  {
    title: "Social Community",
    icon: "social",
    activityList: [
      "Providing Educational Assistance (August 2023)",
      "Social Assistance to 3 Orphanages",
      "Mangrove Nurseries",
      "Food assistance for underprivileged families",
      "Providing Educational Assistance",
      "Hydroponics",
      "Elderly Health Check",
      "Mass Circumcision",
      "Qurban",
      "Food and milk assistance",
      "Social service for Toddlers",
      "Food aid for Nongsa residents",
      "Support for handling stunting cases in Sambau Village.",
      "Distributed basic food packages to help Pra-Sejahtera and Poor families in Sambau",
      "Distributed basic food packages to society in Bertam Islands",
      "Build toilet at SDN 007, Kampung Panau",
      "Citramas Foundation Shares Food Packages Welcoming Eid Al-Fitr 2022 - 1443 H",
      "Citramas Peduli shares with the children at the Orphanage",
      "COVID-19 Booster Vaccines",
      "Covid-19 Vaccination",
      "Rapid Antigen in Miftahul Orphanage",
      "Distribution of basic food packages to the community affected by COVID-19",
      "Citramas Sharing",
      "Meal Distribution",
      "Mask Distribution",
      "Disinfectant in Citramas Indah Housing Area",
      "Rice Donation",
      "Distribution of basic food to Nongsa residents",
      "Mangrove Planting",
      "Rebuilding the Miftahul Hasanah Orphanage",
      "Micro Loan for Local Farmers",
      "Relief for Padang Earthquake Victims",
      "Food Donations for Malnourished Babies or Children",
      "Construction of Citramas Mosque and Graha Citramas (Multi-Purpose Hall)",
    ],
  },
];

const Page: React.FC = () => {
  const [isActive, setIsActive] = useState("health");

  const searchParams = useSearchParams();

  const titleParams = searchParams.get("title");
  const itemParams = searchParams.get("item");

  const handleActive = (title: string) => {
    setIsActive(title);
  };

  useEffect(() => {
    console.log(titleParams);
    
    if (titleParams) {
      setIsActive(titleParams);
    }
  },[titleParams])

  return (
    <div className="w-full relative pt-[69px]">
      <div className="relative drop-shadow-sm">
        <CustBannerPage
          title="Our Activity"
          desc="We have several activities that have been implemented and are running well."
          img={banner}
        />
        <div className="absolute -bottom-12 right-1/2 translate-x-1/2 cust-container grid grid-cols-4 gap-3 py-5">
          {dataTab.map((item, index) => {
            return (
              <CustTabActivity
                text={item.title}
                isActive={isActive}
                handleActive={handleActive}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <div className="cust-container pt-14 pb-16 grid grid-cols-12 gap-5">
        <div className="col-span-3 bg-slate-100 rounded-sm">
          <h3 className="p-3 border-b-2 text-lg font-medium">
            List Of Activity
          </h3>
          <div className="flex flex-col gap-4 text-xs md:text-sm p-3">
            {dataTab
              .filter((item) => item.title.replace(/ /g, "-").toLowerCase() == isActive.replace(/ /g, "-").toLowerCase())
              .map((item) => {

                const itemTitle = item.title.replace(/ /g, "-").toLowerCase();

                return item.activityList.map((item, index) => {

                  const lowerItem = item.replace(/ /g, "-").toLowerCase();

                  return (
                    <a
                      href={`/activity?title=${itemTitle}&item=${lowerItem}`}
                      className="cursor-pointer hover:text-gray-500 text-gray-800"
                      key={index}
                    >
                      {item}
                    </a>
                  );
                });
              })}
          </div>
        </div>
        <div className="col-span-9">
          <h3 className="p-3 border-b-2 text-lg font-medium">Gallery :</h3>
          <span className="p-3 text-xs text-red-400">
            *No one activity selected, please select activity on Activity List
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
