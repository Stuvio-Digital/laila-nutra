"use client"
import SectionHeader from '@/components/SectionHeader';
import React from 'react';

const awardItems = [
  {
    icon: "/images/quality-certifications/awards-icon.png",
    title: "Global Nutraceutical Innovation Award (2024)",
    description: "For breakthrough research in patented phytoactives and clinically proven nutraceutical formulations. Awarded by Nutraceutical World Congress, Geneva."
  },
  {
    icon: "/images/quality-certifications/awards-icon.png",
    title: "Excellence in Sustainable Manufacturing (2023)",
    description: "Recognized for leadership in eco-friendly extraction and renewable energy integration across GMP-certified facilities. Awarded by CII Green Manufacturing Forum, India."
  },
  {
    icon: "/images/quality-certifications/awards-icon.png",
    title: "Best Ingredient Innovation – Slimvance® (2022)",
    description: "Awarded for clinical excellence in non-stimulant weight management formulation. Recognized by SupplySide West, USA."
  },
  {
    icon: "/images/quality-certifications/awards-icon.png",
    title: "Women’s Health Ingredient of the Year – EstroMira™ (2020)",
    description: "Acknowledged as the world’s first patented Shatavari extract clinically validated for all stages of womanhood. Awarded by Nutra Ingredients Asia Awards."
  }
];

const Awards: React.FC = () => {
  return (
    <section className='@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5'>
      <SectionHeader className='col-span-4 sm:col-span-12' heading='Awards & Recognitions' />
      <div className='col-span-4 sm:col-span-12 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-6 px-4 sm:px-6 lg:px-10'>
        {awardItems.map((item, index) => (
          <div 
            key={index} 
            className='col-span-4 sm:col-span-6 xl:col-span-3 p-4 sm:p-5 lg:p-6 flex flex-col justify-between border border-borderColor aspect-square @6xl:aspect-auto @6xl:gap-y-25 xl:aspect-276/370 w-full items-stretch'
          >
            <img 
              src={item.icon} 
              alt="Awards" 
              className='h-9 w-9 xl:h-12.5 xl:w-12.5' 
            />
            <div className='flex flex-col gap-y-3'>
              <p className='text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 leading-[110%] tracking-[-2%] font-medium text-black text-wrap max-w-[80%] lg:max-w-[90%]'>
                {item.title}
              </p>
              <p className='text-body [@media(min-width:1920px)]:text-bodyBase leading-[124%] font-normal text-textSecondary text-wrap lg:max-w-[98%]'>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Awards;