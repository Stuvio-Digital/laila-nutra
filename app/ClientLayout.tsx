"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

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

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Ctrl+P / Cmd+P (Print)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        return false;
      }

      // Block Ctrl+S / Cmd+S (Save)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        return false;
      }

      // Block PrintScreen / Win+Shift+S (Screenshots)
      if (e.key === 'PrintScreen' || e.key === 'Snapshot') {
        // Clearing clipboard on PrintScreen (though not always possible in all browsers)
        navigator.clipboard?.writeText?.("");
        alert("Screenshots are disabled for this site.");
        return false;
      }

      // Block DevTools shortcuts (F12, Ctrl+Shift+I/J/C or Cmd+Opt+I/J/C)
      const isDevTools =
        e.key === "F12" ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        ((e.ctrlKey || e.metaKey) && (e.key === "U" || e.key === "u")); // View Source

      if (isDevTools) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    const handleBeforePrint = () => {
      document.body.style.display = 'none';
    };
    const handleAfterPrint = () => {
      document.body.style.display = 'block';
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  return (
    <ReactLenis root>
      <Header/>
      {children}
      <Footer/>
    </ReactLenis>
  );
}
