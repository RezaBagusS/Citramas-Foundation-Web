import CustBannerMission from "../atoms/custBannerMission";

const dataBannerMission = [
  {
    title: "Our Vision",
    desc: "Organizing social welfare programs in the education sector; health; social; and sports development."
  },
  {
    title: "Our Mission",
    desc: "Create sustainable programs to improve the standard of living environment and create jobs that encourage individuals to improve their skills."
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
