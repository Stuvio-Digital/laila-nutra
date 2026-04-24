"use client";
import React from 'react';
import CTA from '@/components/CTA';
import FadeUp from '@/components/FadeUp';

const Wellness: React.FC = () => {
  return (
    <section className="h-fit w-full px-4 sm:px-6 lg:px-10 py-15 lg:py-20 grid grid-cols-4 auto-rows-min gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-7 md:gap-y-0">
      <FadeUp as="h3" className="col-span-4 text-heading2 tracking-[-4%] text-black leading-[110%] font-medium block md:hidden order-1">
        Science of Wellness <br /> Since 1974
      </FadeUp>
      <FadeUp as='div' className="aspect-380/285 col-span-3 md:col-span-2 md:max-w-[70%] overflow-hidden md:row-span-3 order-2 md:order-1">
        <img
          src="/images/home/wellness-1.webp"
          alt="Science of Wellness 1"
          className="object-cover object-center"
        />
      </FadeUp>
      <div className="col-start-2 col-span-3 md:col-start-3 md:col-span-2 md:row-span-8 order-3 md:order-2">
        <FadeUp as="h3" delay={0.2} className="text-heading2 tracking-[-4%] text-black leading-[110%] font-medium mb-7.5 hidden md:block">
          Science of Wellness <br /> Since 1976
        </FadeUp>
        <FadeUp as='div' className="aspect-585/780 overflow-hidden w-full">
          <img
            src="/images/home/wellness-2.webp"
            alt="Science of Wellness 2"
            className="object-cover object-center"
          />
        </FadeUp>
      </div>
      <div className="col-start-1 col-span-4 md:col-span-2 h-fit md:h-full md:aspect-square flex items-center md:row-span-5 order-2 md:order-3">
        <FadeUp className='flex flex-col gap-y-5 md:gap-y-6'>
          <p className="text-bodyBase leading-[124%] text-textSecondary my-auto h-fit row-span-3 max-w-[80%]">
            10,000 plant actives researched. 70+ patents achieved. 6 GMP-certified
            facilities built. And more. We transform India’s botanical richness
            into trusted wellness solutions worldwide.
          </p>
          {/* <CTA ctaContent="Discover Our Journey" href="/our-story-purpose" /> */}
        </FadeUp>
      </div>
      <FadeUp as='div' className="col-span-3 md:col-start-2 md:col-span-1 aspect-square order-4 overflow-hidden">
        <img
          src="/images/home/wellness-3.webp"
          alt="Science of Wellness 3"
          className="object-cover object-center"
        />
      </FadeUp>
    </section>
  );
}

export default Wellness