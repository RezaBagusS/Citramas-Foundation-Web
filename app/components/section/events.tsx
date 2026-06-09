'use client'

import React, { useRef, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Keyboard, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CustTagTittle from "../atoms/custTagTittle";

// Import local formal fallback assets
import formalEducation from "../../assets/formal_fallback_education.png";
import formalHealth from "../../assets/formal_fallback_health.png";
import formalCommunity from "../../assets/formal_fallback_community.png";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: Date | string;
  note: string | null;
  path: string;
  image?: string | null;
}

interface EventsSectionProps {
  newsData?: NewsItem[];
}

const defaultBackgrounds = [formalCommunity, formalEducation, formalHealth];

const isImageUrl = (url: string) => {
  if (!url) return false;
  return /\.(jpeg|jpg|gif|png|webp)($|\?)/i.test(url);
};

const getEventDateDetails = (dateString: string | Date) => {
  const d = new Date(dateString);
  const day = String(d.getDate()).padStart(2, "0");
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = monthNames[d.getMonth()] || "JAN";
  const year = String(d.getFullYear());
  return { day, month, year };
};

const EventSlideImage = ({ item, index }: { item: NewsItem; index: number }) => {
  const [imgError, setImgError] = useState(false);
  const hasImage = !!item.image && (item.image.startsWith("http") || item.image.startsWith("/")) && !imgError;
  const bgImage = hasImage ? item.image : defaultBackgrounds[index % defaultBackgrounds.length];

  return (
    <>
      {hasImage && item.image ? (
        <img
          src={item.image}
          alt={item.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover bg-slate-50"
        />
      ) : (
        <Image
          src={bgImage || ""}
          alt={item.title}
          fill
          priority={index === 0}
          className="object-cover bg-slate-50"
        />
      )}
    </>
  );
};

const EventsSection = ({ newsData = [] }: EventsSectionProps) => {
  const sliderRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  // Display the latest 5 news items
  const displayNews = newsData.slice(0, 5);

  return (
    <div className="cust-container relative py-12 md:py-16">
      <CustTagTittle text="Events" />
      <div className="grid grid-cols-12 gap-8 items-stretch mt-8">

        {/* Left Side: Certificate & Event Banner Carousel */}
        <div className="col-span-12 lg:col-span-7 relative flex flex-col justify-center rounded-xl overflow-hidden shadow-md border border-gray-100 bg-white min-h-[300px]">
          {displayNews.length === 0 ? (
            <div className="flex items-center justify-center text-gray-400 p-10">
              No events found.
            </div>
          ) : (
            <>
              <Swiper
                ref={sliderRef}
                slidesPerView={1}
                spaceBetween={0}
                loop={displayNews.length > 1}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  bulletActiveClass: "swiper-pagination-bullet-active bg-custPrimary",
                }}
                modules={[Pagination, Keyboard, Autoplay]}
                className="w-full h-full mySwiper"
              >
                {displayNews.map((item, index) => {
                  return (
                    <SwiperSlide key={item.id} className="flex items-center justify-center w-full h-full">
                      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] group">
                        <EventSlideImage item={item} index={index} />
                        {/* Dark overlay with text content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 flex flex-col justify-end p-6 text-white">
                          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
                            {new Date(item.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                          </p>
                          <h3 className="text-base sm:text-lg md:text-xl font-bold line-clamp-2 leading-snug">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-xs text-gray-200 mt-2 line-clamp-2 hidden sm:block">
                              {item.description}
                            </p>
                          )}
                          <Link
                            href={item.path}
                            target={item.path.startsWith("http") ? "_blank" : undefined}
                            rel={item.path.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-xs font-bold text-white bg-[#1B57A7] hover:bg-opacity-95 px-4 py-2 rounded-md mt-4 w-fit transition duration-150 uppercase tracking-wider"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {/* Navigation Arrows */}
              {displayNews.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous event slide"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center cursor-pointer transition duration-150 text-white"
                  >
                    <FiChevronLeft className="text-2xl" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next event slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center cursor-pointer transition duration-150 text-white"
                  >
                    <FiChevronRight className="text-2xl" />
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* Right Side: Upcoming Events List */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 tracking-wider uppercase border-b-2 border-custPrimary/20 pb-2 mb-4">
              The Past Event
            </h2>

            {displayNews.slice(0, 3).length === 0 ? (
              <div className="text-gray-500 italic py-10">No events listed.</div>
            ) : (
              displayNews.slice(0, 3).map((event) => {
                const { day, month, year } = getEventDateDetails(event.date);

                return (
                  <div
                    key={event.id}
                    className="flex bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-custPrimary/30 transition-all duration-300 gap-4 items-center"
                  >
                    {/* Date Block */}
                    <div className="flex flex-col items-center justify-center bg-emerald-600 text-white rounded-lg p-2 w-16 h-20 flex-shrink-0 shadow-sm">
                      <span className="text-xl font-bold leading-none">{day}</span>
                      <span className="text-[10px] font-bold tracking-wider mt-1">{month}</span>
                      <span className="text-[10px] opacity-80 mt-0.5 font-medium">{year}</span>
                    </div>

                    {/* Event Description */}
                    <div className="flex flex-col justify-between min-h-[70px] w-full">
                      <h3 className="font-semibold text-custBlack/90 text-sm md:text-base hover:text-custPrimary transition duration-150 line-clamp-2">
                        <Link
                          href={event.path}
                          target={event.path.startsWith("http") ? "_blank" : undefined}
                          rel={event.path.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {event.title}
                        </Link>
                      </h3>
                      <Link
                        href={event.path}
                        target={event.path.startsWith("http") ? "_blank" : undefined}
                        rel={event.path.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-xs font-bold text-custPrimary hover:underline mt-1 w-fit"
                      >
                        Find out more
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* View All Button */}
          <div className="mt-6">
            <Link
              href="/news"
              className="inline-block px-6 py-3 bg-[#1B57A7] hover:bg-[#1B57A7]/95 active:scale-95 text-white font-bold text-xs tracking-wider rounded-lg shadow-sm hover:shadow-md transition-all duration-150 uppercase"
            >
              Lihat Semua Event
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventsSection;
