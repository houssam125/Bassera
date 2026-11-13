import type { Metadata } from "next";
import Products from "@/components/sections/Products";
import Stack from "@/components/sections/Stack";
import TechServices from "@/components/sections/TechServices";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Websites, CRM & ERP systems and mobile apps",
  description:
    "Websites, web platforms, CRM and ERP systems, and Flutter mobile apps — designed, built and deployed end to end by Bassera, Algeria.",
  path: "/tech",
});

export default function TechPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <p className="kicker">Area 02 · Technology</p>
          <h1>
            Websites, systems &amp; <span className="mark">mobile apps</span>.
          </h1>
          <p className="page-lead">
            We design and build websites, web platforms, CRM and ERP systems, and mobile apps with Flutter — from the
            interface people see to the back-end and data behind it, deployed and cared for after launch.
          </p>
        </div>
      </section>

      <TechServices />
      <Products />
      <Stack />
    </>
  );
}
