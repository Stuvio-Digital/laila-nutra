"use client"
import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import HealthSolutionsCard from '@/components/HealthSolutionsCard';

interface BannerCarouselItem {
  title: string;
  text: string;
  imgSrc: string;
  href?: string;
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
  bannerCarouselItems?: BannerCarouselItem[];
}

const BannerCarouselSection: React.FC<BannerCarouselSection> = ({ heading, text, ctaContent, ctaHref, classNameTextStructure, headingColor, textColor, textMaxWidth, bannerCarouselItems = [] }) => {
  return (
    <section className='@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 bg-backgroundSecondary'>
      <SectionHeader className='col-span-4 sm:col-span-12 h-full z-20' heading={heading} text={text} ctaContent={ctaContent} ctaHref={ctaHref} classNameTextStructure={classNameTextStructure} headingColor={headingColor} textColor={textColor} textMaxWidth={textMaxWidth} />
      <HealthSolutionsCard items={bannerCarouselItems} cardsColor="white"/>
    </section>
  )
}

export default BannerCarouselSection