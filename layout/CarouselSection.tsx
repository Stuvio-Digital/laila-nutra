"use client"
import CardCarousel from '@/components/CardCarousel';
import SectionHeader from '@/components/SectionHeader';
import React from 'react';

interface CarouselItem {
  imgSrc: string;
  title: string;
  text?: string;
}

interface CarouselSectionProps {
  heading: string;
  text?: string;
  ctaContent?: string;
  ctaHref?: string;
  classNameTextStructure?: string;
  headingColor?: string;
  textMaxWidth?: string;
  textColor?: string;
  bgColor?: string;
  carouselItems?: CarouselItem[];
  cardsColor?: string;
}

const CarouselSection: React.FC<CarouselSectionProps> = ({heading, text, ctaContent, ctaHref, classNameTextStructure, bgColor, textColor, textMaxWidth, headingColor, carouselItems, cardsColor}) => {
  return (
    <section className={`@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 gap-x-4 md:gap-x-5 lg:gap-x-7.5 bg-${bgColor}`}>
      <SectionHeader className='col-span-4'  heading={heading} text={text} ctaContent={ctaContent} ctaHref={ctaHref} classNameTextStructure={classNameTextStructure} headingColor={headingColor} textMaxWidth={textMaxWidth} textColor={textColor} />
      <CardCarousel items={carouselItems} cardsColor={cardsColor}/>
    </section>
  )
}

export default CarouselSection