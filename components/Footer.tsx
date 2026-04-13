import React from 'react';
import SectionHeader from './SectionHeader';
import Link from 'next/link';

const Footer:React.FC = () => {
  return (
    <footer className='@container h-fit w-full grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5'>
      <SectionHeader 
        heading={'Let’s Co-Create the \n Future of Wellness'} 
        text='Partner with Laila Nutra for clinically validated ingredients, breakthrough formulations, and sustainable innovation.'
        ctaContent='Contact Us'
        ctaHref='/contact-us'
        headingColor='white'
        textColor="text-white" 
        classNameTextStructure='col-span-4 sm:col-span-12 lg:col-span-6' 
        textMaxWidth="max-w-[90%]  md:max-w-142 2xl:max-w-[80%]"
        className='col-span-4 sm:col-span-12 py-15 lg:py-20 footer-bg'
      />
      <div className="pb-10 lg:pb-15 px-4 sm:px-6 lg:px-10 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 col-span-4 sm:col-span-12 gap-y-10 sm:gap-y-15">
        <Link href="/" className='w-[104px] @6xl:w-[30%] aspect-104/60 col-span-4 sm:col-span-12 @6xl:col-span-3'>
          <img src="/images/common/laila-footer-logo.png" alt="Laila Footer Logo" className='w-full h-full' />
        </Link>
        <div className='col-span-4 sm:col-span-6 md:col-span-4 lg:col-start-1 @6xl:col-start-4 @6xl:col-span-3 flex flex-col'>
          <p className='text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 mb-4 lg:mb-6 font-medium text-black leading-[124%] tracking-[-2%]'>Company Overview</p>
          <div className='flex flex-col gap-3 sm:gap-4 lg:gap-5'>
            <Link href={"/products"} className='text-body [@media(min-width:1920px)]:text-bodyBase text-normal text-textSecondary hover:text-blue transition-colors duration-300 leading-[110%] tracking-[-1%]'>Products</Link>
            <Link href={"/research-innovations"} className='text-body [@media(min-width:1920px)]:text-bodyBase text-normal text-textSecondary hover:text-blue transition-colors duration-300 leading-[110%] tracking-[-1%]'>Research & Innovation</Link>
            <Link href={"/cdmo"} className='text-body [@media(min-width:1920px)]:text-bodyBase text-normal text-textSecondary hover:text-blue transition-colors duration-300 leading-[110%] tracking-[-1%]'>CDMO</Link>
            <Link href={"/health-solutions"} className='text-body [@media(min-width:1920px)]:text-bodyBase text-normal text-textSecondary hover:text-blue transition-colors duration-300 leading-[110%] tracking-[-1%]'>Health Solutions</Link>
          </div>
        </div>
        <div className='col-span-4 sm:col-span-6 md:col-span-4 @6xl:col-span-3 flex flex-col'>
          <p className='text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 mb-4 lg:mb-6 font-medium text-black leading-[124%] tracking-[-2%]'>About Us</p>
          <div className='flex flex-col gap-3 sm:gap-4 lg:gap-5'>
            <Link href={"/our-story-purpose"} className='text-body [@media(min-width:1920px)]:text-bodyBase text-normal text-textSecondary hover:text-blue transition-colors duration-300 leading-[110%] tracking-[-1%]'>Our Story & Purpose</Link>
            <Link href={"/quality-certifications"} className='text-body [@media(min-width:1920px)]:text-bodyBase text-normal text-textSecondary hover:text-blue transition-colors duration-300 leading-[110%] tracking-[-1%]'>Quality, Certifications & Awards</Link>
            <Link href={"/sustainability-responsibility"} className='text-body [@media(min-width:1920px)]:text-bodyBase text-normal text-textSecondary hover:text-blue transition-colors duration-300 leading-[110%] tracking-[-1%]'>Sustainability & Responsibility</Link>
          </div>
        </div>
        <div className='col-span-4 sm:col-span-6 md:col-span-4 @6xl:col-span-3 flex flex-col'>
          <p className='text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 mb-4 lg:mb-6 font-medium text-black leading-[124%] tracking-[-2%]'>Insights & Contact</p>
          <div className='flex flex-col gap-3 sm:gap-4 lg:gap-5'>
            <Link href={"#"} className='text-body [@media(min-width:1920px)]:text-bodyBase text-normal text-textSecondary hover:text-blue transition-colors duration-300 leading-[110%] tracking-[-1%]'>Blog / Wellness Articles</Link>
            <Link href={"#"} className='text-body [@media(min-width:1920px)]:text-bodyBase text-normal text-textSecondary hover:text-blue transition-colors duration-300 leading-[110%] tracking-[-1%]'>How-to Guides</Link>
            <Link href={"$"} className='text-body [@media(min-width:1920px)]:text-bodyBase text-normal text-textSecondary hover:text-blue transition-colors duration-300 leading-[110%] tracking-[-1%]'>Contact Us</Link>
          </div>
        </div>
      </div>
      <div className='border-t border-blue col-span-4 sm:col-span-12 py-4 sm:py-5 md:py-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4'>
        <div className='flex gap-4 pl-4 sm:pl-6 lg:pl-10'>
          <Link href={"#"} className='text-sm text-textSecondary hover:text-blue transition-colors duration-300 leading-[110%] tracking-[-1%]'>Disclaimer</Link>
          <Link href={"#"} className='text-sm text-textSecondary hover:text-blue transition-colors duration-300 leading-[110%] tracking-[-1%]'>Sitemap</Link>
        </div>
        <p className='text-sm text-textSecondary leading-[110%] tracking-[-1%] pl-4 sm:pl-0 sm:pe-6 lg:pe-10'>
          Copyright © {new Date().getFullYear()} Laila Nutra. All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer