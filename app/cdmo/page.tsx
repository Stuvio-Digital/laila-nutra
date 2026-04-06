"use client";
import React from "react";
import Banner from "@/components/Banner";
import InlineListingSection from "@/layout/InlineListingSection";
import CarouselSection from "@/layout/CarouselSection";
import OverlayBannerSection from "@/layout/OverlayBannerSection";
import FeatureImageGridSection from "@/layout/FeatureImageGridSection";
import BlockLineFeatureSection from "@/layout/BlockLineFeatureSection";
import FeatureGridSection from "@/layout/FeatureGridSection";
import InlineImageSection from "@/layout/InlineImageSection";

const solidDosageItems = [
  {
    imgSrc: "/images/cdmo/tablets.webp",
    title: "Tablets",
    text: "Uncoated, Film-Coated, Sugar-Coated, Sustained & Controlled Release",
  },
  {
    imgSrc: "/images/cdmo/capsules.webp",
    title: "Capsules",
    text: "Powder-in-Capsule, Pellets-in-Capsule, HPMC & HGC Smart Capsules",
  },
  {
    imgSrc: "/images/cdmo/effervescent-tablets.webp",
    title: "Effervescent Tablets",
    text: "Rapid-dissolving formats that ensure convenience and faster absorption.",
  },
  {
    imgSrc: "/images/cdmo/mouth-orally-tablets.webp",
    title: "Mouth-Melt Granules & Orally Disintegrating Tablets",
    text: "Designed for quick onset and consumer-friendly use.",
  }
];

const functionalDosageItems = [
  {
    imgSrc: "/images/cdmo/tablets.webp",
    title: "Powders & Beverages",
    text: "High solubility for stability and superior dispersibility",
  },
  {
    imgSrc: "/images/cdmo/capsules.webp",
    title: "Gummies",
    text: "Multi-flavour, sugar-free, and fortified",
  }
];

const liquidAndTopicalItems = [
  {
    imgSrc: "/images/cdmo/effervescent-tablets.webp",
    title: "Creams, Emulsions, and Ointments",
    text: "Smooth, stable topical applications developed for targeted delivery and superior skin compatibility.",
  },
  {
    imgSrc: "/images/cdmo/mouth-orally-tablets.webp",
    title: "Syrups, Suspensions, Shots",
    text: "Ready-to-consume formats engineered for efficacy and palatability.",
  },
  {
    imgSrc: "/images/cdmo/tablets.webp",
    title: "Nasal Sprays & Ear Drops (AYUSH-compliant)",
    text: "Scientifically formulated and compliant with traditional wellness systems.",
  }
];

const categories = [
  {
    name: "Solid Dosage",
    items: solidDosageItems
  },
  {
    name: "Functional Dosage",
    items: functionalDosageItems
  },
  {
    name: "Liquid & Topical Dosage",
    items: liquidAndTopicalItems
  }
];

const carouselItems = [
  {
    imgSrc: "/images/cdmo/blister-packs.webp",
    title: "Blister Packs (PVC, PVDC)",
  },
  {
    imgSrc: "/images/cdmo/strip-alu-packs.webp",
    title: "Strip Packs & Alu-Alu Packs",
  },
  {
    imgSrc: "/images/cdmo/bottles.webp",
    title: "Bottles (PET, HDPE, Glass)",
  },
  {
    imgSrc: "/images/cdmo/lami-tubes.webp",
    title: "Lami Tubes (multiple shapes & volumes)",
  },
  {
    imgSrc: "/images/cdmo/strip-alu-packs.webp",
    title: "Stick Packs, Sachets, Pouches",
  },
  {
    imgSrc: "/images/cdmo/bottles.webp",
    title: "Canisters & Pillow Packs for effervescents and granules",
  },
  {
    imgSrc: "/images/cdmo/lami-tubes.webp",
    title: "Eco-friendly Packaging & Gummy Pouches",
  }
]

const overlayBannerItems = [
  { iconSrc: '/icons/monitoring.svg', iconAlt: "Monitoring", text: 'Analytical Method Development & Validation' },
  { iconSrc: '/icons/avg_pace.svg', iconAlt: "Test", text: 'Performance Testing & Real-Time Stability Studies' },
  { iconSrc: '/icons/license.svg', iconAlt: "License", text: 'Global QA Certifications such as FSSAI, AYUSH, US-FDA, EFSA, GMP and ISO' },
  { iconSrc: '/icons/approval_delegation.svg', iconAlt: "Approval Delegation", text: 'CTD/eCTD Dossier Creation, GRAS and Novel Food approvals' }
];

