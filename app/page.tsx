import Image from "next/image";
import Navbar from "./components/molecules/navbar";
import Hero from "./components/section/hero";
import About from "./components/section/about";
import Activity from "./components/section/activity";
import News from "./components/section/news";
import Footer from "./components/section/footer";
import Map from "./components/section/map";

export default async function Home() {

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Activity />
      <News />
      <Map />
    </main>
  );
}
