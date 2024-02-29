import CustBannerPage from "../components/atoms/custBannerPage";
import banner from "@/app/assets/cs-contact.jpg";

const Page: React.FC = () => {
  return (
    <div className="w-full relative pt-[69px]">
      <div className="drop-shadow-sm">
        <CustBannerPage
          title="Our News"
          desc="A collection of news related to activities and announcements from the Citramas Foundation"
          img={banner}
        />
      </div>
      <div className="cust-container py-5">
        News
      </div>
    </div>
  );
};

export default Page;
