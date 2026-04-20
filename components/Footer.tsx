import React from 'react';
import SectionHeader from './SectionHeader';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINK_CLASS, LINKS_HEADING_CLASS, navSections } from '@/data/footerData';
import FadeUp from './FadeUp';

const Footer: React.FC = () => {
  return (
    <footer className='@container h-fit w-full grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5'>
      {(usePathname() !== "/contact-us") && <SectionHeader
        heading={"Let's Co-Create the \n Future of Wellness"}
        text='Partner with Laila Nutra for clinically validated ingredients, breakthrough formulations, and sustainable innovation.'
        ctaContent='Contact Us'
        ctaHref='/contact-us'
        headingColor='white'
        textColor='text-white'
        classNameTextStructure='col-span-4 sm:col-span-12 lg:col-span-6'
        textMaxWidth='max-w-[90%]  md:max-w-142 2xl:max-w-[80%]'
        className='col-span-4 sm:col-span-12 py-15 lg:py-20 footer-bg'
      />}

      <div className={`pb-10 lg:pb-15 px-4 sm:px-6 lg:px-10 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 col-span-4 sm:col-span-12 gap-y-10 sm:gap-y-15 ${usePathname() === "/contact-us" && "pt-10 lg:pt-15"}`}>
        <Link href='/' className='w-[104px] @6xl:w-[30%] aspect-104/60 col-span-4 sm:col-span-12 @6xl:col-span-3'>
          <FadeUp as="img" src='/images/common/laila-footer-logo.png' alt='Laila Footer Logo' className='w-full h-full' />
        </Link>

        {navSections.map(({ title, links, colClass }) => (
          <FadeUp key={title} className={`${colClass} flex flex-col`}>
            <p className={LINKS_HEADING_CLASS}>{title}</p>
            <div className='flex flex-col gap-3 sm:gap-4 lg:gap-5'>
              {links.map(({ label, href }) => (
                <Link key={label} href={href} className={NAV_LINK_CLASS}>
                  {label}
                </Link>
              ))}
            </div>
          </FadeUp>
        ))}
      </div>

      <div className='border-t border-blue col-span-4 sm:col-span-12 py-4 sm:py-5 md:py-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4'>
        <div className='flex gap-4 pl-4 sm:pl-6 lg:pl-10'>
          {[{ label: 'Disclaimer', href: '#' }, { label: 'Sitemap', href: '#' }].map(({ label, href }) => (
            <Link key={label} href={href} className='text-sm text-textSecondary hover:text-blue transition-colors duration-300 leading-[110%] tracking-[-1%]'>
              {label}
            </Link>
          ))}
        </div>
        <p className='text-sm text-textSecondary leading-[110%] tracking-[-1%] pl-4 sm:pl-0 sm:pe-6 lg:pe-10'>
          Copyright © {new Date().getFullYear()} Laila Nutra. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;