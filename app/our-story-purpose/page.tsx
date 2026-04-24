"use client";
import React from "react";
import Banner from "@/components/Banner";
import ThreeImageSection from "@/layout/ThreeImageSection";
import InlineImageSection from "@/layout/InlineImageSection";
import ImageGridSection from "@/layout/ImageGridSection";

const threeImageSectionItems = [
  {
    imgSrc: "/images/our-story-purpose/responsible-innovation.webp",
    title: "Responsible Innovation",
    description: "Advancing nutraceutical science while keeping people and the planet at the core."
  },
  {
    imgSrc: "/images/our-story-purpose/empowering-partners.webp",
    title: "Empowering Partners",
    description: "Extending our CDMO expertise to global partners to co-create cutting-edge formulations and delivery systems."
  },
  {
    imgSrc: "/images/our-story-purpose/crafting-solutions.webp",
    title: "Crafting Avant-Garde Solutions",
    description: "From advanced actives to next-gen dosage forms, we pioneer the nutraceuticals of tomorrow."
  },
];

const page: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <Banner
        imgSrc="/images/our-story-purpose/our-story-purpose-banner.webp"
        title={"Our Story & \n Purpose"}
        subCopy="Enriching Lives Since 1974"
      />
      <ImageGridSection
        heading={"Merging Legacy With \n Pioneering Spirit"}
        text="For 50 years, we’ve balanced the credibility of experience with the curiosity of innovation. What began in 1974 as a dream to bring Ayurveda to the global stage has evolved into a powerhouse of scientifically proven health solutions trusted worldwide."
        imgSmall="/images/our-story-purpose/legacy-small.webp"
        imgBig="/images/our-story-purpose/legacy-big.webp"
      />
      <InlineImageSection
        imgSrc="/images/our-story-purpose/our-impact.webp"
        title="Our Impact"

        text="Through decades of research and innovation, we are helping people access clean, proven and purposeful nutraceutical solutions.Today, we power leading health brands and address the most pressing health challenges from women’s health to cognition and immunity."
      />
      <ThreeImageSection
        heading={"The Future Of \n Better Living"}
        threeImageSectionItems={threeImageSectionItems}
      />
    </main>
  );
};

export default page;
