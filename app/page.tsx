'use client'

import Navbar from "./components/molecules/navbar";
import Hero from "./components/section/hero";
import About from "./components/section/about";
import Activity from "./components/section/activity";
import News from "./components/section/news";
import Map from "./components/section/map";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setKeyword } from "./redux/slices/reduxKeywordSearchSlices";

export default async function Home() {

  const location = usePathname();
  const dispacth = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    dispacth(setKeyword({
      keyword: ""
    }))


  }, [location]);

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      {/* <Activity /> */}
      <News />
      {/* <Map /> */}
    </main>
  );
}
