"use client"
import WhiteCardCarousel from '@/components/WhiteCardCarousel';
import SectionHeader from '@/components/SectionHeader';
import React from 'react';

interface WhiteCardCarouselItem {
  title: string;
  text: string;
  href?: string;
  target?: string;
}

interface WhiteCardCarouselSectionProps {
  heading: string;
  text?: string;
  ctaContent?: string;
  ctaHref?: string;
  classNameTextStructure?: string;
  headingColor?: string;
  textColor?: string;
  textMaxWidth?: string;
  whiteCardCarouselItems?: WhiteCardCarouselItem[];
}

const WhiteCardCarouselSection: React.FC<WhiteCardCarouselSectionProps> = ({heading, text, ctaContent, ctaHref, classNameTextStructure, textColor, headingColor, textMaxWidth, whiteCardCarouselItems}) => {
  return (
    <section className={`@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 gap-x-4 md:gap-x-5 lg:gap-x-7.5 bg-backgroundSecondary`}>
      <SectionHeader className='col-span-4'  heading={heading} text={text} ctaContent={ctaContent} ctaHref={ctaHref} classNameTextStructure={classNameTextStructure} headingColor={headingColor} textColor={textColor} textMaxWidth={textMaxWidth} />
      <WhiteCardCarousel items={whiteCardCarouselItems}/>
    </section>
  )
}

export default WhiteCardCarouselSection