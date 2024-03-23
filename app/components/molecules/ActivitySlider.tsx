import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Keyboard } from "swiper/modules";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ActivitySliderProps {
  dataSlider: {
    id: number;
    id_listActivity: number;
    url: string;
    name: string;
    description: string;
    activity: string;
  }[];
}

const ActivitySlider = ({ dataSlider }: ActivitySliderProps) => {
  const sliderRef = React.useRef<any>(null);
  const route = useRouter();

  const handlePrev = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const handleClick = (activity: string, item: string) => {
    const slugItem = item.replace(/ /g, "-").toLowerCase();
    route.push(`/activity?title=${activity}&item=${slugItem}`);
  };

  return (
    <Swiper
      ref={sliderRef}
      slidesPerView={3}
      spaceBetween={20}
      autoplay={{
        delay: 1000,
        pauseOnMouseEnter: true,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Keyboard]}
      className="mySwiper mt-10 mb-5"
    >
      {dataSlider.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div 
            onClick={() => handleClick(item.activity, item.name)}
            className="relative mb-10 cursor-pointer">
              <img
                src={item.url}
                alt="image"
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/70 p-2">
                <h1 className="text-white text-lg font-bold">{item.name}</h1>
                <p className="text-white text-sm">{item.activity}</p>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
      <div
        onClick={handlePrev}
        className="prev-arrow z-30 bg-slate-500 flex items-center h-[80px] absolute top-1/3 left-0 cursor-pointer rounded-r-md bg-opacity-80"
      >
        <FiChevronLeft className="text-4xl text-white" />
      </div>
      <div
        onClick={handleNext}
        className="next-arrow z-30 bg-slate-500 flex items-center h-[80px] absolute top-1/3 right-0 cursor-pointer rounded-l-md bg-opacity-80"
      >
        <FiChevronRight className="text-4xl text-white" />
      </div>
    </Swiper>
  );
};

export default ActivitySlider;
