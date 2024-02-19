import CustCardArticle from "../atoms/custCardArticle";
import CustTagTittle from "../atoms/custTagTittle";

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


const News = () => {
  return (
    <div className="cust-container relative">
      <CustTagTittle text="News" />
      <div className="grid grid-cols-3 gap-5 py-10">
        {
            dataArticle.map((item, index) => {
                return (
                    <CustCardArticle key={index} title={item.title} desc={item.desc} path={item.path} date={item.date} />
                )
            })
        }
      </div>
    </div>
  );
};

export default News;
