"use client"
import React from 'react'
import SectionHeader from '@/components/SectionHeader'
import FadeUp from '@/components/FadeUp'

interface FeatureItem {
  icon: string;
  description: string;
}

const InlineFeatureSection: React.FC<{ featureItems: FeatureItem[] }> = ({ featureItems }) => {
  return (
    <section className='@container grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 py-15 lg:py-20'>
      <SectionHeader 
        heading={"Clean. Ethically Sourced. \n Traceable."}
        text="Trace our ingredients from soil to shelf for proven authenticity, safety and efficacy."
        textMaxWidth="max-w-[90%] xl:max-w-142 2xl:max-w-[80%]"
        textColor="textSecondary"
        className='col-span-4 sm:col-span-12'
      />
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 col-span-4 sm:col-span-12 gap-y-6 md:gap-y-7.5 lg:gap-y-10 items-stretch px-4 sm:px-6 lg:px-10">
        {featureItems.map((item, index) => (
          <FadeUp key={index} className='col-span-4 sm:col-span-6 md:col-span-4 flex flex-col gap-y-5 md:gap-y-6 border-t border-borderColor pt-6 sm:pb-7.5 lg:pb-10'>
            <img src={item.icon} alt={item.description} className='h-8 w-8' />
            <p className='text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%] max-w-[90%] xl:max-w-142 2xl:max-w-[80%]'>{item.description}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

export default InlineFeatureSection