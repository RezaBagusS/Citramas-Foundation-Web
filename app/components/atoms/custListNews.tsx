import Link from "next/link";

interface INews {
  data: {
    id: number;
    title: string;
    description: string;
    date: Date | null;
    note: string | null;
    path: string;
  };
}

const CustListNews = ({ data }: INews) => {
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
    <div className="bg-slate-100 border p-4 flex flex-col justify-between">
      <div className="flex justify-between">
        <h2 className="text-base md:text-lg font-semibold w-9/12">{data.title}</h2>
        <p className="text-xs hidden md:flex italic whitespace-nowrap">{formatDate(data.date)}</p>
      </div>
      <div className="py-1">
        <p className="text-xs md:text-sm font-normal text-gray-500">
          {data.description.length > 100
            ? data.description.substring(0, 100) + "..."
            : data.description}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between md:items-end">
        <span className="text-[10px]">{data.note}</span>
        <div className="flex justify-between items-end md:justify-end w-full md:w-fit">
          <p className="text-[10px] flex md:hidden italic whitespace-nowrap">
            {formatDate(data.date)}
          </p>
          <Link
            href={"#"}
            className="text-xs whitespace-nowrap px-3 sm:px-4 py-1 sm:py-2 bg-custPrimary hover:bg-custPrimary/70 transition-all duration-200 text-custWhite"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustListNews;
