"use client";
import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import FadeUp from '@/components/FadeUp';

const sustainabilityEfforts = [
  {
    imgSrc: "/icons/lab_research.svg",
    title: "Green Formulation Design",
    text: "Incorporation of eco-friendly excipients, bio-based polymers and sustainable packaging materials.",
  },
  {
    imgSrc: "/icons/packaging.svg",
    title: "Advanced Packaging",
    text: "Using recyclable sachets, biodegradable gummy pouches, eco-containers and reduced-plastic formats.",
  },
  {
    imgSrc: "/icons/eco.svg",
    title: "Sustainable Technology",
    text: "Nano, liposomal and sucrasomal systems improve bioavailability and reduce raw material use.",
  },
  {
    imgSrc: "/icons/warehouse.svg",
    title: "Stability & Shelf-Life",
    text: "Formulating longer-lasting formulations to minimize waste across the supply chain.",
  },
  {
    imgSrc: "/icons/water_ec.svg",
    title: "Energy-Efficient Manufacturing",
    text: "Enabled automated, optimized production lines that cut emissions.",
  }
]

const responsibilityPillars = [
  {
    imgSrc: "/icons/lab_research.svg",
    title: "Global Compliance",
    text: "IFollowing FSSAI, AYUSH, US FDA, EFSA, and ASEAN standards for safety and trust.",
  },
  {
    imgSrc: "/icons/packaging.svg",
    title: "IPR Integrity",
    text: "Protecting innovation with 80+ US and 120+ Indian patents.",
  },
  {
    imgSrc: "/icons/eco.svg",
    title: "Safe Hands Promise",
    text: "Rigorous in-house and CRO-supported validation for efficacy and consumer safety.",
  },
  {
    imgSrc: "/icons/warehouse.svg",
    title: "Partner-Centric Growth",
    text: "Acting as an extension of your team, blending innovation with ethical responsibility.",
  },
  {
    imgSrc: "/icons/water_ec.svg",
    title: "Knowledge Sharing",
    text: "Contributing to research publications, thought leadership, and global nutraceutical discussions.",
  }
]

const categories = [
  {
    name: "Sustainability Efforts",
    items: sustainabilityEfforts
  },
  {
    name: "Responsibility Pillars",
    items: responsibilityPillars
  },
]

const Cdmo: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState(categories[0].name);

  const displayedItems = categories.find(cat => cat.name === activeCategory)?.items || [];

  return (
    <section className='@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5'>
      <SectionHeader
        className='col-span-4 sm:col-span-12 mb-10'
        heading={'CDMO Sustainability & \n Responsibility'}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <div className='col-span-4 sm:col-span-12 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 px-4 sm:px-6 lg:px-10 gap-y-6 md:gap-y-7.5 lg:gap-y-10'>
        {displayedItems.map((item, index) => (
          <FadeUp key={index} className='col-span-4 sm:col-span-6 @4xl:col-span-4 flex flex-col'>
            <img src={item.imgSrc} alt={item.title} className='h-8 w-8 mb-3.5 lg:mb-4.5' />
            <p className='text-black text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 leading-[110%] font-medium tracking-[-2%] mb-2 md:mb-3'>{item.title}</p>
            <p className='text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase leading-[124%] font-normal max-w-[90%] @6xl:max-w-[80%]'>{item.text}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

export default Cdmo