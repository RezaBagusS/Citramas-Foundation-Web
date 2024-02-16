import { FC } from "react";
import Endeavour from "../molecules/endeavour";

const Hero: FC = () => {
  return (
    <div className="bgHero h-screen">
      <div className="bg-black bg-opacity-70 h-full">
        <main className="cust-container flex flex-col gap-3 justify-center text-custWhite h-full">
          <h1 className="text-5xl font-bold">Citramas Foundation Batam</h1>
          <p className="text-2xl italic">
            Empowering Communities: Education, Environment, <br /> Skills for a
            Sustainable Future
          </p>
        </main>
      </div>
      <div className="relative">
        <Endeavour />
      </div>
    </div>
  );
};

export default Hero;
