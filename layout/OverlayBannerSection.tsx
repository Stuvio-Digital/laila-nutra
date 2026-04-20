"use client"
import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import FadeUp from '@/components/FadeUp';

export interface OverlayBannerItem {
  iconSrc: string;
  iconAlt?: string;
  text: string;
}

interface OverlayBannerSectionProps {
  heading: string;
  text?: string;
  ctaContent?: string;
  ctaHref?: string;
  classNameTextStructure?: string;
  headingColor?: string;
  textColor?: string;
  textMaxWidth?: string;
  bgImageSrc: string;
  bgImageAlt?: string;
  overlayBannerItems?: OverlayBannerItem[];
}

const OverlayBannerSection: React.FC<OverlayBannerSectionProps> = ({ heading, text, ctaContent, ctaHref, classNameTextStructure, headingColor, textColor, textMaxWidth, bgImageSrc, bgImageAlt, overlayBannerItems = [] }) => {
  return (
    <section className='@container h-fit xl:h-[90vh] bg-black/10  w-full relative overflow-hidden pt-15 lg:pt-20 flex flex-col justify-between gap-y-50 xl:gap-y-0'>
      <img src={bgImageSrc} alt={bgImageAlt || heading} className='absolute inset-0 w-full h-full object-cover object-center -z-10' />
      <SectionHeader heading={heading} text={text} ctaContent={ctaContent} ctaHref={ctaHref} classNameTextStructure={classNameTextStructure} headingColor={headingColor} textColor={textColor} textMaxWidth={textMaxWidth} />
      {overlayBannerItems.length > 0 && (
        <FadeUp className='h-fit w-full grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-7 px-4 sm:px-6 lg:px-10 pt-6 pb-6 sm:pb-7 lg:pb-10 bg-black/30 backdrop-blur-md'>
          {overlayBannerItems.map((item, index) => (
            <div key={index} className='col-span-2 sm:col-span-6 md:col-span-3 flex flex-col gap-y-3.5 md:gap-y-5.5'>
              <img src={item.iconSrc} alt={item.iconAlt || item.text} className='h-8 w-8' />
              <p className='text-white text-body [@media(min-width:1920px)]:text-bodyBase leading-[130%] tracking-[-1%] font-light text-wrap max-w-[90%] @4xl:max-w-[80%]'>{item.text}</p>
            </div>
          ))}
        </FadeUp>
      )}
    </section>
  )
}

export default OverlayBannerSection