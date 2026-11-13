import type { Metadata } from "next";
import Approach from "@/components/sections/Approach";
import AreaCards from "@/components/sections/AreaCards";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import WhatWeDo from "@/components/sections/WhatWeDo";
import { team } from "@/data/team";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ description: team.description, path: "/" });

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
