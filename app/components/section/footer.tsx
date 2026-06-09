import Image from "next/image";
import logo from "../../assets/logo.png";
import { MdHomeWork } from "react-icons/md";
import { FaPhoneAlt, FaInstagram, FaTiktok } from "react-icons/fa";
import { IoPhonePortrait } from "react-icons/io5";
import { MdAttachEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-custWhite">
      <div className="cust-container overflow-hidden grid grid-cols-12 gap-y-10 md:gap-0 border-t-2 py-12 text-custWhite">
        <div className="col-span-12 md:col-span-4 flex flex-col gap-5">
          <Image src={logo} alt="logo" width={200} className="h-auto" />
          <p className="text-gray-500 text-xs sm:text-sm w-full sm:w-8/12 md:w-full">
            The Citramas Foundation is a charitable organization that
            participates in improving the educational conditions of children in
            Indonesia.
          </p>
          <div className="flex gap-4 items-center mt-1">
            <a
              href="https://www.instagram.com/citramasfoundation?igsh=cGlwa2I5ZHB4Y28w&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-custPrimary transition duration-150 text-2xl"
              aria-label="Citramas Foundation Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@citramas.foundation?_r=1&_t=ZS-9PfTM6oxgP"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-custPrimary transition duration-150 text-xl"
              aria-label="Citramas Foundation TikTok"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 flex md:justify-end">
          <div className="lg:pr-20">
            <h4 className="text-custBlack/80 mb-2 sm:mb-5 font-semibold">
              Our Address
            </h4>
            <ul className="text-gray-500 w-80 flex flex-col gap-3 text-xs sm:text-sm">
              <li className="flex w-full">
                <div className="w-5 h-5 flex-shrink-0">
                  <MdHomeWork className="inline-block mr-2" />
                </div>
                <a
                  href="https://maps.app.goo.gl/E7NKTt7EBrPwH7477"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-custPrimary transition-all duration-150"
                >
                  Jalan Hang Kesturi KM. 4. Komplek Ruko Citranusa Niaga Blok A2
                  No. 1. Kawasan Industri Terpadu Kabil. Batam 29467.
                </a>
              </li>
              {/* <li>
                <FaPhoneAlt width={5} className="inline-block mr-2" />
                +5766504412 (SG)
              </li>
              <li>
                <IoPhonePortrait width={5} className="inline-block mr-2" />
                (0778)-711322 (INA)
              </li>
              <li>
                <MdAttachEmail width={5} className="inline-block mr-2" />
                info@citramas-foundation.com
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-custPrimary text-custWhite text-center py-5">
        <p className="text-xs sm:text-sm">
          © 2024 Citramas Foundation. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
