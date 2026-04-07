"use client";
import React from "react";
import Banner from "@/components/Banner";
import WhiteCardCarouselSection from "@/layout/WhiteCardCarouselSection";
import FeatureGridSection from "@/layout/FeatureGridSection";
import InlineImageSection from "@/layout/InlineImageSection";
import InlineListingSection from "@/layout/InlineListingSection";;
import How from "./How";
import Features from "./Features";
import Specifications from "./Specifications";
import BlackSectionList from "@/layout/BlackSectionList";

const inlineListItems = [
  {
    imgSrc: "/images/products/hormonal-balance.webp",
    title: "Hormonal Balance",
    text: "Regulates hormones for a good body and mind.",
  },
  {
    imgSrc: "/images/products/vitality-confidence.webp",
    title: "Vitality & Confidence",
    text: "Ensures enhanced energy, mood and strength.",
  },
  {
    imgSrc: "/images/products/skin-hair-care.webp",
    title: "Skin & Hair Care",
    text: "Visibly radiant skin and better hair due to improved inner health.",
  },
  {
    imgSrc: "/images/products/natural.webp",
    title: "100% Natural Alternative",
    text: "Wellness that is safe, science-backed and has no side-effects.",
  }
]

const whiteCardCarouselItems = [
  {
    title: "Pioneering Innovation",
    text: "The world’s first patented Asparagus Racemosus extract, EstroMira™ sets a global benchmark for women’s health ingredients."
  },
  {
    title: "One-stop solution",
    text: "Made to aid from adolescence to menopause, it is a comprehensive solution that adapts to the evolving needs of women’s health."
  },
  {
    title: "Fully Traceable and transparency",
    text: "Every batch can be traced from seed to shelf. Ethical sourcing, verified supply chains and advanced data tracking ensure complete authenticity."
  },
  {
    title: "Globally Compliant & Trusted",
    text: "Produced in GMP-certified and ISO-accredited facilities that meets highest global quality and safety standards."
  },
  {
    title: "Versatile Formulation Options",
    text: "Ideal for use in capsules, tablets, gummies, powders, and functional beverages—offering flexibility for product developers."
  },
  {
    title: "Built for Market Impact",
    text: "As hormonal and menopausal health emerge as fast-growing concerns, EstroMira™  offers a timely, science-backed and impactful solution to brands."
  },
];

const featureGridItems = [
  {
    iconSrc: "/icons/pill.svg",
    title: "Capsules",
  },
  {
    iconSrc: "/icons/medication.svg",
    title: "Tablets",
  },
  {
    iconSrc: "/icons/error_med.svg",
    title: "Gummies",
  },
  {
    iconSrc: "/icons/snowing.svg",
    title: "Powders",
  },
  {
    iconSrc: "/icons/water_bottle.svg",
    title: "Functional Beverages",
  }
]

const testingData = [
  {
    title: "Teens And Young Women (13 – 24)",
    points: ["Decreases luteinizing hormone and follicle-stimulating hormone by 15%", "Helps reduce testosterone levels by 34% for reduced facial hair", "Regulates cycles, reduces acne & hirsutism", "Enhances mood & restores natural glow in 30 days"],
    image: "/images/quality-certifications/raw-material-authentication.webp"
  },
  {
    title: "Reproductive Age (25 – 39) ",
    points: ["Lowers ovarian volume by 23% and follicle count by 24%", "Increases insulin sensitivity by 14%", "Eases bloating, irritability & supports hormonal harmony", "Boosts fertility & metabolic wellness", "Clinically proven results in 42 days"],
    image: "/images/quality-certifications/in-process-quality-checks.webp"
  },
  {
    title: "Perimenopause (40+)",
    points: ["Visibly reduces hot flashes by 73%", "Improves sleep quality, mood and hydration", "Supports natural estrogen equilibrium"],
    image: "/images/quality-certifications/microbiological-heavy-metal-screening.webp"
  },
  {
    title: "Menopause (50+)",
    points: ["5× better symptom control vs placebo", "Strengthens emotional resilience & calm", "Restores skin & vaginal hydration", "Natural alternative to hormone replacement therapy with no hormonal side effects"],
    image: "/images/quality-certifications/clinical-validation.webp"
  }
];

const page: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <Banner
        imgSrc="/images/products/productInside-banner.webp"
        title={"Empowering \n Women With \n EstroMira™"}
        subCopy="Formulating the first ever patented Asparagus Racemosus extract for complete women’s wellness."
      />
      <Features />
      <Specifications />
      <InlineListingSection
        heading="Complete Care For Her"
        inlineListItems={inlineListItems}
        inlineListStructure="col-span-4 md:col-span-2"
        inlineListDetailsStructure="col-span-3 sm:col-span-9 lg:col-span-4 ml-6" inlineListImgStructure="col-span-1 sm:col-span-3 lg:col-span-2"
      />
      <BlackSectionList
        heading={"For Every Woman"}
        text="Formulated to adapt to women’s changing physiology, EstroMira™ empowers their wellness from adolescence to menopause."
        textColor="text-white70"
        textMaxWidth="max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]"
        data={testingData}
      />
      <How />
      <WhiteCardCarouselSection heading="Why Choose EstroMira™?" text="Designed for versatility, EstroMira is an ingredient that fits seamlessly into a range of health formulations without compromising its efficacy or stability." textMaxWidth="max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]"
        headingColor="black"
        textColor="textSecondary"
        whiteCardCarouselItems={whiteCardCarouselItems}
      />
      <FeatureGridSection
        heading={"Versatile Formulation \n Possibilities"}
        text="Designed for versatility, EstroMira is an ingredient that fits seamlessly into a range of health formulations without compromising its efficacy or stability."
        textMaxWidth="max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]"
        headingColor="black"
        textColor="textSecondary"
        features={featureGridItems}
      />
      <InlineImageSection
        imgSrc="/images/products/estromira-quality.webp"
        title="Certified For Quality"
        text="Because her wellbeing deserves innovations that are trusted, patented and proven. Take your first step towards her health."
      />
    </main>
  );
};

export default page;