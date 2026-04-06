"use client";
import React from "react";
import Banner from "@/components/Banner";

const page: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <Banner
        imgSrc="/images/health-solutions/health-solutions-banner.webp"
        title={"Innovation-Led \n Wellness"}
        subCopy="We deliver effective, scalable nutraceutical solutions across wellness categories to change the landscape of health and nutrition worldwide."
      />
    </main>
  );
};

export default page;
