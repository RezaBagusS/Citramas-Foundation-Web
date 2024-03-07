import CustBannerMission from "../atoms/custBannerMission";

const dataBannerMission = [
  "Organizing social welfare programs in the education sector; health; social; and sports development.",
  "Create sustainable programs to improve the standard of living environment and create jobs that encourage individuals to improve their skills.",
];

const BannerMission = () => {
  return (
    <div className="relative w-full">
      <h1 className="text-sm md:text-base italic font-bold absolute top-1 md:-top-1 right-1/2 translate-x-1/2 ring-2 ring-custPrimary/30 bg-custPrimary text-custWhite -skew-y-12 rotate-12 px-3 py-1">Our Mission</h1>
      <div className="grid md:grid-cols-2 gap-5 px-5 pt-5 pb-10">
        {dataBannerMission.map((item, index) => {
          return <CustBannerMission key={index} text={item} />;
        })}
      </div>
    </div>
  );
};

export default BannerMission;
