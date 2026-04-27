"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CarouselItem } from './HealthSolutionsCard';

const CardItemDesktop = ({ item, index, isFixedGrid, cardsColor }: { item: CarouselItem, index: number, isFixedGrid: boolean, cardsColor?: string }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const detailContentRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseEnter = contextSafe(() => {
    if (window.innerWidth > 1240) {
      if (textRef.current) {
        gsap.to(textRef.current, { opacity: 0, height: 0, duration: 0.4, ease: "power2.out" });
      }

      if (detailContentRef.current) {
        gsap.to(detailContentRef.current, { justifyContent: "between", duration: 0.4, ease: "power2.out", flexGrow: 1, flexShrink: 1, flex: 1 , height: "auto", paddingBottom: "40px"});
      }
      
      if (imageContainerRef.current) {
        const is2XL = window.matchMedia("(min-width: 1536px)").matches;
        gsap.to(imageContainerRef.current, { maxWidth: is2XL ? "45%" : "37%", duration: 0.4, ease: "power2.out" });
      }
  
      if (contentRef.current) {
        gsap.to(contentRef.current, { opacity: 1, height: "auto", duration: 0.4, ease: "power2.out" });
      }
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (window.innerWidth > 1240) {
      if (textRef.current) {
        gsap.to(textRef.current, { opacity: 1, height: "auto", duration: 0.4, ease: "power2.out" });
      }

      if (detailContentRef.current) {
        gsap.to(detailContentRef.current, { opacity: 1, justifyContent: "space-between", paddingBottom: "16%", duration: 0.4, ease: "power2.out", height: "fit", flexGrow: 0, flex: 0 });
      }
  
      if (imageContainerRef.current) {
        const is2XL = window.matchMedia("(min-width: 1536px)").matches;
        gsap.to(imageContainerRef.current, { maxWidth: is2XL ? "75%" : "80%", duration: 0.4, ease: "power2.out" });
      }

      if (contentRef.current) {
        gsap.to(contentRef.current, { opacity: 0, height: 0, duration: 0.4, ease: "power2.out" });
      }
    }
  });

  return (
    <Link
      ref={cardRef}
      href={"#"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // href={item.href || "#"}
      className={`group shrink-0 aspect-278/370 [@media(min-width:1920px)]:aspect-270/350 ${cardsColor ? `bg-${cardsColor}` : "bg-white"} hidden [@media(min-width:1241px)]:flex flex-col justify-between relative overflow-hidden ${isFixedGrid ? "w-75 sm:w-87.5 @6xl:w-full @6xl:col-span-3" : "w-70 md:w-[33vw] @6xl:w-[25vw] xl:w-[calc(25vw-46px)]"}`}
    >
      <div className="flex flex-col w-full items-start px-3.5 sm:px-5 lg:px-6 pt-6 mb-4 2xl:mb-6 relative z-10">
        <p className="text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 leading-[110%] tracking-[-2%] font-medium text-black text-wrap max-w-[80%] lg:max-w-full">
          {item.title.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        {
          item.text && (
            <p ref={textRef} className="text-body [@media(min-width:1920px)]:text-bodyBase leading-[124%] tracking-[-2%] font-normal text-textSecondary text-wrap lg:max-w-[90%] overflow-hidden origin-top mt-3">
              {item.text}
            </p>
          )
        }
      </div>
      <div ref={detailContentRef} className={`w-full h-fit flex flex-col justify-between items-center px-5 md:px-6 relative z-10 pb-[16%]`}>
        <div ref={imageContainerRef} className="w-auto max-w-[80%] 2xl:max-w-[75%] h-auto aspect-square rounded-full relative overflow-hidden origin-top mx-auto">
          <img
            src={item.imgSrc}
            alt={item.title}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div 
          ref={contentRef} 
          style={{ height: 0, opacity: 0 }}
          className={`w-full flex flex-col shrink-0 overflow-hidden ${cardsColor ? `bg-${cardsColor}` : "bg-white"}`}
        >
          <div className="pt-4 xl:pt-6 2xl:pt-10 flex flex-col w-full">
            <div className='py-3.5 md:py-4 border-t border-borderColor flex flex-col gap-y-2 md:gap-y-3'>
              <p className='text-body2 leading-[124%] tracking-[-1%] font-medium text-black text-wrap max-w-[80%] lg:max-w-full'>Common Name</p>
              <p className='text-body leading-[124%] tracking-[-1%] font-normal text-textSecondary text-wrap max-w-[80%] lg:max-w-full'>Asparagus Racemosus Extract</p>
            </div>
            <div className='pt-3.5 md:pt-4 border-t border-borderColor flex flex-col gap-y-2 md:gap-y-3'>
              <p className='text-body2 leading-[124%] tracking-[-1%] font-medium text-black text-wrap max-w-[80%] lg:max-w-full'>Health Benefit</p>
              <p className='text-body leading-[124%] tracking-[-1%] font-normal text-textSecondary text-wrap max-w-[80%] lg:max-w-full'>Aids in hormonal balance and women’s wellness across every life stage</p>
            </div>
          </div>
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

export default CardItemDesktop;
