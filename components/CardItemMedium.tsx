"use client";
import React from 'react';
import Link from 'next/link';
import { CarouselItem } from './HealthSolutionsCard';

const CardItemMedium = ({ item, index, isFixedGrid, cardsColor }: { item: CarouselItem, index: number, isFixedGrid: boolean, cardsColor?: string }) => {
  return (
    <Link
      href={"#"}
      className={`group shrink-0 aspect-278/370 [@media(min-width:1920px)]:aspect-270/350 ${cardsColor ? `bg-${cardsColor}` : "bg-white"} flex [@media(min-width:1241px)]:hidden flex-col justify-between relative overflow-hidden px-3.5 sm:px-5 lg:px-6 pt-6 pb-10 gap-y-4 @4xl:gap-y-6 ${isFixedGrid ? "w-75 sm:w-87.5 @6xl:w-full" : "w-[86vw] sm:w-[45vw] lg:w-[40vw] @6xl:w-[calc(33vw-46px)]"}`}
    >
      <div className="flex flex-col w-full items-start mb-4 xl:mb-6 relative z-10">
        <p className="text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 leading-[110%] tracking-[-2%] font-medium text-black text-wrap max-w-[80%] lg:max-w-full">
          {item.title.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
      <div className="w-auto max-w-[50%] md:max-w-[70%] flex-1 grow h-auto aspect-square rounded-full relative overflow-hidden origin-top mx-auto">
        <img
          src={item.imgSrc}
          alt={item.title}
          className="aspect-square w-full object-cover object-center rounded-full"
        />
      </div>
      <div className="pt-4 xl:pt-6 2xl:pt-10 flex flex-col flex-1 grow w-full">
        <div className='py-3.5 md:py-4 border-t border-borderColor flex flex-col gap-y-2 md:gap-y-3'>
          <p className='text-body2 leading-[124%] tracking-[-1%] font-medium text-black text-wrap max-w-[80%] lg:max-w-full'>Common Name</p>
          <p className='text-body leading-[124%] tracking-[-1%] font-normal text-textSecondary text-wrap max-w-[80%] lg:max-w-full'>Asparagus Racemosus Extract</p>
        </div>
        <div className='pt-3.5 md:py-4 border-t border-borderColor flex flex-col gap-y-2 md:gap-y-3'>
          <p className='text-body2 leading-[124%] tracking-[-1%] font-medium text-black text-wrap max-w-[80%] lg:max-w-full'>Health Benefit</p>
          <p className='text-body leading-[124%] tracking-[-1%] font-normal text-textSecondary text-wrap max-w-[80%] lg:max-w-full'>Aids in hormonal balance and women’s wellness across every life stage</p>
        </div>
      </div>
      {item.href && (
        <div className="absolute bottom-4 right-4 h-8 w-8 overflow-hidden rounded-sm flex items-center justify-center z-30">
          <img src="/icons/link_arrow.svg" alt="Link Arrow" className="absolute w-full h-full transform lg:group-hover:transition-transform lg:group-hover:duration-500 lg:group-hover:ease-in-out lg:group-hover:translate-x-full lg:group-hover:-translate-y-full" />
          <img src="/icons/link_arrow.svg" alt="" className="absolute w-full h-full transform -translate-x-full translate-y-full lg:group-hover:transition-transform lg:group-hover:duration-500 lg:group-hover:ease-in-out lg:group-hover:translate-x-0 lg:group-hover:translate-y-0" />
        </div>
      )}
    </Link>
  );
};

export default CardItemMedium;
