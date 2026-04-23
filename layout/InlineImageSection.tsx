"use client";
import React from 'react';
import FadeUp from '@/components/FadeUp';
import CTA from '@/components/CTA';

interface InlineImageSectionProps {
  imgSrc: string;
  title: string;
  text: string;
  className?: string;
  ctaContent?: string;
}

const InlineImageSection: React.FC<InlineImageSectionProps> = ({ imgSrc, title, text, className, ctaContent }) => {
  return (
    <section className={`@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-7 md:gap-y-7.5 lg:gap-y-15 px-4 sm:px-6 lg:px-10 ${className}`}>
      <FadeUp as="h3" className='text-heading2 leading-[110%] tracking-[-2%] lg:tracking-[-4%] font-medium col-span-4 md:col-span-2'>
        {title?.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </FadeUp>
      <FadeUp as="img" src={imgSrc} alt={title} className='col-span-full aspect-video md:aspect-1200/514 object-cover object-center' />
      <FadeUp as="div" className='col-start-1 col-span-4 md:col-start-3 md:col-span-2 flex flex-col gap-y-5 md:gap-y-6'>
        <p className='text-textSecondary text-bodyBase [@media(min-width:1920px)]:text-subHeading2 font-normal leading-[124%] tracking-[-2%] max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]'>
          {text}
        </p>
        {ctaContent && <CTA ctaContent={ctaContent}/>}
      </FadeUp>
    </section>
  )
}

export default InlineImageSection