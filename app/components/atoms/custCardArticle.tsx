import Link from "next/link";

interface CustCardArticleProps {
  data: {
    id: number;
    title: string;
    description: string;
    date: Date | null;
    note: string | null;
    path: string;
  };
}

const CustCardArticle = ({ data }: CustCardArticleProps) => {

  const formatDate = (dateStr: Date | null) => {

    if (dateStr === null) {
      return "Unknown Date";
    }

    const dateObj = new Date(dateStr);
    dateObj.setDate(dateObj.getDate() - 1);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <article className="w-full flex flex-col justify-between px-5 py-7 min-h-60 bg-slate-200">
      <div className="flex flex-col gap-5">
        <h3 className="text-xl font-semibold text-gray-700">{data.title}</h3>
        <p className="text-sm text-gray-500">{data.description}</p>
      </div>
      <div className="flex items-center justify-between mt-10">
        <Link
          href={data.path}
          className="text-sm px-4 py-2 bg-custPrimary hover:bg-custPrimary/70 transition-all duration-200 text-custWhite"
        >
          Read More
        </Link>
        <span className="text-sm text-gray-400">{formatDate(data.date)}</span>
      </div>
    </article>
  );
};

export default CustCardArticle;
