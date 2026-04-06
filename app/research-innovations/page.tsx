"use client";
import React from "react";
import Banner from "@/components/Banner";
import CarouselSection from "@/layout/CarouselSection";
import OverlayBannerSection from "@/layout/OverlayBannerSection";
import FeatureImageGridSection from "@/layout/FeatureImageGridSection";
import BlockLineFeatureSection from "@/layout/BlockLineFeatureSection";
import ImageGridSection from "@/layout/ImageGridSection";

const carouselItems = [
  {
    imgSrc: "/images/research-innovations/efficacy.webp",
    title: "Efficacy",
  },
  {
    imgSrc: "/images/research-innovations/safety.webp",
    title: "Safety",
  },
  {
    imgSrc: "/images/research-innovations/bioavailability.webp",
    title: "Bioavailability",
  },
  {
    imgSrc: "/images/research-innovations/consumer-response.webp",
    title: "Consumer response over time",
  }
]

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

const blockLineFeatureItems = [
  {
    icon: "/icons/psychiatry.svg",
    description: "Sourcing from verified farms and responsible cultivators"
  },
  {
    icon: "/icons/handshake.svg",
    description: "Close relationships with agricultural partners"
  },
  {
    icon: "/icons/genetics.svg",
    description: "Botanical identity confirmed through DNA/phyto-marker testing"
  },
  {
    icon: "/icons/barcode_scanner.svg",
    description: "Batch-wise traceability from harvest to final extract"
  },
  {
    icon: "/icons/book.svg",
    description: "Origin documentation for every raw material"
  },
  {
    icon: "/icons/agriculture.svg",
    description: "Sustainable harvesting methods for long-term supply"
  },
  {
    icon: "/icons/license_black.svg",
    description: "Eliminating adulteration through multi-level authentication"
  },
  {
    icon: "/icons/where_to_vote.svg",
    description: "Geo-specific selection of botanicals for higher active content"
  },
  {
    icon: "/icons/barcode_reader.svg",
    description: "Digital batch records available for partner validation"
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
      <CarouselSection
        heading={"Clinically Tested \n For Efficacy"}
        text="We believe an ingredient is only as strong as its evidence. That’s why our clinical studies are designed with independent partners, controlled environments, and measurable endpoints. Every claim we make is tied to data, not extrapolation."
        bgColor="white"
        cardsColor="backgroundSecondary"
        textMaxWidth="max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]"
        textColor="textSecondary"
        carouselItems={carouselItems}
      />
      <BlockLineFeatureSection heading={"Clean. Ethically Sourced. \n Traceable."} text="Trace our ingredients from soil to shelf for proven authenticity, safety and efficacy." featureItems={blockLineFeatureItems} />
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
