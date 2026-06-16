import React from "react";
import Home from "@/app/home/page";

export const revalidate = 60; // ISR: revalidate every 60s

export default function Page() {
  return <Home />;
}
