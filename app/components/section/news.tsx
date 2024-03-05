import CustCardArticle from "../atoms/custCardArticle";
import CustTagTittle from "../atoms/custTagTittle";
import prisma from "@/app/libs/prisma";

const dataArticle = [
    {
        id: 1,
        title: "Lorem Ipsum Dolor Sit Amet",
        desc: "Lorem ipsum dolor sit amet.",
        path: "#",
        date: "Wednesday, 12 May 2021"
    },
    {
        id: 2,
        title: "Lorem Ipsum Dolor Sit Amet",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        path: "#",
        date: "Wednesday, 12 May 2021"
    },
    {
        id: 3,
        title: "Lorem Ipsum Dolor Sit Amet",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        path: "#",
        date: "Wednesday, 12 May 2021"
    },

]


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
      <div className="grid grid-cols-3 gap-5 py-10">
        {
            dataSlice.map((item, index) => {
                return (
                    <CustCardArticle key={index} data={item} />
                )
            })
        }
      </div>
    </div>
  );
};

export default News;
