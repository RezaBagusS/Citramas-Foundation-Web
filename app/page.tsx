import Image from "next/image";
import Navbar from "./components/molecules/navbar";
import Hero from "./components/section/hero";
import About from "./components/section/about";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
}