const featureGridItem = [
  {
    title: "Partners in Co-Creating your Next Big Product",
    description: "With over 50 years of nutraceutical leadership, we stand as a trusted CDMO partner for the world’s leading health and wellness brands. We bring the credibility of five decades of discovery and the agility of a next-generation innovation lab.",
    image: "/images/cdmo/partners.webp",
    orderClassFeature: "lg:order-1",
    orderClassImage: "lg:order-2",
    featureItems: [
      {
        icon: "/icons/verified.svg",
        title: "6 GMP-certified facilities"
      },
      {
        icon: "/icons/globe_book.svg",
        title: "70+ global patents"
      },
      {
        icon: "/icons/biotech.svg",
        title: "150+ scientists"
      },
      {
        icon: "/icons/distance.svg",
        title: "Presence across 25+ countries"
      }
    ]
  }
]

const blockLineFeatureItems = [
  {
    icon: "/icons/copyright.svg",
    description: "Comprehensive IP protection and licensing support"
  },
  {
    icon: "/icons/oncology.svg",
    description: "Claim establishment through in-house preclinical and CRO-partnered clinical studies"
  },
  {
    icon: "/icons/menu_book.svg",
    description: "150+ Technical and research-based publications in reputed international journals"
  },
]

const technologyInnovationFeatures = [
  {
    iconSrc: "/icons/hanami_dango.svg",
    title: "Nanotechnology",
    description: "Improves solubility and efficacy"
  },
  {
    iconSrc: "/icons/dermatology.svg",
    title: "Liposomal Delivery",
    description: "Boosts absorption and stability"
  },
  {
    iconSrc: "/icons/vital_signs.svg",
    title: "Sucrasomal Technology",
    description: "Enables controlled release"
  },
  {
    iconSrc: "/icons/admin_meds.svg",
    title: "BioSmartCaps",
    description: "Precision-driven performance"
  }
]

const page: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <Banner
        imgSrc="/images/cdmo/cdmo-banner.webp"
        title={"End-To-End \n CDMO Service \n For Your Success"}
        subCopy="From concept to commercial manufacturing, we at Laila Nutra offer an end-to-end innovation ecosystem for our clients’ success."
      />
      <FeatureImageGridSection featureGridItem={featureGridItem} />
      <InlineListingSection
        heading={"Various Formulation \n Expertise"}
        text="We create a versatile range of dosage formats ranging from tablets to AYUSH-compliant sprays and drops, to meet global consumer preferences."
        textColor="textSecondary"
        textMaxWidth="max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]"
        categories={categories}
        inlineListStructure="col-span-4 md:col-span-2"
        inlineListDetailsStructure="col-span-3 sm:col-span-9 lg:col-span-4 ml-6" inlineListImgStructure="col-span-1 sm:col-span-3 lg:col-span-2"
      />
      <CarouselSection
        heading={"Packaging That Protects"}
        text="We offer customisable, eco-conscious packaging options that ensure your product’s integrity remains intact and optimises its shelf appeal too."
        textMaxWidth="max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]"
        bgColor="white"
        cardsColor="backgroundSecondary"
        textColor="textSecondary"
        carouselItems={carouselItems}
      />
      <OverlayBannerSection
        heading={"Our Commitment: \n Quality Assurance"}
        text="The foundation of every product we co-create is built on data, verified by science and validated by regulation to meet the highest international standards."
        headingColor="white"
        textMaxWidth="max-w-[94%] md:max-w-142 xl:max-w-none"
        textColor="white"
        classNameTextStructure="col-span-4 sm:col-span-12 lg:col-span-3 lg:col-start-10"
        bgImageSrc="/images/cdmo/our-commitment-qa.webp"
        bgImageAlt="Our Commitment"
        overlayBannerItems={overlayBannerItems}
      />
      <BlockLineFeatureSection
        heading={"Proof & Protect Always"}
        text={"We build your product on scientific credibility and protect it too. Our in-house IPR team has secured 80+ US patents and 120+ Indian patents, ensuring brand exclusivity."}
        featureItems={blockLineFeatureItems}
      />
      <FeatureGridSection
        heading={"Technology & Innovation"}
        text={"We continuously invest in next-generation delivery technologies that enhance bioavailability, stability and absorption of your products."}
        textColor="textSecondary"
        textMaxWidth="max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]"
        bgColor="backgroundSecondary"
        features={technologyInnovationFeatures}
      />
      <InlineImageSection
        imgSrc="/images/cdmo/wellness-with-conscience.webp"
        title={"Wellness With \n Conscience"}
        text="For us sustainability isn’t an afterthought. It’s built into our blueprint. With 5 decades of legacy, we design every process, formulation and partnership with sustainability and responsibility at its core."
      />
    </main>
  );
};

export default page;
