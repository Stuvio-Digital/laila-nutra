"use client";
import React from "react";
import { ReactLenis } from "lenis/react";
import Header from "@/components/Header";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ReactLenis root>
      <Header/>
      {children}
    </ReactLenis>
  );
}
