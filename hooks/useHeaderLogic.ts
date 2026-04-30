"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavItem, NavLink } from "@/data/navData";

export const useHeaderLogic = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Desktop Global Menu State
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAccordionIndex, setMobileAccordionIndex] = useState<number | null>(null);

  // Scroll Behavior States
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isWhiteBackground = isScrolled || activeMenuIndex !== null || pathname === "/contact-us";

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Background transition trigger
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/Show on scroll behavior
      const hideThreshold = window.innerHeight * 0.6;
      if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) {
        // Scrolling down - hide
        setIsVisible(false);
      } else {
        // Scrolling up - show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileAccordionIndex(null);
  }, [pathname]);

  const handleMouseEnter = (index: number | null) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenuIndex(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenuIndex(null);
    }, 400);
  };

  const handleLinkClick = (e: React.MouseEvent, href: string | undefined, target?: string) => {
    setActiveMenuIndex(null);
    if (target === "_blank") {
      return;
    }
    if (href) {
      e.preventDefault();
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        router.push(href);
      }, 300);
    }
  };

  const isItemActive = useCallback((item: NavItem) => {
    if (item.href && item.href !== "/" && pathname?.startsWith(item.href)) return true;
    if (item.href === "/" && pathname === "/") return true;
    if (item.links && item.links.some((link: NavLink) => pathname?.startsWith(link.href))) return true;
    return false;
  }, [pathname]);

  const toggleMobileAccordion = (index: number) => {
    setMobileAccordionIndex(mobileAccordionIndex === index ? null : index);
  };

  return {
    pathname,
    activeMenuIndex,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    mobileAccordionIndex,
    isScrolled,
    isVisible,
    isWhiteBackground,
    handleMouseEnter,
    handleMouseLeave,
    handleLinkClick,
    isItemActive,
    toggleMobileAccordion,
    timeoutRef
  };
};
