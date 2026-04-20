'use client';
import React from 'react';
import { featureGridItem } from '@/layout/FeatureImageGridSection';
import FadeUp from '@/components/FadeUp';

interface FeatureGridItemProps {
  item: featureGridItem;
  index: number;
  totalItems: number;
}

export const FeatureGridItem: React.FC<FeatureGridItemProps> = ({ item, index, totalItems }) => {
  return (
    <div key={index} className={`col-span-4 sm:col-span-12 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 ${(index === 0 && totalItems > 1) && "mb-10 lg:mb-15"} items-stretch px-4 sm:px-6 lg:px-10`}>
      <div className={`${item.orderClassFeature} col-span-4 sm:col-span-12 lg:col-span-6 w-full lg:aspect grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:flex lg:flex-col ${item.title && item.description ? "lg:justify-between" : "lg:justify-end"}`}>
        {
          (item.title && item.description) && (
            <FadeUp className='col-span-4 sm:col-span-12 flex flex-col gap-y-5.5 lg:gap-y-6.5 mb-10 lg:mb-15'>
              <h3 className='max-w-132.5 text-heading2 leading-[110%] tracking-[-2%] lg:tracking-[-4%] font-medium'>
                {item.title?.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </h3>
              <p className='max-w-[90%]  xl:max-w-142 2xl:max-w-[80%] text-textSecondary text-bodyBase [@media(min-width:1920px)]:text-subHeading2 font-normal leading-[124%] tracking-[-2%]'>{item.description}</p>
            </FadeUp>
          )
        }
        <FadeUp className='lg:hidden col-span-3 sm:col-span-6 w-full aspect-square relative overflow-hidden mb-6'>
          <img src={item.image} alt={item.subTitle || item.title} className='w-full h-full object-cover object-center' />
        </FadeUp>
        <div className='col-span-4 sm:col-span-12 2xl:max-w-[80%] 2xl:w-full h-fit grid grid-cols-2 items-stretch gap-x-4 md:gap-x-5 lg:gap-x-7.5'>
          {item.subTitle && <FadeUp as="p" className='col-span-2 text-subHeading1 leading-[110%] tracking-[-2%] font-medium mb-6'>{item.subTitle}</FadeUp>}
          {item.featureItems.map((item, index) => (
            <FadeUp key={index} className='col-span-1 flex flex-col gap-y-4.5 lg:gap-y-5.5 gap-x-4 py-6 border-b border-borderColor'>
              <img src={item.icon} alt={item.title} className='h-8 w-8' />
              <p className='text-textSecondary text-body xl:text-bodyBase font-normal leading-[124%]'>{item.title}</p>
            </FadeUp>
          ))}
        </div>
      </div>
      <FadeUp className={`${item.orderClassImage} hidden lg:inline-block col-span-6 w-full aspect-square relative overflow-hidden`}>
        <img src={item.image} alt={item.subTitle || item.title} className='w-full h-full object-cover object-center' />
      </FadeUp>
    </div>
  )
}
