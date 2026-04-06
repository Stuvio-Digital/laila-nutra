"use client";
import SectionHeader from '@/components/SectionHeader';
import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5">
      <SectionHeader className='col-span-4 sm:col-span-12'  heading={"Plant Science For Women"} text={"EstroMira™ is a patented Asparagus Racemosus extract (standardized to 15% Shatavarins) crafted to support hormonal balance, reproductive health and overall vitality in women with the help of nature's power."} textColor='textSecondary' textMaxWidth='max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]'/>
      <div className='col-span-4 sm:col-span-12 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-6 sm:gap-y-10 px-4 sm:px-6 lg:px-10 items-stretch '>
        <div className='flex flex-col justify-between col-span-4 sm:col-span-12 lg:col-span-3 gap-y-6 sm:gap-y-10'>
          <div className='flex flex-col'>
            <img src="/icons/stress_management.svg" alt="stress_management" className='h-8 w-8 mb-4 lg:mb-6' />
            <p className='max-w-[90%] text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%] 2xl:max-w-[80%] pt-4 lg:pt-6 border-t border-borderColor'>
              Safe and natural remedy for hormonal wellness
            </p>
          </div>
          <div className='flex flex-col'>
            <img src="/icons/footprint.svg" alt="footprint" className='h-8 w-8 mb-4 lg:mb-6' />
            <p className='max-w-[90%] text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%] 2xl:max-w-[80%] pt-4 lg:pt-6 border-t border-borderColor'>
              Made for every stage of womanhood
            </p>
          </div>
        </div>
        <div className='relative col-span-4 sm:col-span-8 sm:col-start-3 lg:col-start-4 lg:col-span-6 w-[50%] aspect-square lg:aspect-278/456 overflow-hidden mx-auto'>
          <img src="/images/products/productInside-banner.webp" alt="EstroMira" className='absolute inset-0 w-full h-full object-cover' />
        </div>
        <div className='flex flex-col justify-between col-span-4 sm:col-span-12 lg:col-span-3 gap-y-6 sm:gap-y-10'>
          <div className='flex flex-col'>
            <img src="/icons/salinity.svg" alt="salinity" className='h-8 w-8 mb-4 lg:mb-6' />
            <p className='max-w-[90%] text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%] 2xl:max-w-[80%] pt-4 lg:pt-6 border-t border-borderColor'>
              World's first patented extract of Asparagus Racemosus
            </p>
          </div>
          <div className='flex flex-col justify-between col-span-1 sm:col-span-12 lg:col-span-3 gap-y-6 sm:gap-y-10'>
            <img src="/icons/psychiatry.svg" alt="psychiatry" className='h-8 w-8 mb-4 lg:mb-6' />
            <p className='max-w-[90%] text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%] 2xl:max-w-[80%] pt-4 lg:pt-6 border-t border-borderColor'>
              100% plant-based & clinically validated
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features