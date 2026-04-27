"use client";
import React from "react";
import Banner from "@/components/Banner";
import BannerCarouselSection from "@/layout/BannerCarouselSection";

const bannerCarouselItems = [
  {
    title: "EstroMira™",
    text: "Aids in hormonal balance and women’s wellness across every life stage.",
    imgSrc: "/images/products/estromira.webp",
    href: "/products/estromira",
  },
  {
    title: "Eve226™",
    text: "Supports PMS management and menstrual cycle regularity.",
    imgSrc: "/images/products/eve226.webp",
    href: "/products/estromira",
  },
  {
    title: "Miazen™",
    text: "Promotes menstrual comfort and relieves PMS-related symptoms.",
    imgSrc: "/images/products/miazen.webp",
    href: "/products/estromira",
  }
];

const page: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <Banner
        imgSrc="/images/health-solutions/health-solutions-banner.webp"
        title={"Innovation-Led \n Wellness"}
        subCopy="We deliver effective, scalable nutraceutical solutions across wellness categories to change the landscape of health and nutrition worldwide."
      />
      <BannerCarouselSection
        heading="Women’s Health"
        text="Hormonal imbalances affect millions of women, disrupting their everyday life. Our clinically backed bioactives nurture balance, vitality and comfort to her across every life stage."
        textMaxWidth="max-w-[87%] ml-auto"
        textColor="textSecondary"
        bannerCarouselItems={bannerCarouselItems}
      />
    </main>
  );
};

export default page;
