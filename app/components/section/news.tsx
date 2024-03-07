import CustCardArticle from "../atoms/custCardArticle";
import CustTagTittle from "../atoms/custTagTittle";
import prisma from "@/app/libs/prisma";
import Link from "next/link";

const News = async () => {

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

  const dataSlice = dataNews.slice(0, 3);

  return (
    <div className="cust-container relative">
      <CustTagTittle text="News" />
      <div className="grid  md:grid-cols-3 gap-5 pt-10 pb-5">
        {
            dataSlice.map((item, index) => {
                return (
                    <CustCardArticle key={index} data={item} />
                )
            })
        }
      </div>
      <div className="flex justify-center mb-5">
        <Link
          href={"/news"}
          className="text-sm px-4 py-2 bg-custPrimary hover:bg-custPrimary/70 transition-all duration-200 text-custWhite"
        >
          See All News
        </Link>
      </div>
    </div>
  );
};

export default News;
