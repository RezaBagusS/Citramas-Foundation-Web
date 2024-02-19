interface CustBannerMissionProps {
    text: string;
}

const CustBannerMission = ({ text }: CustBannerMissionProps) => {
  return (
    <div className="bg-slate-100 rounded-md px-5 py-4 ring-2 ring-custPrimary/30">
      <p className="text-gray-600 text-sm text-start">
        {text}
      </p>
    </div>
  );
};

export default CustBannerMission;
