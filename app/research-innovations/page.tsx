"use client";
import React from "react";
import Banner from "@/components/Banner";
import OverlayBannerSection from "@/layout/OverlayBannerSection";
import FeatureImageGridSection from "@/layout/FeatureImageGridSection";
import ImageGridSection from "@/layout/ImageGridSection";

const overlayBannerItems = [
  { iconSrc: '/icons/emergency_share.svg', iconAlt: "Controlled Temperatures", text: 'Controlled Temperatures' },
  { iconSrc: '/icons/science.svg', iconAlt: "Optimised Extraction", text: 'Optimised Extraction' },
  { iconSrc: '/icons/precision_manufacturing.svg', iconAlt: "Batch-level Monitoring", text: 'Batch-level Monitoring' },
  { iconSrc: '/icons/checklist_rtl.svg', iconAlt: "Protocols", text: '⁠Zero-compromise Hygiene Protocols' }
];

const featureGridItem = [
  {
    image: "/images/research-innovations/what-we-offers.webp",
    subTitle: "What we offer",
    orderClassFeature: "lg:order-2",
    orderClassImage: "lg:order-1",
    featureItems: [
      {
        icon: "/icons/license_black.svg",
        title: "Patent-backed dossiers"
      },
      {
        icon: "/icons/description.svg",
        title: "Claim-support documentation"
      },
      {
        icon: "/icons/lock_reset.svg",
        title: "Locked-in differentiation for the lifecycle of your product"
      }
    ]
  },
  {
    image: "/images/research-innovations/why-it-matters.webp",
    subTitle: "Why it matters",
    orderClassFeature: "lg:order-1",
    orderClassImage: "lg:order-2",
    featureItems: [
      {
        icon: "/icons/verified.svg",
        title: "A defensible USP backed by legally protected science"
      },
      {
        icon: "/icons/task.svg",
        title: "Stronger claims built on proprietary clinical data"
      },
      {
        icon: "/icons/published_with_changes.svg",
        title: "Exclusive ingredient access with long-term category advantage"
      }
    ]
  }
]

const page: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <Banner
        imgSrc="/images/research-innovations/research-innovations-banner.webp"
        title={"Innovation Built \n On Evidence"}
        subCopy="We engineer patents for global wellness brands that stand the test of scrutiny."
      />
      <ImageGridSection
        heading={"Research That Delivers"}
        text="Our R&D philosophy begins long before an ingredient shows promise. Every extract, every fraction, every delivery system we build goes through months of exploration, not because the industry demands it, but because we do."
        imgSmall="/images/research-innovations/research-small.webp"
        imgBig="/images/research-innovations/research-big.webp"
      />
      <OverlayBannerSection
        heading={"Global-Grade \n Manufacturing"}
        text="In order to consistently deliver to global brand partners and markets, we follow strict standards - GMP, FSSAI and ISO. Every stage of the process is logged, reviewed and cross-verified."
        headingColor="white"
        textMaxWidth="max-w-142 lg:max-w-none"
        textColor="white"
        classNameTextStructure="col-span-4 sm:col-span-12 lg:col-span-3 lg:col-start-10"
        bgImageSrc="/images/research-innovations/global-grade-manufacturing.webp"
        bgImageAlt="Global-Grade Manufacturing"
        overlayBannerItems={overlayBannerItems}
      />
      <FeatureImageGridSection heading={"Patents & Proprietary \n Technologies"} text="Our patented compositions, extraction methods and delivery systems give brands something rare in botanicals: science that can’t be copied and performance that can’t be matched." featureGridItem={featureGridItem} />
    </main>
  );
};

export default page;
