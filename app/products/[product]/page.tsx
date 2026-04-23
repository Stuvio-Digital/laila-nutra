"use client";
import React from "react";
import ProductsClient from "./page-client";
import {productsData} from "@/data/data";

interface PageParams {
  product: string;
}

export default function Page({ params }: { params: Promise<PageParams> }) {
  const paramsValue = React.use(params);
  const selectedProduct = productsData.find(
    (item) => item.pathname === paramsValue.product
  );

  const data = selectedProduct ? [selectedProduct] : [];

  return <ProductsClient filteredData={data} allProducts={productsData} />;
}