"use client";
import React from "react";
import Banner from "@/components/Banner";
import Wellness from "./Wellness";
import HealthSolutions from "./HealthSolutions";
import CarouselSection from "@/layout/CarouselSection";
import BlockLineFeatureSection from "@/layout/BlockLineFeatureSection";
import OverlayBannerSection from "@/layout/OverlayBannerSection";
import WellnessCalendar from "./WellnessCalendar";

const globalWellnessItems = [
  { imgSrc: '/images/home/green.webp', title: 'Ethical Sourcing & Green Chemistry', text: 'Adopting Green Extraction-CO₂ & solvent-free.' },
  { imgSrc: '/images/home/renewable.webp', title: 'Renewable Energy & Waste Reduction', text: 'Clean energy integrated across all 6 GMP plants.' },
  { imgSrc: '/images/home/empowering.webp', title: 'Empowering Farmers & Communities', text: 'Supporting health equity with accessible nutraceuticals.' },
  { imgSrc: '/images/home/transparency-integrity.webp', title: 'Transparency & Integrity', text: '70+ patents backed by safety, ethics & clinical validation.' }
]

const overlayBannerItems = [
  { iconSrc: '/icons/autorenew.svg', text: '8-Step Innovation Cycle (from ideation to launch)' },
  { iconSrc: '/icons/pill_white.svg', text: 'Wide dosage forms (capsules, gummies, effervescents, sprays, topicals)' },
  { iconSrc: '/icons/policy.svg', text: 'Global compliance & dossier readiness' },
  { iconSrc: '/icons/shield.svg', text: 'IP protection with 80+ US and 120+ Indian patents' }
];

const clinicallyTestedItems = [
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


const Home: React.FC = () => {
  return (
    <main className="@container relative w-full min-h-screen overflow-hidden">
      <Banner
        imgSrc="/images/home/home-banner.webp"
        title={"Nature Meets \n Science"}
        subCopy="For 50 years, Laila Nutra has transformed India’s botanical heritage into patented, clinically proven health solutions trusted in 25+ countries."
      />
      <Wellness />
      <HealthSolutions />
      <CarouselSection
        heading={"Clinically Tested \n For Efficacy"}
        text="We believe an ingredient is only as strong as its evidence. That’s why our clinical studies are designed with independent partners, controlled environments, and measurable endpoints. Every claim we make is tied to data, not extrapolation."
        bgColor="white"
        cardsColor="backgroundSecondary"
        textMaxWidth="max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]"
        textColor="textSecondary"
        carouselItems={clinicallyTestedItems}
      />
      <BlockLineFeatureSection heading={"Clean. Ethically Sourced. \n Traceable."} text="Trace our ingredients from soil to shelf for proven authenticity, safety and efficacy." featureItems={blockLineFeatureItems} />
      <OverlayBannerSection
        heading={"From \n Idea to Global Launch- \n End-to-End Service"}
        text="Laila Nutra CDMO is the next-generation innovation engine, combining formulation expertise, advanced technology platforms, and regulatory readiness. From concept to commercial launch, we enable brands to scale faster, safer, and smarter."
        ctaContent="Know More"
        ctaHref="/cdmo"
        headingColor="white"
        textMaxWidth="max-w-142 lg:max-w-none"
        textColor="white"
        classNameTextStructure="col-span-4 sm:col-span-12 lg:col-span-3 lg:col-start-10"
        bgImageSrc="/images/home/global-launch.webp"
        bgImageAlt="Global Launch"
        overlayBannerItems={overlayBannerItems}
      />
      <CarouselSection
        heading={"Green Innovation for \n Global Wellness"}
        text="For us, wellness is more than science  it’s about protecting the planet and empowering communities"
        ctaContent="Our Impact"
        ctaHref="/sustainability-responsibility"
        textMaxWidth="max-w-142 lg:max-w-none"
        classNameTextStructure="col-span-4 sm:col-span-12 lg:col-span-3 lg:col-start-10"
        bgColor={"backgroundSecondary"}
        textColor="textSecondary"
        carouselItems={globalWellnessItems}
      />
      <WellnessCalendar />
    </main>
  );
};

export default Home;