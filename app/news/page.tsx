import CustBannerPage from "../components/atoms/custBannerPage";
import banner from "@/app/assets/reporter-news.webp";
import Calendar from "../components/molecules/calendar";
import LeftSide from "./leftside";
import prisma from  "@/app/libs/prisma"

const Page: React.FC = async () => {

  const dataNews = await prisma.news.findMany({
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      date: true,
      note: true,
      path: true,
    },
  });

  return (
    <div className="w-full relative pt-[69px]">
      <div className="drop-shadow-sm">
        <CustBannerPage
          title="Our News"
          desc="A collection of news related to activities and announcements from the Citramas Foundation"
          img={banner}
        />
      </div>
      <div className="cust-container py-5 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-7">
          <LeftSide data={dataNews} />
        </div>
        <div className="col-span-12 lg:col-span-5 mt-5 lg:mt-0 lg:ps-10">
          <Calendar data={dataNews} />
          <div className="flex flex-col gap-2 py-5">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 bg-red-600 rounded-full"></span>
              <p className="italic text-sm">Today</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 bg-black rounded-full"></span>
              <p className="italic text-sm">News day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
