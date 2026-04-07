"use client";
import React, { useEffect } from "react";
import { ReactLenis } from "lenis/react";
import Header from "@/components/Header";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Disable right-click if the target is an image or inside an image/picture element
      if (
        target.tagName === "IMG" ||
        target.tagName === "PICTURE" ||
        target.closest("img") ||
        target.closest("picture")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <ReactLenis root>
      <Header/>
      {children}
    </ReactLenis>
  );
}
