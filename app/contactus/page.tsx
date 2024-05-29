import CustBannerPage from "@/app/components/atoms/custBannerPage";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdAttachEmail } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
import FormContact from "../components/section/formContact";
import banner from "@/app/assets/cs-contact.png";

const Contactus: React.FC = () => {
  return (
    <div className="w-full relative pt-[69px]">
      <CustBannerPage
        title="Get in touch"
        desc="We are here to help and answer any question you might have. We look forward to hearing from you."
        img={banner}
      />
      <div className="cust-container relative -top-10">
        {/* LEFT Side */}
        <div className="w-full grid grid-cols-2 gap-10 justify-between pb-10">
          <div className="flex flex-col gap-5 col-span-2 lg:col-span-1">
            <div className="w-full flex items-center gap-5 p-5 bg-white border drop-shadow-sm">
              <BsBank2 className="text-5xl text-custPrimary" />
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-semibold text-custBlack">
                  Bank Account
                </h1>
                <p className="text-custBlack/80 text-xs md:text-sm">
                  Transfer your donation to our bank account.
                  <br />
                </p>
                <p className="mt-2 text-custBlack/80 text-xs md:text-sm">Yayasan Citramas (CIMB NIAGA) :</p>
                <div className="flex justify-start gap-3 mt-1 text-sm md:text-base text-custBlack/50">
                  <p>IDR : 800124446300</p>
                  <p>SGP : 800124454402</p>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center gap-5 p-5 bg-white border drop-shadow-sm">
              <MdAttachEmail className="text-5xl text-custPrimary" />
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-semibold text-custBlack">
                  Mail us
                </h1>
                <p className="text-custBlack/80 text-xs md:text-sm">
                  Email us with any question or inquiries or call us.
                </p>
                <a
                  href="mailto:info@citramas-foundation.com"
                  className="mt-1 text-custBlack/50 text-sm md:text-base"
                >
                  info@citramas-foundation.com
                </a>
              </div>
            </div>
          </div>

          {/* FORM */}
          <FormContact />
        </div>
      </div>
    </div>
  );
};

export default Contactus;
