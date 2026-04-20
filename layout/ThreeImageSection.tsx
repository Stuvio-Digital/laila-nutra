"use client";
import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import FadeUp from '@/components/FadeUp';

interface ThreeImageSectionItem {
  imgSrc: string;
  title: string;
  description: string;
}

interface ThreeImageSectionProps {
  heading: string;
  text?: string;
  threeImageSectionItems?: ThreeImageSectionItem[];
}

const ThreeImageSection: React.FC<ThreeImageSectionProps> = ({ heading, text, threeImageSectionItems = [] }) => {
  return (
    <section className='@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5'>
      <SectionHeader
        className='col-span-4 sm:col-span-12'
        heading={heading}
        text={text}
        classNameHeadingStructure="col-span-4 sm:col-span-12 @4xl:col-span-6"
        classNameTextStructure='col-span-4 sm:col-span-12 @4xl:col-start-9 @4xl:col-span-4'
        textColor='textSecondary'
        textPadding='pe-4 pl-4 sm:pe-6 sm:pl-6 @4xl:pe-10 @4xl:pl-0'
        textMaxWidth="max-w-142 lg:max-w-[90%] 2xl:max-w-[80%]"
      />
      <FadeUp className='flex no-scrollbar overflow-x-scroll min-w-full col-span-4 sm:col-span-12 @4xl:grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 px-4 sm:px-6 lg:px-10 items-stretch'>
        {threeImageSectionItems.map((item, index) => (
          <div key={index} className='shrink-0 @4xl:shrink @4xl:col-span-4 flex flex-col w-[80vw] sm:w-[40vw] @4xl:w-full'>
            <div className='w-full aspect-square relative overflow-hidden mb-6'>
              <img src={item.imgSrc} alt={item.title} className='h-full w-full object-cover object-center' />
            </div>
            <p className='text-black text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 leading-[110%] font-medium tracking-[-2%] mb-2 md:mb-3'>{item.title}</p>
            <p className='text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase leading-[124%] font-normal max-w-[90%] @6xl:max-w-[80%]'>{item.description}</p>
          </div>
        ))}
      </FadeUp>
    </section>
  )
}

export default ThreeImageSection