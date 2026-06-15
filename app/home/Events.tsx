"use client";
import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import CTA from '@/components/CTA';
import FadeUp from '@/components/FadeUp';
import Link from 'next/link';

const Events: React.FC = () => {
  return (
    <section className="@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5">
      <SectionHeader
        className='col-span-4 sm:col-span-12'
        heading={"Past Events"}
      />
      <FadeUp className='col-span-4 sm:col-span-12 h-fit w-full grid grid-cols-4 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-6 mb-6 md:mb-7.5 lg:mb-10 pt-6 border-t border-borderColor px-4 sm:px-6 lg:px-10'>
        <div className='col-span-4 sm:col-span-3 lg:col-span-2 md:max-w-[80%] flex flex-col gap-y-4 md:gap-y-5'>
          <div className='flex justify-between items-start gap-7'>
            <div className='flex flex-col gap-y-4 md:gap-y-5 w-[60%]'>
              <p className='text-heading3 text-blue leading-[100%] tracking-[-3%] font-medium'>
                5 to 7 May, 2026
              </p>
              <p className='text-subHeading2 text-black [@media(min-width:1920px)]:text-subHeading1 leading-[100%] tracking-[-2%] font-medium'>
                Vitafoods Europe 2026
              </p>
            </div>
            <CTA ctaContent="View More" href={"https://www.vitafoods.eu.com/en/home.html"} target='_blank' className='sm:hidden block' />
          </div>
          <p className='text-body [@media(min-width:1920px)]:text-bodyBase leading-[124%] tracking-[-2%] font-normal text-textSecondary text-wrap max-w-[90%] lg:max-w-[80%]'>
            Laila Nutra is all set to be at Vitafoods Europe 2026, bringing science-led nutraceutical innovation to a global stage. <br /> <br />From clinically validated ingredients to end-to-end CDMO solutions, we’re ready to connect, collaborate, and create what’s next for the industry.
          </p>
          <CTA ctaContent="View More" href={"https://www.vitafoods.eu.com/en/home.html"} target='_blank' className='sm:block hidden' />
        </div>
        <Link href={"https://www.vitafoods.eu.com/en/home.html"} target='_blank' className='col-span-4 sm:col-span-2 w-full relative overflow-hidden aspect-4/3'>
          <img src="/images/home/events.png" alt="Vitafoods Europe 2026" className='w-full h-full object-cover object-center absolute top-0 left-0 z-10' />
          <div className='h-full w-full bg-black/30 backdrop-blur-md absolute top-0 left-0 z-20'/>

          <img src="/images/home/events.png" alt="Vitafoods Europe 2026" className='h-full w-auto object-conatin object-center absolute top-0 left-1/2 -translate-x-1/2 z-30' />
        </Link>
      </FadeUp>
    </section>
  )
}

export default Events