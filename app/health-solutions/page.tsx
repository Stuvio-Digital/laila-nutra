"use client";
import React, { useState, useEffect, useRef } from "react";
import Banner from "@/components/Banner";
import BannerCarouselSection from "@/layout/BannerCarouselSection";
import { healthSections } from "@/data/healthSolutionsData";
import { useFooter } from "@/context/FooterContext";
import { useHeaderLogic } from "@/hooks/useHeaderLogic";
import { useLenis } from "lenis/react";

const page: React.FC = () => {
  const { setFooterContent } = useFooter();
  const { isVisible } = useHeaderLogic();
  const lenis = useLenis();
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const isScrollingToSection = useRef(false);
  
  React.useEffect(() => {
    setFooterContent({
      heading: "Targeted Solutions. \n Backed by Science",
      description: "A portfolio of clinically supported ingredients designed for real-world health outcomes.",
      buttonText: "Contact Us",
      buttonLink: "/contact-us"
    });
    return () => setFooterContent(null);
  }, [setFooterContent]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isScrollingToSection.current) {
            setActiveSection(index);
          }
        },
        {
          // Adjust rootMargin to trigger when section is roughly in the middle/top
          // More generous margin for mobile to prevent jumping
          rootMargin: window.innerWidth < 1024 ? "-15% 0px -75% 0px" : "-25% 0px -65% 0px",
          threshold: 0,
        }
      );
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  const scrollToSection = (index: number) => {
    const element = sectionRefs.current[index];
    if (element) {
      isScrollingToSection.current = true;
      setActiveSection(index);
      
      const headerHeight = window.innerWidth >= 1024 ? 95 : 76;
      const navHeight = window.innerWidth >= 1024 ? 72 : 60;
      const offset = headerHeight + navHeight;

      if (lenis) {
        lenis.scrollTo(element, {
          offset: -offset,
        });
        // Reset the scrolling flag after a reasonable delay if using default duration
        setTimeout(() => {
          isScrollingToSection.current = false;
        }, 1000);
      } else {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        setTimeout(() => {
          isScrollingToSection.current = false;
        }, 1000);
      }
    }
  };

  // Sync horizontal scroll of nav when active section changes
  useEffect(() => {
    if (navRef.current) {
      const activeItem = navRef.current.children[activeSection] as HTMLElement;
      if (activeItem) {
        const container = navRef.current;
        const scrollLeft = activeItem.offsetLeft - (container.offsetWidth / 2) + (activeItem.offsetWidth / 2);
        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth"
        });
      }
    }
  }, [activeSection]);
  
  return (
    <main className="relative w-full min-h-screen">
      <Banner
        imgSrc="/images/health-solutions/health-solutions-banner.webp"
        title={"Innovation-Led \n Wellness"}
        subCopy="We deliver effective, scalable nutraceutical solutions across wellness categories to change the landscape of health and nutrition worldwide."
      />
      
      <div className="relative">
        {/* Sticky Navigation Bar */}
        <div 
          className={`sticky z-40 bg-white border-b border-borderColor transition-all duration-300 ease-in-out ${
            isVisible ? "top-[76px] lg:top-[95px]" : "top-0"
          }`}
        >
          <div 
            ref={navRef}
            className="w-full px-4 sm:px-6 lg:px-10 overflow-x-auto no-scrollbar flex items-center gap-6 sm:gap-8 lg:gap-10 h-15 lg:h-18"
          >
            {healthSections.map((section, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className={`whitespace-nowrap text-bodyBase [@media(min-width:1920px)]:text-bodyBase transition-all duration-300 h-full flex items-center border-b-2 relative -top-px cursor-pointer ${
                  activeSection === index 
                    ? "text-blue border-blue font-medium" 
                    : "text-textSecondary border-transparent hover:text-blue/70"
                }`}
              >
                {section.heading}
              </button>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="flex flex-col">
          {healthSections.map((section, index) => (
            <div 
              key={index} 
              id={section.heading.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')}
              ref={(el) => { sectionRefs.current[index] = el; }}
              className="scroll-mt-35 lg:scroll-mt-45"
            >
              <BannerCarouselSection
                heading={section.heading}
                text={section.text}
                textMaxWidth="max-w-[90%] xl:max-w-142 2xl:max-w-[80%]"
                textColor="textSecondary"
                bannerCarouselItems={section.bannerCarouselItems}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
