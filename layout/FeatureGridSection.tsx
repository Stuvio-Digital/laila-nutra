"use client";
import React from 'react';
import SectionHeader from '@/components/SectionHeader';

interface FeatureGridSectionProps {
  heading: string;
  text?: string;
  ctaContent?: string;
  ctaHref?: string;
  classNameTextStructure?: string;
  headingColor?: string;
  textMaxWidth?: string;
  textColor?: string;
  bgColor?: string;
  features: {
    iconSrc: string;
    title: string;
    description?: string;
  }[];
}

const FeatureGridSection: React.FC<FeatureGridSectionProps> = ({ heading, text, ctaContent, ctaHref, classNameTextStructure, headingColor, textMaxWidth, textColor, bgColor, features }) => {
  const isMultipleOfFive = features.length % 5 === 0;

  return (
    <section className={`@container h-fit w-full py-15 lg:py-20 grid ${isMultipleOfFive ? "grid-cols-5" : "grid-cols-4"} gap-x-4 md:gap-x-5 lg:gap-x-7.5 bg-${bgColor} `}>
      <SectionHeader className={isMultipleOfFive ? "col-span-5" : "col-span-4"} heading={heading} text={text} ctaContent={ctaContent} ctaHref={ctaHref} classNameTextStructure={classNameTextStructure} headingColor={headingColor} textMaxWidth={textMaxWidth} textColor={textColor} />
      <div className={`col-span-full grid ${isMultipleOfFive ? "grid-cols-5" : "grid-cols-4"} gap-x-4 md:gap-x-5 lg:gap-x-7.5 px-4 sm:px-6 lg:px-10 gap-y-6 sm:gap-y-7 md:gap-y-10`}>
        {features.map((feature, index) => (
          <div key={index} className={`${isMultipleOfFive ? "col-span-5 @4xl:col-span-1" : "col-span-4 sm:col-span-2 @4xl:col-span-1"} flex flex-col pt-6 @4xl:pt-0 @4xl:border-t-0 border-t border-borderColor`}>
            <img src={feature.iconSrc} alt={feature.title} className='h-8 w-8 mb-5 sm:mb-6' />
            <p className='text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 leading-[110%] tracking-[-2%] font-medium mb-2 sm:mb-3'>{feature.title}</p>
            {feature.description && <p className='max-w-[90%] text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%] 2xl:max-w-[80%]'>{feature.description}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeatureGridSection