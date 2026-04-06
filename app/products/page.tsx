"use client";
import React from "react";
import Banner from "@/components/Banner";

const page: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <Banner
        imgSrc="/images/products/products-listing-banner.webp"
        title={"Science-backed \n Products"}
        subCopy="Nutraceuticals are nature’s finest compounds turned into clinically backed bioactives. At Laila Nutra, we study Indian actives to create solutions that global brands rely on."
      />
    </main>
  );
};

export default page;
