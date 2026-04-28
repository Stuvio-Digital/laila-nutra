"use client";
import React from "react";
import Banner from "@/components/Banner";
import ThreeImageSection from "@/layout/ThreeImageSection";
import InlineImageSection from "@/layout/InlineImageSection";
import ImageGridSection from "@/layout/ImageGridSection";
import BlackSection from "@/layout/BlackSection";

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

const ourPurposeData = [
  {
    title: "Bridge Heritage & Science",
    description: "Carry forward Ayurveda’s authenticity while pioneering global nutraceutical research.",
    image: "/images/our-story-purpose/bridge-heritage-science.webp"
  },
  {
    title: "Innovate Relentlessly",
    description: "Deliver patented, clinically validated actives that set benchmarks for efficacy and trust.",
    image: "/images/our-story-purpose/innovate-relentlessly.webp"
  },
  {
    title: "Empower Global Wellness",
    description: "Create safe, transparent and traceable solutions for healthier lives everywhere.",
    image: "/images/our-story-purpose/empower-global-wellness.webp"
  },
  {
    title: "Build on Trust & Legacy",
    description: "Use 50 years of credibility to inspire the next 50 years of transformation.",
    image: "/images/our-story-purpose/build-trust-legacy.webp"
  },
];

const page: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <Banner
        imgSrc="/images/our-story-purpose/our-story-purpose-banner.webp"
        title={"Our Story & \n Purpose"}
        subCopy="Enriching Lives Since 1976"
      />
      <ImageGridSection
        heading={"Merging Legacy With \n Pioneering Spirit"}
        text="For 50 years, we’ve balanced the credibility of experience with the curiosity of innovation. What began in 1976 as a dream to bring Ayurveda to the global stage has evolved into a powerhouse of scientifically proven health solutions trusted worldwide."
        imgSmall="/images/our-story-purpose/legacy-small.webp"
        imgBig="/images/our-story-purpose/legacy-big.webp"
      />
      <BlackSection
        heading={"Our Purpose"}
        data={ourPurposeData}
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
