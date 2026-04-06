"use client"
import React from 'react';

interface ImageGridSectionProps {
  heading: string;
  text: string;
  imgSmall: string;
  imgBig: string;
}

const ImageGridSection: React.FC<ImageGridSectionProps> = ({ heading, text, imgSmall, imgBig }) => {
  return (
    <section className='@container h-fit w-full grid grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 py-15 lg:py-20 px-4 sm:px-6 lg:px-10 gap-y-10 lg:gap-y-15 [@media(min-width:1152px)]:gap-y-0'>
      <div className='col-span-12 [@media(min-width:1152px)]:col-span-6 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 [@media(min-width:1152px)]:flex [@media(min-width:1152px)]:flex-col justify-between h-full'>
        <h3 className='col-span-4 sm:col-span-12 lg:col-span-6 max-w-[90%] text-heading2 leading-[110%] tracking-[-2%] lg:tracking-[-4%] font-medium mb-5 md:mb-6 [@media(min-width:1152px)]:mb-0'>
          {heading.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h3>
        <div className='flex flex-col gap-y-7 xl:gap-y-10 col-span-4 sm:col-span-12 lg:col-span-6'>
          <p className='max-w-[90%] xl:max-w-[80%] text-textSecondary text-bodyBase [@media(min-width:1920px)]:text-subHeading2 font-normal leading-[124%] tracking-[-2%]'>{text}</p>
          <div className='hidden [@media(min-width:1152px)]:grid grid-cols-2 gap-x-4 md:gap-x-5 lg:gap-x-7.5'>
            <div className='col-span-1 w-full aspect-square'>
              <img src={imgSmall} alt="Small Image" className='h-full w-full object-cover object-center' />
            </div>
          </div>
        </div>
      </div>
      <div className='[@media(min-width:1152px)]:hidden col-span-5 lg:col-span-6 aspect-square mt-auto'>
        <img src={imgSmall} alt="Small Image" className='h-full w-full object-cover object-center' />
      </div>
      <div className='col-span-7 lg:col-span-6 h-full aspect-square'>
        <img src={imgBig} alt="Big Image" className='h-full w-full object-cover object-center' />
      </div>
    </section>
  )
}

export default ImageGridSection