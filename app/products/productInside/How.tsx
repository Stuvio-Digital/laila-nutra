"use client";
import React from 'react';
import SectionHeader from '@/components/SectionHeader';

const How: React.FC = () => {
  return (
    <section className="@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5">
      <SectionHeader className='col-span-4 sm:col-span-12'  heading={"How EstroMira™ Works"} text={"TamaFlex® works through a unique Triple “OX” Pathway to deliver fast relief, sustained comfort, and long-term joint protection."} textColor='textSecondary' textMaxWidth='max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]'/>
      <div className='col-span-4 sm:col-span-12 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-6 px-4 sm:px-6 lg:px-10'>
        <div className='aspect-380/240 col-span-4 sm:col-span-12 md:col-span-4 p-4 sm:p-5 lg:p-6 flex justify-between flex-col border border-borderColor'>
          <p className='text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 leading-[110%] tracking-[-2%] font-medium'>COX Pathway - Fast Acting</p>
          <ul className='flex flex-col gap-3 list-disc'>
            <li className='max-w-[90%] text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%] 2xl:max-w-[80%] list-inside'>Turmeric Root Extract supports a rapid comfort response</li>
            <li className='max-w-[90%] text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%] 2xl:max-w-[80%] list-inside'>Helps address activity-related joint discomfort early</li>
          </ul>
        </div>
        <div className='aspect-380/240 col-span-4 sm:col-span-12 md:col-span-4 p-4 sm:p-5 lg:p-6 flex justify-between flex-col border border-borderColor'>
          <p className='text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 leading-[110%] tracking-[-2%] font-medium'>LOX Pathway - Long Lasting</p>
          <ul className='flex flex-col gap-3 list-disc'>
            <li className='max-w-[90%] text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%] 2xl:max-w-[80%] list-inside'>Tamarind Seed Extract supports sustained joint relief</li>
            <li className='max-w-[90%] text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%] 2xl:max-w-[80%] list-inside'>Balanced support for stiffness and soreness over time</li>
          </ul>
        </div>
        <div className='aspect-380/240 col-span-4 sm:col-span-12 md:col-span-4 p-4 sm:p-5 lg:p-6 flex justify-between flex-col border border-borderColor'>
          <p className='text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 leading-[110%] tracking-[-2%] font-medium'>AntiOX - Preventive Protection</p>
          <ul className='flex flex-col gap-3 list-disc'>
            <li className='max-w-[90%] text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%] 2xl:max-w-[80%] list-inside'>Antioxidant activity supports cartilage and connective tissue health</li>
            <li className='max-w-[90%] text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%] 2xl:max-w-[80%] list-inside'>Human studies show improved joint lubrication with continued use</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default How