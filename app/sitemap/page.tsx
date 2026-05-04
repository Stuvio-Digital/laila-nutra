"use client";
import React from 'react';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import { healthSections } from '@/data/healthSolutionsData';

interface SitemapSection {
  title: string;
  links: {
    name: string;
    href: string;
    target?: string;
  }[];
}

const SitemapPage = () => {
  const sections: SitemapSection[] = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Health Solutions", href: "/health-solutions" },
        { name: "CRDMO", href: "/crdmo" },
        { name: "Contact Us", href: "/contact-us" },
      ]
    },
    {
      title: "About",
      links: [
        { name: "Our Story & Purpose", href: "/our-story-purpose" },
        { name: "Quality & Certifications", href: "/quality-certifications" },
        { name: "Sustainability & Responsibility", href: "/sustainability-responsibility" },
      ]
    },
    {
      title: "Health Solutions",
      links: healthSections.map(s => ({ 
        name: s.heading.replace(/\n/g, ' '), 
        href: `/health-solutions#${s.heading.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')}` 
      }))
    },
  ];

  return (
    <main className="@container w-full min-h-screen pt-32 pb-15 lg:pt-36 lg:pb-20 px-4 sm:px-6 lg:px-10 flex flex-col gap-y-16 lg:gap-y-32 bg-backgroundSecondary">
      <FadeUp className="w-full">
        <h1 className="text-heading1 font-medium text-black leading-[90%] tracking-[-3%]">Sitemap</h1>
      </FadeUp>
      
      <div className="w-full flex flex-col gap-y-15 lg:gap-y-20">
        {sections.map((section, idx) => (
          <FadeUp key={idx} delay={idx * 0.1} className="grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 items-start">
            {/* Section Title */}
            <div className="col-span-4 sm:col-span-12 @4xl:col-span-4 mb-10">
              <h3 className="text-heading3 font-medium text-black leading-[100%] tracking-[-2%]">{section.title}</h3>
            </div>

            {/* Links Grid */}
            <div className="col-span-4 sm:col-span-12 @4xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 lg:gap-x-15 gap-y-0">
              {section.links.map((link, lIdx) => (
                <Link 
                  key={lIdx}
                  href={link.href} 
                  target={link.target}
                  className="group flex justify-between items-center py-6 lg:py-8 border-t border-textSecondary/30 transition-colors duration-300 w-full"
                >
                  <span className="text-bodyBase tracking-[-2%] font-normal text-black group-hover:text-blue transition-colors duration-300">
                    {link.name}
                  </span>
                  <div className="h-7 w-7 overflow-hidden rounded-sm flex items-center justify-center relative">
                    <img 
                      src="/icons/link_arrow.svg" 
                      alt="" 
                      className="absolute w-full h-full transform transition-transform duration-500 ease-in-out group-hover:translate-x-full group-hover:-translate-y-full" 
                    />
                    <img 
                      src="/icons/link_arrow.svg" 
                      alt="" 
                      className="absolute w-full h-full transform -translate-x-full translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0" 
                    />
                  </div>
                </Link>
              ))}
              {/* Empty state filler for odd number of links on desktop to maintain border consistency if desired, or just let them be */}
            </div>
          </FadeUp>
        ))}
      </div>
    </main>
  );
};

export default SitemapPage;
