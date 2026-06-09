import CustBannerPage from "@/app/components/atoms/custBannerPage";
import banner from "@/app/assets/about_us_banner.png";
import About from "../components/section/about";

const AboutUsPage = () => {
  return (
    <div className="w-full relative pt-[69px]">
      <CustBannerPage
        title="About Us"
        desc="Citramas Foundation is dedicated to empowering communities through education, environment, and social development."
        img={banner}
      />
      <div className="pb-16">
        <About />
      </div>
    </div>
  );
};

export default AboutUsPage;
