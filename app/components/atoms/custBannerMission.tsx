interface CustBannerMissionProps {
  desc: string;
  title: string;
}

const CustBannerMission = ({ desc, title }: CustBannerMissionProps) => {
  return (
    <div className="relative bg-slate-100 rounded-md px-5 py-4 ring-2 ring-custPrimary/30">
      <h1 className="text-sm md:text-base italic font-bold absolute -top-5 md:-top-6 right-1/2 translate-x-1/2 ring-2 ring-custPrimary/30 bg-custPrimary text-custWhite -skew-y-12 rotate-12 px-3 py-1">{title}</h1>
      <p className="text-gray-600 text-xs md:text-sm text-start">
        {desc}
      </p>
    </div>
  );
};

export default CustBannerMission;
