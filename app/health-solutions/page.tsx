"use client";
import React from "react";
import Banner from "@/components/Banner";
import BannerCarouselSection from "@/layout/BannerCarouselSection";
import { healthSections } from "@/data/healthSolutionsData";
import { useFooter } from "@/context/FooterContext";

const page: React.FC = () => {
  const { setFooterContent } = useFooter();
  
  React.useEffect(() => {
    setFooterContent({
      heading: "Targeted Solutions. \n Backed by Science",
      description: "A portfolio of clinically supported ingredients designed for real-world health outcomes.",
      buttonText: "Contact Us",
      buttonLink: "/contact-us"
    });
    return () => setFooterContent(null);
  }, [setFooterContent]);
  
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
          textMaxWidth="max-w-[90%] xl:max-w-142 2xl:max-w-[80%]"
          textColor="textSecondary"
          bannerCarouselItems={section.bannerCarouselItems}
        />
      ))}
    </main>
  );
};

export default page;
