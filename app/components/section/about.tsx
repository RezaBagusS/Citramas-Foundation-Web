import CustTagTittle from "../atoms/custTagTittle";
import Image from "next/image";
import logoPotrait from "../../assets/logoPotrait.png";
import BannerMission from "../molecules/bannerMission";
import pendiri from "../../assets/pendiri.png";

const About = () => {
  return (
    <div className="cust-container relative pt-20">
      <CustTagTittle text="About" />
      <div className="grid grid-cols-12 py-4 md:py-10">
        <div className="col-span-3 hidden lg:grid place-content-center">
          <Image src={logoPotrait} alt="hero" width={200} />
        </div>
        <div className="col-span-12 lg:col-span-6 text-custBlack/80 flex flex-col text-xs md:text-sm gap-2 mb-5 md:mb-0">
          <p className="text-justify">
            Citramas Foundation is a charitable organization involved in
            ameliorating the conditions of upbringing for children in Indonesia.
            Its field of activity includes financial, medical and educational
            aspects, as well as any daily minutiae that could impact a child&apos;s
            life.
          </p>
          <p className="text-justify">
            At its crux, the Citramas Foundation enterprise reflects the dictum
            of its Founder; that the supplication of a strong fundamental,
            whether through medicine or education, is the catalyst for
            maximizing the potential of every child.
          </p>

          <p className="text-justify">
            Founded in 2003 by Mr Kris Taenar Wiluan, Citramas Foundation was
            envisioned as a concomitant entity that would assist acutely
            disadvantaged staff members in the upkeep of their households by
            availing to these beneficiaries educational sponsorships and
            financial support. The fledgling efforts of the foundation brought
            them to the community of Batam Island.
          </p>

          <p className="text-justify">
            More contemporarily, Citramas Foundation has expanded its reach to
            encompass both staff and the community in Batam Island. As well as
            expanding its host of beneficiaries, Citramas Foundation has
            increased collaborations with both regional and international
            institutions to augment its impact on the lives of Indonesian
            children.
          </p>
        </div>
        <div className="col-span-6 grid lg:hidden place-content-center">
          <Image src={logoPotrait} alt="hero" className="w-[120px]" />
        </div>
        <div className="col-span-6 lg:col-span-3 grid gap-3 place-content-center">
          <Image src={pendiri} alt="hero" className="w-[120px] lg:w-[240px] mx-auto" />
          <div className="flex flex-col items-center w-fit mx-auto">
            <h2 className="font-semibold text-sm md:text-lg text-custPrimary">Kris Wiluan</h2>
            <p className="text-custBlack/70 text-sm md:text-base">Founder Citramas Group</p>
          </div>
        </div>
      </div>
      <BannerMission />
    </div>
  );
};

export default About;
