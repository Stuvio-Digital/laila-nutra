"use client";
import React from "react";
import Banner from "@/components/Banner";
import Wellness from "./Wellness";
import InlineListingSection from "@/layout/InlineListingSection";
import CarouselSection from "@/layout/CarouselSection";
import OverlayBannerSection from "@/layout/OverlayBannerSection";
import WellnessCalendar from "./WellnessCalendar";

const inlineListItems = [
  { imgSrc: '/images/products/slimvance.webp', title: 'Slimvance®', text: 'Clinically proven weight loss (12 lbs in 16 weeks)', listLink: "/products/productInside" },
  { imgSrc: '/images/products/5loxin.webp', title: '5-LOXIN®', text: 'Fast-acting osteoarthritis relief', listLink: "/products/productInside" },
  { imgSrc: '/images/products/nutricog.webp', title: 'Nutricog®', text: 'Clinically validated memory enhancer', listLink: "/products/productInside" },
  { imgSrc: '/images/products/estromira.webp', title: 'EstroMira®', text: '73% reduction in menopausal hot flashes', listLink: "/products/productInside" },
  { imgSrc: '/images/products/eve226.webp', title: 'Eve226™', text: 'PMS and cycle regulation', listLink: "/products/productInside" },
  { imgSrc: '/images/products/miazen.webp', title: 'Miazen™', text: 'Menstrual comfort and PMS relief', listLink: "/products/productInside" },
  { imgSrc: '/images/products/ostibind.webp', title: 'Ostibind®', text: 'Improves calcium binding and bone density', listLink: "/products/productInside" },
  { imgSrc: '/images/products/aqualox.webp', title: 'AquaLox®', text: 'DOMS and arthritis recovery', listLink: "/products/productInside" },
  { imgSrc: '/images/products/aflapin.webp', title: 'Aflapin®', text: 'Rapid anti-inflammatory support', listLink: "/products/productInside" },
  { imgSrc: '/images/products/curq60.webp', title: 'CurQ60®', text: 'Clinically validated curcumin anti-inflammatory', listLink: "/products/productInside" }
]

const carouselItems = [
  { imgSrc: '/images/home/green.webp', title: 'Ethical Sourcing & \n Green Chemistry', text: 'Adopting Green Extraction-CO₂ & solvent-free.' },
  { imgSrc: '/images/home/renewable.webp', title: 'Renewable Energy & \n Waste Reduction', text: 'Clean energy integrated across all 6 GMP plants.' },
  { imgSrc: '/images/home/empowering.webp', title: 'Empowering Farmers & \n Communities', text: 'Supporting health equity with accessible nutraceuticals.' },
  { imgSrc: '/images/home/transparency-integrity.webp', title: 'Transparency & \n Integrity', text: '70+ patents backed by safety, ethics & clinical validation.' }
]

const overlayBannerItems = [
  { iconSrc: '/icons/autorenew.svg', text: '8-Step Innovation Cycle (from ideation to launch)' },
  { iconSrc: '/icons/pill_white.svg', text: 'Wide dosage forms (capsules, gummies, effervescents, sprays, topicals)' },
  { iconSrc: '/icons/policy.svg', text: 'Global compliance & dossier readiness' },
  { iconSrc: '/icons/shield.svg', text: 'IP protection with 80+ US and 120+ Indian patents' }
];

const Home: React.FC = () => {
  return (
    <main className="@container relative w-full min-h-screen overflow-hidden">
      <Banner
        imgSrc="/images/home/home-banner.webp"
        title={"Nature Meets \n Science"}
        subCopy="For 50 years, Laila Nutra has transformed India’s botanical heritage into patented, clinically proven health solutions trusted in 25+ countries."
      />
      <Wellness />
      <InlineListingSection
        heading={"Patented. Clinically Validated. \n Market-Proven."}
        ctaContent="View Our Products"
        ctaHref="/products"
        textColor="textSecondary"
        inlineListItems={inlineListItems}
        inlineListStructure="col-span-2"
        inlineListDetailsStructure="col-span-4 sm:col-span-9 lg:col-span-4 sm:ml-6"
        inlineListImgStructure="col-span-2 sm:col-span-3 lg:col-span-2"
      />
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
        ctaContent="See Our Impact"
        ctaHref="/sustainability-responsibility"
        textMaxWidth="max-w-142 lg:max-w-none"
        classNameTextStructure="col-span-4 sm:col-span-12 lg:col-span-3 lg:col-start-10"
        bgColor={"backgroundSecondary"}
        textColor="textSecondary"
        carouselItems={carouselItems}
      />
      <WellnessCalendar />
    </main>
  );
};

export default Home;