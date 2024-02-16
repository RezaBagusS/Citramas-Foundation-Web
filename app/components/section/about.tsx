import CustTagTittle from "../atoms/custTagTittle";
import Image from "next/image";
import logoPotrait from "../../assets/logoPotrait.jpg";

const About = () => {
  return (
    <div className="cust-container relative pt-20">
      <CustTagTittle text="Citramas Foundation" />
      <div className="grid grid-cols-12 py-10">
        <div className="col-span-3 grid place-content-center">
          <Image src={logoPotrait} alt="hero" width={200} />
        </div>
        <div className="col-span-9 flex flex-col text-sm gap-2">
          <p>
            Citramas Foundation is a charitable organization involved in
            ameliorating the conditions of upbringing for children in Indonesia.
            Its field of activity includes financial, medical and educational
            aspects, as well as any daily minutiae that could impact a child's
            life.
          </p>
          <p>
            At its crux, the Citramas Foundation enterprise reflects the dictum
            of its Founder; that the supplication of a strong fundamental,
            whether through medicine or education, is the catalyst for
            maximizing the potential of every child.
          </p>

          <p>
            Founded in 2003 by Mr Kris Taenar Wiluan, Citramas Foundation was
            envisioned as a concomitant entity that would assist acutely
            disadvantaged staff members in the upkeep of their households by
            availing to these beneficiaries educational sponsorships and
            financial support. The fledgling efforts of the foundation brought
            them to the community of Batam Island.
          </p>

          <p>
            More contemporarily, Citramas Foundation has expanded its reach to
            encompass both staff and the community in Batam Island. As well as
            expanding its host of beneficiaries, Citramas Foundation has
            increased collaborations with both regional and international
            institutions to augment its impact on the lives of Indonesian
            children.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
