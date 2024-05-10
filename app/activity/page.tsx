import CustBannerPage from "../components/atoms/custBannerPage";
import banner from "@/app/assets/activity-activity.png";
import ActivityMenu from "../components/molecules/activityMenu";
import ActivityList from "../components/molecules/activityList";
import prisma from "../libs/prisma";
import GalleryActivity from "../components/molecules/galleryActivity";

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

const Page: React.FC = async () => {
  const dataTab = await prisma.activity.findMany();
  const dataActivityList = await prisma.listActivity.findMany();

  return (
    <div className="w-full relative pt-[69px]">
      <div className="relative drop-shadow-sm min-h-52">
        <CustBannerPage
          title="Our Activity"
          desc="We have several activities that have been implemented and are running well."
          img={banner}
        />

        {/* Activity Menu */}
        <div className="absolute z-30 -bottom-12 right-1/2 translate-x-1/2 cust-container hidden sm:grid grid-cols-2 md:grid-cols-4 gap-3 py-5">
          <ActivityMenu dataTab={dataTab} />
        </div>

      </div>
      <div className="cust-container pt-8 md:pt-14 pb-16 grid grid-cols-12 gap-5">
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
