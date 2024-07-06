import CustBannerMission from "../atoms/custBannerMission";

const dataBannerMission = [
  {
    title: "Our Vision",
    desc: "To improve and elevate the livelihood of the community in Batam"
  },
  {
    title: "Our Mission",
    desc: "Creating sustainable programs in areas of education; healthcare; social and sports development"
  },
];

const BannerMission = () => {
  return (
    <div className="grid w-full md:grid-cols-2 gap-8 md:gap-5 px-5 pt-5 pb-10">
      {dataBannerMission.map((item, index) => {
        return <CustBannerMission key={index} title={item.title} desc={item.desc} />;
      })}
    </div>
  );
};

export default BannerMission;
