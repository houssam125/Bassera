import Approach from "@/components/sections/Approach";
import AreaCards from "@/components/sections/AreaCards";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import WhatWeDo from "@/components/sections/WhatWeDo";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <AreaCards />
      <WhatWeDo />
      <Approach />
    </>
  );
}
