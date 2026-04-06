"use client";
import React from "react";
import Banner from "@/components/Banner";
import InlineListingSection from "@/layout/InlineListingSection";
import CarouselSection from "@/layout/CarouselSection";
import Cdmo from "./Cdmo";

const inlineListItems = [
  {
    imgSrc: "/images/sustainability-responsibility/empowering-farmers.webp",
    title: "Empowering Farmers",
    text: "Partnering with local cultivators to ensure fair trade, skill training and better livelihood.",
  },
  {
    imgSrc: "/images/sustainability-responsibility/transparency-traceability.webp",
    title: "Transparency & Traceability",
    text: "End-to-end ingredient journey from ethical sourcing to shelf.",
  },
  {
    imgSrc: "/images/sustainability-responsibility/health-equity.webp",
    title: "Health Equity",
    text: "Making nutraceutical wellness accessible across geographies and bridging the gap between ancient Ayurvedic science and modern science.",
  },
  {
    imgSrc: "/images/sustainability-responsibility/innovation-integrity.webp",
    title: "Innovation With Integrity",
    text: "70+ patents with a commitment to safety, ethics, and clinical validation.",
  }
]

const carouselItems = [
  {
    imgSrc: "/images/sustainability-responsibility/sustainable-sourcing.webp",
    title: "Sustainable Sourcing",
    text: "Ethically grown botanicals, traced from farm to formulation.",
  },
  {
    imgSrc: "/images/sustainability-responsibility/water-stewardship.webp",
    title: "Water Stewardship",
    text: "Harvesting, recycling, and reusing water to preserve every drop.",
  },
  {
    imgSrc: "/images/sustainability-responsibility/waste-reduction.webp",
    title: "Waste Reduction",
    text: "Reusing plant residues for compost, biofuel, and feed instead of disposal.",
  },
  {
    imgSrc: "/images/sustainability-responsibility/clean-energy.webp",
    title: "Clean Energy",
    text: "Renewable power drives our 6 GMP-certified facilities.",
  }
]

const page: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <Banner
        imgSrc="/images/sustainability-responsibility/sustainability-responsibility-banner.webp"
        title={"Sustainability & \n Ethics Above All"}
        subCopy="Our commitment to quality is inseparable from our responsibility to the planet."
      />
      <CarouselSection
        heading={"Protecting What \n Sustains Us"}
        text="We protect nature’s balance and nurture human wellbeing in every step, giving back to the source that shapes us."
        bgColor="backgroundSecondary"
        textColor="textSecondary"
        textMaxWidth="max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]"
        carouselItems={carouselItems}
      />
      <InlineListingSection
        heading="Innovating Responsibly"
        text="At Laila Nutra, every formulation is devised with the belief that true wellness can only thrive when both people and the planet thrive well."
        textColor="textSecondary"
        textMaxWidth="max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]"
        inlineListItems={inlineListItems}
        inlineListStructure="col-span-4 md:col-span-2"
        inlineListDetailsStructure="col-span-3 sm:col-span-9 lg:col-span-4 ml-6" inlineListImgStructure="col-span-1 sm:col-span-3 lg:col-span-2"
      />
      <Cdmo />
    </main>
  );
};

export default page;
