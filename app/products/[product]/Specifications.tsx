"use client";
import FadeUp from '@/components/FadeUp';
import React, { useState } from 'react';

export interface SpecPoint {
  label: string;
  value: string;
}

export interface SpecCategory {
  name: string;
  points: SpecPoint[];
}

export interface SpecificationsProps {
  title?: string;
  image?: string;
  categories?: SpecCategory[];
  points?: SpecPoint[];
}

// const defaultPoints: SpecPoint[] = [
//   { label: 'Common Name', value: 'Asparagus Racemosus Extract' },
//   { label: 'Specification', value: 'Standardized to 15% Shatavarins' },
//   { label: 'Type', value: 'Extract' },
//   { label: 'Health Benefit', value: 'Aids in hormonal balance and women’s wellness across every life stage' },
//   { label: 'Plant Source', value: 'Flowers and leaves (aerial part)' }
// ];

const defaultCategories: SpecCategory[] = [
  {
    name: "About The Patent",
    points: [
      { label: 'Common Name', value: 'Asparagus Racemosus Extract' },
      { label: 'Specification', value: 'Standardized to 15% Shatavarins' },
      { label: 'Type', value: 'Extract' },
      { label: 'Health Benefit', value: 'Aids in hormonal balance and women’s wellness across every life stage' },
      { label: 'Plant Source', value: 'Flowers and leaves (aerial part)' },
    ]
  },
  // {
  //   name: "Clinical Studies",
  //   points: [
  //     { label: 'Health Benefit', value: 'Aids in hormonal balance and women’s wellness across every life stage' },
  //     { label: 'Clinical Efficacy', value: 'Proven to naturally restore vitality and balance through extensive testing.' },
  //     { label: 'Plant Source', value: 'Flowers and leaves (aerial part)' }
  //   ]
  // },
  // {
  //   name: "Clinical Outcomes",
  //   points: [
  //     { label: 'Results', value: 'Visibly reduces hot flashes by 73% and significantly improves sleep quality and mood.' },
  //     { label: 'Safety & Action', value: 'Works seamlessly without any hormonal side effects, fully validated by safe human trials.' }
  //   ]
  // }
];

const Specifications: React.FC<SpecificationsProps> = ({ 
  title = "Key Sepcifications", 
  image = "/images/products/root.webp", 
  categories = defaultCategories, 
  points = []
}) => {
  const [activeTab, setActiveTab] = useState("");

  const currentTab = activeTab || (categories && categories.length > 0 ? categories[0].name : "");

  const displayPoints = categories && categories.length > 0
    ? categories.find(c => c.name === currentTab)?.points || []
    : points;

  const renderTabs = () => {
    if (!categories || categories.length <= 1) return null;
    return (
      <div className='w-full whitespace-nowrap no-scrollbar overflow-x-scroll flex items-center justify-start mb-10 md:mb-0 md:mt-7.5 gap-6 md:gap-7.5 lg:gap-10 border-b border-[#E5E5E5]'>
        {categories.map((cat, index) => (
          <p
            key={index}
            onClick={() => setActiveTab(cat.name)}
            className={`shrink-0 cursor-pointer py-3.5 md:py-4 text-subHeading2 tracking-[-2%] font-medium leading-[110%] border-b-2 transition-colors duration-300 ${currentTab === cat.name ? 'text-blue border-blue' : 'text-textSecondary/80 border-transparent hover:text-blue/80'}`}
          >
            {cat.name}
          </p>
        ))}
      </div>
    );
  };

  return (
    <section className="@container relative w-full h-fit overflow-hidden py-15 lg:py-20 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 px-4 sm:px-6 lg:px-10 items-stretch">
      
      {/* Mobile Title & Tabs */}
      <div className='col-span-4 sm:col-span-12 md:hidden mb-10'>
        <FadeUp as='h3' className='text-heading2 leading-[110%] tracking-[-2%] lg:tracking-[-4%] font-medium text-black'>
          {title}
        </FadeUp>
        {/* {renderTabs()} */}
      </div>

      <FadeUp as='div' className='col-span-4 sm:col-span-12 md:col-span-5 lg:col-span-6 w-full aspect-square bg-[#f7f7f7] relative overflow-hidden flex items-center justify-center'>
        <img src={image} alt={title} className='object-contain max-w-[80%]' />
      </FadeUp>

      <div className='col-span-4 sm:col-span-12 md:col-span-7 lg:col-span-6 flex flex-col justify-between pt-10 md:pt-0'>
        {/* Desktop Title & Tabs */}
        <FadeUp as='div' className='hidden md:block mb-10 lg:mb-15'>
          <h3 className='text-heading2 leading-[90%] tracking-[-2%] lg:tracking-[-4%] font-medium text-black'>
            {title}
          </h3>
          {renderTabs()}
        </FadeUp>
        <div className='md:hidden'>
          {renderTabs()}
        </div>
        <ul className='flex flex-col'>
          {displayPoints.map((point, index) => (
            <FadeUp 
              as='li' 
              key={index}
              className={`grid grid-cols-4 gap-x-4 md:gap-x-5 lg:gap-x-7.5 border-borderColor py-6 ${index === 0 ? 'border-y' : 'border-b'}`}
            >
              <p className='text-body [@media(min-width:1536px)]:text-bodyBase font-medium leading-[124%] tracking-[-2%] text-black pr-2 col-span-1'>{point.label}</p>
              <p className='text-textSecondary text-body [@media(min-width:1536px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%] whitespace-pre-wrap col-span-3 max-w-[80%] w-full ml-auto'>{point.value}</p>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Specifications;