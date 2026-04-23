"use client";
import React from "react";
import Banner from "@/components/Banner";
import FeatureImageGridSection from "@/layout/FeatureImageGridSection";
import Specifications, { SpecCategory, SpecPoint } from "./Specifications";
import InlineListingSection from "@/layout/InlineListingSection";
import BlackSectionList from "@/layout/BlackSectionList";
import How, { HowData } from "./How";
import WhiteCardCarouselSection from "@/layout/WhiteCardCarouselSection";
import FeatureGridSection from "@/layout/FeatureGridSection";
import InlineImageSection from "@/layout/InlineImageSection";
import OverlayBannerSection from "@/layout/OverlayBannerSection";

const featureGridItems = [

]

const featureGridItem = [
  {
    title: "Plant Science For Women",
    description: "EstroMira™ is a patented Asparagus Racemosus extract (standardized to 15% Shatavarins) crafted to support hormonal balance, reproductive health and overall vitality in women with the help of nature's power.",
    image: "/images/products/productInside-banner.webp",
    orderClassFeature: "lg:order-1",
    orderClassImage: "lg:order-2",
    featureItems: [
      {
        icon: "/icons/stress_management.svg",
        title: "Safe and natural remedy for hormonal wellness"
      },
      {
        icon: "/icons/footprint.svg",
        title: "Made for every stage of womanhood"
      },
      {
        icon: "/icons/salinity.svg",
        title: "World's first patented extract of Asparagus Racemosus"
      },
      {
        icon: "/icons/psychiatry.svg",
        title: "100% plant-based & clinically validated"
      },
      {
        icon: "/icons/distance.svg",
        title: "Presence across 25+ countries"
      },
    ]
  }
]

interface FeatureImageGridSection {
  title: string;
  description: string;
  image: string;
  orderClassFeature: string;
  orderClassImage: string;
  featureItems: {
    icon: string;
    title: string;
  }[];
}

interface Product {
  id: string;
  pathname: string;
  title: string;
  subCopy: string;
  bannerImg: string;
  featureImageGridSection: FeatureImageGridSection;
  specifications?: {
    title?: string;
    image?: string;
    categories?: SpecCategory[];
    points?: SpecPoint[];
  };
  inlineListingSection: {
    heading: string;
    inlineListItems: {
      imgSrc: string;
      title: string;
      text: string;
    }[];
    inlineListStructure?: string;
    inlineListDetailsStructure?: string;
    inlineListImgStructure?: string;
  };
  blackListSection: {
    heading: string;
    text: string;
    textColor?: string;
    textMaxWidth?: string;
    data: {
      title: string;
      points: string[];
      image: string;
    }[];
  };
  howSection?: HowData;
  whiteCardCarouselSection: {
    heading: string;
    text: string;
    textMaxWidth?: string;
    headingColor?: string;
    textColor?: string;
    whiteCardCarouselItems: {
      title: string;
      text: string;
    }[];
  };
  formulationSection: {
    heading: string;
    text: string;
    textMaxWidth?: string;
    headingColor?: string;
    textColor?: string;
    features: {
      iconSrc: string;
      title: string;
    }[];
  };
  certifiedSection: {
    imgSrc: string;
    heading: string;
    text: string;
    ctaContent?: string;
    points?: {
      iconSrc: string;
      text: string;
    }[];
  };
}

interface ProductsClientProps {
  filteredData: Product[];
  allProducts: Product[];
}

const ProductsClient: React.FC<ProductsClientProps> = ({ filteredData, allProducts }) => {
  const product = filteredData[0];

  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <Banner
        imgSrc={product.bannerImg}
        title={product.title}
        subCopy={product.subCopy}
      />
      <FeatureImageGridSection featureGridItem={[product.featureImageGridSection]} />
      <Specifications specifications={product.specifications} />
      <InlineListingSection
        heading={product.inlineListingSection.heading}
        inlineListItems={product.inlineListingSection.inlineListItems}
        inlineListStructure={product.inlineListingSection?.inlineListStructure}
        inlineListDetailsStructure={product.inlineListingSection?.inlineListDetailsStructure}
        inlineListImgStructure={product.inlineListingSection?.inlineListImgStructure}
      />
      <BlackSectionList
        heading={product.blackListSection.heading}
        text={product.blackListSection.text}
        data={product.blackListSection.data}
        textColor={product.blackListSection?.textColor}
        textMaxWidth={product.blackListSection?.textMaxWidth}
      />
      {product.howSection && <How how={product.howSection} />}
      <WhiteCardCarouselSection
        heading={product.whiteCardCarouselSection.heading}
        text={product.whiteCardCarouselSection.text}
        textMaxWidth={product.whiteCardCarouselSection.textMaxWidth}
        headingColor={product.whiteCardCarouselSection.headingColor}
        textColor={product.whiteCardCarouselSection.textColor}
        whiteCardCarouselItems={product.whiteCardCarouselSection.whiteCardCarouselItems}
      />
      <FeatureGridSection
        heading={product.formulationSection.heading}
        text={product.formulationSection.text}
        textMaxWidth={product.formulationSection.textMaxWidth}
        headingColor={product.formulationSection.headingColor}
        textColor={product.formulationSection.textColor}
        features={product.formulationSection.features}
      />
      {product.certifiedSection.points && product.certifiedSection.points.length > 0 ? (
        <OverlayBannerSection
          bgImageSrc={product.certifiedSection.imgSrc}
          heading={product.certifiedSection.heading}
          text={product.certifiedSection.text}
          ctaContent={product.certifiedSection.ctaContent}
          overlayBannerItems={product.certifiedSection.points}
          headingColor="white"
          textColor="text-white70"
        />
      ) : (
        <InlineImageSection
          imgSrc={product.certifiedSection.imgSrc}
          title={product.certifiedSection.heading}
          text={product.certifiedSection.text}
          ctaContent={product.certifiedSection.ctaContent}
        />
      )}
    </main>
  );
};

export default ProductsClient;