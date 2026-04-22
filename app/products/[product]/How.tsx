"use client";
import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import FadeUp from '@/components/FadeUp';

const howItems = [
  {
    title: "COX Pathway - Fast Acting",
    points: [
      "Turmeric Root Extract supports a rapid comfort response",
      "Helps address activity-related joint discomfort early"
    ]
  },
  {
    title: "LOX Pathway - Long Lasting",
    points: [
      "Tamarind Seed Extract supports sustained joint relief",
      "Balanced support for stiffness and soreness over time"
    ]
  },
  {
    title: "AntiOX - Preventive Protection",
    points: [
      "Antioxidant activity supports cartilage and connective tissue health",
      "Human studies show improved joint lubrication with continued use"
    ]
  }
];

const How: React.FC = () => {
  return (
    <section className="@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5">
      <SectionHeader className='col-span-4 sm:col-span-12' heading={"How EstroMira™ Works"} text={"TamaFlex® works through a unique Triple “OX” Pathway to deliver fast relief, sustained comfort, and long-term joint protection."} textColor='textSecondary' textMaxWidth='max-w-[90%] xl:max-w-142 2xl:max-w-[80%]'/>
      <div className='col-span-4 sm:col-span-12 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-6 px-4 sm:px-6 lg:px-10 items-stretch'>
        {howItems.map((item, index) => (
          <div key={index} className='aspect-380/240 sm:aspect-auto md:aspect-380/240 w-full h-fit col-span-4 sm:col-span-12 md:col-span-4 p-4 sm:p-5 lg:p-6 flex justify-between flex-col border border-borderColor'>
            <FadeUp as='p' className='text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 leading-[110%] tracking-[-2%] font-medium mb-7 sm:mb-15'>
              {item.title}
            </FadeUp>
            <ul className='flex flex-col gap-3 list-disc'>
              {item.points.map((point, pointIndex) => (
                <FadeUp key={pointIndex} as='li' className='max-w-[90%] text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%] 2xl:max-w-[80%] list-inside'>
                  {point}
                </FadeUp>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default How;