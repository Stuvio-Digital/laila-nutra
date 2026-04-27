"use client";
import React from "react";
import Banner from "@/components/Banner";
import BannerCarouselSection from "@/layout/BannerCarouselSection";
import { healthSections } from "@/data/healthSolutionsData";

const page: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <Banner
        imgSrc="/images/health-solutions/health-solutions-banner.webp"
        title={"Innovation-Led \n Wellness"}
        subCopy="We deliver effective, scalable nutraceutical solutions across wellness categories to change the landscape of health and nutrition worldwide."
      />
      {healthSections.map((section, index) => (
        <BannerCarouselSection
          key={index}
          heading={section.heading}
          text={section.text}
          textMaxWidth="max-w-[87%] lg:ml-auto"
          textColor="textSecondary"
          bannerCarouselItems={section.bannerCarouselItems}
        />
      ))}
    </main>
  );
};

export default page;
