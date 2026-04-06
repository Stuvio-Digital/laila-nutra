"use client"
import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import CardCarousel from '@/components/CardCarousel';

interface BannerCarouselItem {
  title: string;
  text: string;
  imgSrc: string;
}

interface BannerCarouselSection {
  heading: string;
  text: string;
  ctaContent?: string;
  ctaHref?: string;
  classNameTextStructure?: string;
  headingColor?: string;
  textColor?: string;
  textMaxWidth?: string;
  bgImageSrc: string;
  bgImageAlt?: string;
  bannerCarouselItems?: BannerCarouselItem[];
}

const BannerCarouselSection: React.FC<BannerCarouselSection> = ({ heading, text, ctaContent, ctaHref, classNameTextStructure, headingColor, textColor, textMaxWidth, bgImageSrc, bgImageAlt, bannerCarouselItems = [] }) => {
  return (
    <section className='@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-10 xl:gap-y-15 bg-backgroundSecondary'>
      <div className='col-span-4 h-fit w-full grid grid-cols-4 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-10 xl:gap-y-15 px-4 sm:px-6 lg:px-10'>
        <div className='h-[80vh] w-full col-span-4 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 relative overflow-hidden py-10'>
        <img src={bgImageSrc} alt={bgImageAlt || heading} className='absolute inset-0 w-full h-full object-cover object-center z-10' />
        <SectionHeader className='col-span-4 sm:col-span-12 h-full z-20' heading={heading} text={text} ctaContent={ctaContent} ctaHref={ctaHref} classNameTextStructure={classNameTextStructure} headingColor={headingColor} textColor={textColor} textMaxWidth={textMaxWidth} />
      </div>
      </div>
      <CardCarousel items={bannerCarouselItems} cardsColor="white"/>
    </section>
  )
}

export default BannerCarouselSection