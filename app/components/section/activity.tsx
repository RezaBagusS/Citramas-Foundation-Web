import Image from "next/image";
import bgActivity from "../../assets/bgActivity.png";
import CustCardActivity from "../atoms/custCardActivity";

const dataActivity = [
  {
    program: "Health programs",
    link: "/activity?title=Health&item=eye-screening",
  },
  {
    program: "Education programs",
    link: "/activity?title=Education&item=scholarships",
  },
  {
    program: "Social Community Programs",
    link: "/activity?title=Sport&item=sport-hall,-futsal-and-citramas-stadium",
  },
  {
    program: "Sports programs",
    link: "/activity?title=Social Community&item=providing-educational-assistance-(august-2023)",
  },
];

const Activity = () => {
  return (
    <div className="relative h-96 bg-black mb-10">
      <Image
        src={bgActivity}
        alt="hero"
        fill
        className="opacity-50 object-cover"
      />
      <div className="cust-container absolute top-0 left-1/2 -translate-x-1/2 grid grid-cols-12 gap-3 lg:gap-0 place-content-center h-full">
        <div className="h-32 md:h-40 lg:h-52 col-span-12 lg:col-span-3 grid place-content-center aspect-square mx-auto rounded-full border-8 border-custWhite/60">
          <p className="text-white flex flex-col justify-center items-center">
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold">
              40+
            </span>
            <br />
            <span className="text-sm font-semibold">Activities</span>
          </p>
        </div>
        <div className="col-span-12 lg:col-span-9">
          <div className="grid md:grid-cols-2 md:grid-rows-2 gap-2 h-full">
            {dataActivity.map((item, index) => {
              return <CustCardActivity key={index} text={item.program} link={item.link} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
