import Link from "next/link";
import { NewsItem } from "@/app/news/page"; // Import the shared interface

interface CustListNewsProps {
  data: NewsItem;
}

const CustListNews = ({ data }: CustListNewsProps) => {
  
  // ✅ 1. Safe Date Formatting (No Mutation)
  const formatDate = (dateStr: Date | string | null) => {
    if (!dateStr) return "Unknown Date";

    // Create a new Date object to ensure we don't mutate anything
    const dateObj = new Date(dateStr);

    // If you absolutely must subtract a day due to API issues, do it here safely:
    // const adjustedDate = new Date(dateObj);
    // adjustedDate.setDate(adjustedDate.getDate() - 1);
    
    // Using standard Intl formatter
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(dateObj);
  };

  // Check if the path is external (starts with http)
  const isExternal = data.path.startsWith("http");

  return (
    <div className="bg-slate-100 border border-gray-200 p-4 flex flex-col justify-between rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <h2 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-2">
          {data.title}
        </h2>
        <p className="text-xs hidden md:block text-gray-500 italic whitespace-nowrap">
          {formatDate(data.date)}
        </p>
      </div>
      
      <div className="py-3">
        <p className="text-xs md:text-sm font-normal text-gray-600 line-clamp-3">
            {data.description}
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-3 md:justify-between md:items-end mt-2">
        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
          {data.note || "News Update"}
        </span>
        
        <div className="flex justify-between items-center md:justify-end w-full md:w-auto gap-3">
          <p className="text-[10px] md:hidden text-gray-500 italic">
            {formatDate(data.date)}
          </p>
          
          <Link
            href={data.path}
            target={isExternal ? "_blank" : undefined} // ✅ Open external links in new tab
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-xs font-medium whitespace-nowrap px-4 py-2 bg-custPrimary hover:bg-custPrimary/90 rounded text-white transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustListNews;