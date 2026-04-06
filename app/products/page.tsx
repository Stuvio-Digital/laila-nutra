"use client";
import React from "react";
import Banner from "@/components/Banner";
import ProductListing from "./ProductListing";

const products = [
  {
    title: "EstroMira™",
    text: "Aids in hormonal balance and women’s wellness across every life stage.",
    imgSrc: "/images/products/estromira.webp",
  },
  {
    title: "Eve226™",
    text: "Supports PMS management and menstrual cycle regularity.",
    imgSrc: "/images/products/eve226.webp",
  },
  {
    title: "Miazen™",
    text: "Promotes menstrual comfort and relieves PMS-related symptoms.",
    imgSrc: "/images/products/miazen.webp",
  },
  {
    title: "5-LOXIN®",
    text: "Delivers fast-acting joint comfort and osteoarthritis relief.",
    imgSrc: "/images/products/5loxin.webp",
  },
];

const page: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <Banner
        imgSrc="/images/products/products-listing-banner.webp"
        title={"Science-backed \n Products"}
        subCopy="Nutraceuticals are nature’s finest compounds turned into clinically backed bioactives. At Laila Nutra, we study Indian actives to create solutions that global brands rely on."
      />
      <ProductListing items={products} />
    </main>
  );
};

export default page;
