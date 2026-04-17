"use client";
import React from 'react';
import Link from 'next/link';
import ActionLink from '@/components/ActionLink';

export interface ProductItem {
  title: string;
  text?: string;
  imgSrc: string;
}

interface ProductListingProps {
  items?: ProductItem[];
}

const ProductListing: React.FC<ProductListingProps> = ({ items = [] }) => {
  return (
    <section className='@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-6 md:gap-y-7 lg:gap-y-10 xl:gap-y-15 px-4 sm:px-6 lg:px-10 bg-backgroundSecondary items-stretch'>
      {items.map((item, index) => (
        <Link href="/products/productInside" key={index} className={`col-span-4 sm:col-span-4 @6xl:col-span-3 [@media(min-width:1920px)]:col-span-2 w-full aspect-278/370 [@media(min-width:1920px)]:aspect-270/350 bg-white flex flex-col justify-between relative`}>

          {/* [@media(min-width:1920px)]:w-87.5 */}
          <div className="flex flex-col w-full items-start gap-y-3 p-4 sm:p-5 lg:p-6">
            <p className="text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 leading-[110%] tracking-[-2%] font-medium text-black text-wrap max-w-[80%] lg:max-w-[90%]">
              {item.title.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            {
              item.text && (
                <p className="text-body [@media(min-width:1920px)]:text-bodyBase leading-[124%] tracking-[-2%] font-normal text-textSecondary text-wrap lg:max-w-[90%] [@media(min-width:1920px)]:max-w-full">
                  {item.text}
                </p>
              )
            }
            {/* <ActionLink href="/products/productInside" text="Learn More" /> */}
          </div>
          <div className="w-full h-auto flex justify-center items-center pb-[11%]">
            <div className="w-[71.44%] aspect-square rounded-full relative overflow-hidden">
              <img
                src={item.imgSrc}
                alt={item.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <img src="/icons/link_arrow.svg" alt="Link Arrow" className='absolute bottom-7 right-6 h-8 w-8' />
        </Link>
      ))}
    </section>
  )
}

export default ProductListing