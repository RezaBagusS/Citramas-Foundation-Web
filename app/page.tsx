import Navbar from "./components/molecules/navbar";
import Hero from "./components/section/hero";
import About from "./components/section/about";
import Activity from "./components/section/activity";
import News from "./components/section/news";
import Map from "./components/section/map";
import InstagramEmbedSection from "./components/section/instagramEmbed";

export const dynamic = 'force-dynamic'; // <--- Tambahkan baris ini

export default function Home() {

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Activity />
      <News />
      <InstagramEmbedSection />
      {/* <Map /> */}
    </main>
  );
}
