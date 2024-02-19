import Link from "next/link";

interface CustCardArticleProps {
  title: string;
  desc: string;
  path: string;
  date: string;
}

const CustCardArticle = ({ title, desc, path, date }: CustCardArticleProps) => {
  return (
    <article className="w-full flex flex-col justify-between px-5 py-7 min-h-60 bg-slate-200">
      <div className="flex flex-col gap-5">
        <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
      <div className="flex items-center justify-between mt-10">
        <Link
          href={path}
          className="text-sm px-4 py-2 bg-custPrimary hover:bg-custPrimary/70 transition-all duration-200 text-custWhite"
        >
          Read More
        </Link>
        <span className="text-sm text-gray-400">{date}</span>
      </div>
    </article>
  );
};

export default CustCardArticle;
