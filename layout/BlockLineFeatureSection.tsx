"use client";
import React, { useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePathname } from 'next/navigation';
import FadeUp from '@/components/FadeUp';

gsap.registerPlugin(ScrollTrigger);

interface FeatureItem {
  icon: string;
  description: string;
}

interface BlockLineFeatureSectionProps {
  heading: string;
  text: string;
  featureItems: FeatureItem[];
}

const BlockLineFeatureSection: React.FC<BlockLineFeatureSectionProps> = ({ heading, text, featureItems }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: headingRef.current,
        start: "top top",
        end: () => {
          const offset = window.innerWidth >= 1024 ? 120 : 100;
          return `${((featureRef?.current?.offsetHeight || 0) - offset) || 0}px ${headingRef.current?.offsetHeight || 0}px`;
        },
        pinSpacing: false,
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className='@container h-fit w-full grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 px-4 sm:px-6 lg:px-10 items-start'>
      <div ref={headingRef} className='z-10 col-span-4 sm:col-span-12 md:col-span-6 flex flex-col gap-y-5.5 lg:gap-y-6.5 pt-15 md:pt-15 pb-0 lg:pt-20'>
        <FadeUp as='h3' className='max-w-[90%] text-heading2 leading-[110%] tracking-[-2%] lg:tracking-[-4%] font-medium'>
          {heading.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </FadeUp>
        <FadeUp as='p' className='max-w-[90%] md:max-w-[80%] text-textSecondary text-bodyBase [@media(min-width:1920px)]:text-subHeading2 font-normal leading-[124%] tracking-[-2%]'>{text}</FadeUp>
      </div>
      <div ref={featureRef} className='col-span-4 sm:col-span-12 md:col-span-6 flex flex-col pb-15 pt-10 md:pt-15 lg:pb-20 lg:pt-20'>
        {featureItems.map((item, index) => (
          <FadeUp key={index} className='flex flex-col gap-y-5 md:gap-y-6 border-t border-borderColor pt-6 pb-6 sm:pb-7.5 lg:pb-10'>
            <img src={item.icon} alt={item.description} className='h-8 w-8' />
            <p className='text-textSecondary text-bodyBase font-normal leading-[124%] tracking-[-2%] max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]'>{item.description}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

export default BlockLineFeatureSection