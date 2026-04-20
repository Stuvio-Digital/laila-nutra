"use client";
import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import FadeUp from '@/components/FadeUp';

const calendarEvents = [
  {
    date: "8 Mar, 2026",
    title: "International Women’s Day",
    description: "Adoption of green extraction technologies (CO₂, solvent-free methods) that minimize environmental footprint.",
    imgSrc: "/images/home/womens-day.webp",
    imgAlt: "womens-day",
    benefits: "Supports hormonal balance & joint health",
    products: ["EstroMira™", "Boswellin®"],
  },
  {
    date: "22 Mar, 2025",
    title: "World Water Day",
    description: "On World Water Day, we celebrate hydration and innovation -HydroCurc™ delivers Curcumin’s power where water flows.",
    imgSrc: "/images/home/water-day.webp",
    imgAlt: "water-day",
    benefits: "Water-dispersible curcumin with enhanced bioavailability.",
    products: ["HydroCurc™"],
  },
  {
    date: "12 May, 2025",
    title: "International Nurses Day",
    description: "To every caregiver - thank you for healing the world. Laila Nutra salutes your strength with the science of recovery.",
    imgSrc: "/images/home/nurse-day.webp",
    imgAlt: "nurse-day",
    benefits: "Joint & muscle comfort, daily energy support.",
    products: ["Boswellin®", "Curcumin C3 Complex®"],
  }
];

const WellnessCalendar: React.FC = () => {
  return (
    <section className="@container relative w-full h-fit grid grid-cols-4 py-15 lg:py-20 gap-x-4 md:gap-x-5 lg:gap-x-7.5">
      <SectionHeader
        className='col-span-4'
        heading={"The Wellness Calendar"}
        ctaContent="View all"
        ctaHref="#"
      />
      {calendarEvents.map((event, index) => (
        <FadeUp key={index} className='col-span-4 h-fit w-full grid grid-cols-4 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-6 mb-6 md:mb-7.5 lg:mb-10 pt-6 border-t border-borderColor px-4 sm:px-6 lg:px-10'>
          <div className='col-span-4 sm:col-span-3 lg:col-span-2 md:max-w-[80%]'>
            <p className='mb-6 md:mb-7.5 lg:mb-10 text-heading3 text-blue leading-[110%] tracking-[-3%] font-medium'>
              {event.date}
            </p>
            <p className='mb-3 md:mb-4 text-subHeading2 text-black [@media(min-width:1920px)]:text-subHeading1 leading-[110%] tracking-[-2%] font-medium'>
              {event.title}
            </p>
            <p className='text-body [@media(min-width:1920px)]:text-bodyBase leading-[124%] tracking-[-2%] font-normal text-textSecondary text-wrap max-w-[90%] lg:max-w-[80%]'>
              {event.description}
            </p>
          </div>
          <div className='col-span-4 sm:col-span-2 sm:col-start-1 lg:col-start-3 lg:col-span-1 w-full aspect-278/208 relative overflow-hidden'>
            <img src={event.imgSrc} alt={event.imgAlt} className='w-full h-full object-cover object-center' />
          </div>
          <div className='col-span-4 sm:col-span-2 lg:col-span-1 lg:col-start-4 w-full max-w-[90%]'>
            <p className='text-body [@media(min-width:1920px)]:text-bodyBase leading-[124%] tracking-[-2%] font-normal text-textSecondary text-wrap mb-4'>
              {event.benefits}
            </p>
            {event.products.map((product, pIndex) => (
              <p key={pIndex} className='text-body [@media(min-width:1920px)]:text-bodyBase leading-[124%] tracking-[-2%] font-medium text-black text-wrap py-3.5 sm:py-4 md:py-5 lg:py-6 border-t border-borderColor'>
                {product}
              </p>
            ))}
          </div>
        </FadeUp>
      ))}
    </section>
  )
}

export default WellnessCalendar