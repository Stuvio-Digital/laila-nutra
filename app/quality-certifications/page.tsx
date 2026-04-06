"use client";
import React from "react";
import Banner from "@/components/Banner";
import WhiteCardCarouselSection from "@/layout/WhiteCardCarouselSection";
import OverlayBannerSection from "@/layout/OverlayBannerSection";
import ThreeImageSection from "@/layout/ThreeImageSection";
import Awards from "./Awards";
import BlackSection from "@/layout/BlackSection";

const whiteCardCarouselItems = [
  {
    title: "US FDA Registered",
    text: "Meeting U.S. regulatory and manufacturing standards."
  },
  {
    title: "cGMP (Good Manufacturing Practices)",
    text: "Ensuring quality and safety from raw material to finished product."
  },
  {
    title: "FSSC 22000 Certified",
    text: "Guaranteeing food safety management at every step."
  },
  {
    title: "ISO 9001:2015 Certified",
    text: "Delivering consistent quality across processes."
  },
  {
    title: "Halal & Kosher Certified",
    text: "Compliant with diverse global dietary standards."
  },
  {
    title: "Non-GMO & Allergen-Free",
    text: "Committed to clean, safe formulations for every consumer."
  },
];

const overlayBannerItems = [
  { iconSrc: '/icons/emergency_share.svg', iconAlt: "Emergency Share", text: 'Ethically grown botanicals, traced from farm to formulation.' },
  { iconSrc: '/icons/science.svg', iconAlt: "Science", text: 'Separate facilities for extracts, formulations, and packaging.' },
  { iconSrc: '/icons/precision_manufacturing.svg', iconAlt: "Precision Manufacturing", text: 'Automated quality control and data traceability systems.' },
  { iconSrc: '/icons/checklist_rtl.svg', iconAlt: "Continuous upgradation", text: 'Continuous upgradation and audits by global regulatory authorities.' }
];

const threeImageSectionItems = [
  {
    imgSrc: "/images/quality-certifications/traceability.webp",
    title: "Traceability",
    description: "Every ingredient can be tracked from seed to shelf."
  },
  {
    imgSrc: "/images/quality-certifications/purity.webp",
    title: "Purity",
    description: "Rigorous multi-stage testing ensures each batch meets international standards."
  },
  {
    imgSrc: "/images/quality-certifications/integrity.webp",
    title: "Integrity",
    description: "Transparency and compliance guides every decision we make."
  },
];

const qualityCertificationsData = [
  {
    title: "Raw Material Authentication",
    description: "Verified through botanical and chemical fingerprinting.",
    image: "/images/quality-certifications/raw-material-authentication.webp"
  },
  {
    title: "In-Process Quality Checks",
    description: "Continuous monitoring during extraction and formulation.",
    image: "/images/quality-certifications/in-process-quality-checks.webp"
  },
  {
    title: "Microbiological & Heavy Metal Screening",
    description: "Ensures absolute purity and safety.",
    image: "/images/quality-certifications/microbiological-heavy-metal-screening.webp"
  },
  {
    title: "Clinical Validation",
    description: "Proven efficacy through documented studies and trials.",
    image: "/images/quality-certifications/clinical-validation.webp"
  },
  {
    title: "Batch Certification",
    description: "Every batch is traceable, tested, and certified before export.",
    image: "/images/quality-certifications/batch-certification.webp"
  }
];


const page: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <Banner
        imgSrc="/images/quality-certifications/quality-certifications-banner.webp"
        title={"Wellness You \n Can Trust"}
        subCopy="We don't just meet standards, we redefine them in Japan, USA, Australia and 20+ other countries."
      />
      <ThreeImageSection
        heading={"Uncompromising Quality. \n Assured Excellence."}
        text="Our ingredients and solutions meet the world’s most stringent quality and safety standards because wellness deserves nothing less."
        threeImageSectionItems={threeImageSectionItems}
      />
      <WhiteCardCarouselSection
        heading={"Globally Certified and \n Recognised"}
        text="Our facilities are certified by leading international bodies to ensure consistency, safety and efficacy in every solution."
        textMaxWidth="max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]"
        headingColor="black"
        textColor="textSecondary"
        whiteCardCarouselItems={whiteCardCarouselItems}
      />
      <BlackSection 
        heading={"Testing & Validation \n Process"} 
        text="Every Laila Nutra product undergoes multiple layers of testing and validation ensuring unmatched quality, efficacy, and safety." 
        textColor="text-white70" 
        textMaxWidth="max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]"
        data={qualityCertificationsData}
      />
      <OverlayBannerSection
        heading={"State-of-the-Art \n Facilities"}
        text="Our GMP-certified, tech-enabled manufacturing network combines automation, precision, and global best practices to deliver world-class nutraceuticals."
        ctaContent="Know More"
        ctaHref="#"
        headingColor="white"
        textMaxWidth="max-w-142 lg:max-w-none"
        textColor="white"
        classNameTextStructure="col-span-4 sm:col-span-12 lg:col-span-3 lg:col-start-10"
        bgImageSrc="/images/quality-certifications/state-of-art-facilities.webp"
        bgImageAlt="State of the Art Facilities"
        overlayBannerItems={overlayBannerItems}
      />
      <Awards />
    </main>
  );
};

export default page;
