"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsItem } from "@/app/news/page"; // Import the shared interface

// Import local formal fallback assets
import formalEducation from "../../assets/formal_fallback_education.png";
import formalHealth from "../../assets/formal_fallback_health.png";
import formalCommunity from "../../assets/formal_fallback_community.png";

const defaultBackgrounds = [formalCommunity, formalEducation, formalHealth];

interface CustListNewsProps {
  data: NewsItem;
}

const CustListNews = ({ data }: CustListNewsProps) => {
  const [imgError, setImgError] = useState(false);
  
  // Safe Date Formatting (No Mutation)
  const formatDate = (dateStr: Date | string | null) => {
    if (!dateStr) return "Unknown Date";

    const dateObj = new Date(dateStr);
    
    // Using standard Intl formatter
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(dateObj);
  };

  const isExternal = data.path.startsWith("http");
  const hasImage = !!data.image && (data.image.startsWith("http") || data.image.startsWith("/")) && !imgError;
  const bgImage = hasImage ? data.image : defaultBackgrounds[data.id % defaultBackgrounds.length];

  return (
    <div className="bg-white border border-gray-100 flex flex-col justify-between rounded-xl shadow-sm hover:shadow-md hover:border-custPrimary/30 transition-all duration-300 overflow-hidden h-full">
      {/* Top Part: Image Banner */}
      <div className="relative w-full aspect-[16/10] overflow-hidden flex-shrink-0 bg-slate-50 border-b border-gray-100">
        {hasImage && data.image ? (
          <img
            src={data.image}
            alt={data.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Image
            src={bgImage || ""}
            alt={data.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>

      {/* Bottom Part: Text Details */}
      <div className="p-4 flex flex-col justify-between flex-grow gap-3">
        <div>
          {/* Note/Category & Date */}
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider mb-2 gap-4">
            <span className="text-custPrimary truncate max-w-[70%]" title={data.note || "News Update"}>
              {data.note || "News Update"}
            </span>
            <span className="text-gray-400 font-medium flex-shrink-0">{formatDate(data.date)}</span>
          </div>

          {/* Title */}
          <h2 className="text-sm md:text-base font-bold text-gray-800 line-clamp-2 hover:text-custPrimary transition-colors duration-150 mb-2 leading-snug">
            <Link
              href={data.path}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {data.title}
            </Link>
          </h2>

          {/* Description snippet */}
          <p className="text-xs font-normal text-gray-500 line-clamp-3 leading-relaxed">
            {data.description || "No description available for this update. Read the full article to learn more."}
          </p>
        </div>

        {/* Read More button */}
        <div className="flex justify-end mt-1">
          <Link
            href={data.path}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-xs font-bold whitespace-nowrap px-4 py-2 border border-custPrimary text-custPrimary hover:bg-[#1B57A7] hover:border-[#1B57A7] hover:text-white rounded-lg transition-all duration-200"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustListNews;