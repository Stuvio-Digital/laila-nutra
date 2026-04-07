"use client";
import React from 'react';

const Specifications: React.FC = () => {
  return (
    <section className="@container relative w-full h-fit overflow-hidden py-15 lg:py-20 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 px-4 sm:px-6 lg:px-10 items-stretch">
      <h3 className='col-span-4 sm:col-span-12 text-heading2 leading-[110%] tracking-[-2%] lg:tracking-[-4%] font-medium text-black md:hidden mb-10'>Key Sepcifications</h3>
      <div className='col-span-4 sm:col-span-12 md:col-span-5 lg:col-span-6 w-full aspect-square bg-[#f7f7f7] relative overflow-hidden flex items-center justify-center'>
        <img src="/images/products/root.webp" alt="EstroMira Specifications" className='object-contain max-w-[80%]' />
      </div>
      <div className='col-span-4 sm:col-span-12 md:col-span-7 lg:col-span-6 flex flex-col justify-between'>
        <div className='mb-15'>
          <h3 className='text-heading2 hidden md:block leading-[110%] tracking-[-2%] lg:tracking-[-4%] font-medium text-black'>Key Sepcifications</h3>
        </div>
        <ul className='flex flex-col'>
          <li className='grid grid-cols-2 gap-x-4 md:gap-x-5 lg:gap-x-7.5 border-y border-borderColor py-6'>
            <p className='text-body [@media(min-width:1920px)]:text-bodyBase font-medium leading-[124%] tracking-[-2%] text-black'>Common Name</p>
            <p className='text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%]'>Asparagus Racemosus Extract</p>
          </li>
          <li className='grid grid-cols-2 gap-x-4 md:gap-x-5 lg:gap-x-7.5 border-b border-borderColor py-6'>
            <p className='text-body [@media(min-width:1920px)]:text-bodyBase font-medium leading-[124%] tracking-[-2%] text-black'>Specification</p>
            <p className='text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%]'>Standardized to 15% Shatavarins</p>
          </li>
          <li className='grid grid-cols-2 gap-x-4 md:gap-x-5 lg:gap-x-7.5 border-b border-borderColor py-6'>
            <p className='text-body [@media(min-width:1920px)]:text-bodyBase font-medium leading-[124%] tracking-[-2%] text-black'>Type</p>
            <p className='text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%]'>Extract</p>
          </li>
          <li className='grid grid-cols-2 gap-x-4 md:gap-x-5 lg:gap-x-7.5 border-b border-borderColor py-6'>
            <p className='text-body [@media(min-width:1920px)]:text-bodyBase font-medium leading-[124%] tracking-[-2%] text-black'>Health Benefit</p>
            <p className='text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%]'>Aids in hormonal balance and women’s wellness across every life stage</p>
          </li>
          <li className='grid grid-cols-2 gap-x-4 md:gap-x-5 lg:gap-x-7.5 border-b border-borderColor py-6'>
            <p className='text-body [@media(min-width:1920px)]:text-bodyBase font-medium leading-[124%] tracking-[-2%] text-black'>Plant Source</p>
            <p className='text-textSecondary text-body [@media(min-width:1920px)]:text-bodyBase font-normal leading-[124%] tracking-[-2%]'>Flowers and leaves (aerial part)</p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Specifications