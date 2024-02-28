import BannerContact from "../components/section/bannerContact";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdAttachEmail } from "react-icons/md";
import FormContact from "../components/section/formContact";
import Footer from "../components/section/footer";

const Contactus: React.FC = () => {
  return (
    <div className="w-full relative pt-[69px]">
      <BannerContact />
      <div className="cust-container relative">
        
        {/* LEFT Side */}
        <div className="w-full grid grid-cols-2 gap-10 justify-between absolute -top-10 pb-10">
          <div className="flex flex-col gap-5">
            <div className="w-full flex items-center gap-5 p-5 bg-white border drop-shadow-sm">
              <BsFillTelephoneFill className="text-5xl text-custPrimary" />
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-custBlack">
                  Call us
                </h1>
                <p className="text-custBlack/80 text-sm">
                  We are here to help you with any question you might have.
                </p>
                <div className="flex justify-start gap-3 mt-1 text-custBlack/50">
                  <p>SG : +5766504412</p>
                  <p>INA : (0778)-711322</p>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center gap-5 p-5 bg-white border drop-shadow-sm">
              <MdAttachEmail className="text-5xl text-custPrimary" />
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-custBlack">
                  Mail us
                </h1>
                <p className="text-custBlack/80 text-sm">
                  Email us with any question or inquiries or call us.
                </p>
                <a
                  href="mailto:info@citramas-foundation.com"
                  className="mt-1 text-custBlack/50"
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
