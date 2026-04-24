"use client"
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';

const Header: React.FC = () =>{
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  useLockBodyScroll(isOpen);

  const isActive = (href: string) => pathname === href;
  const isAboutSectionActive = ['/our-story-purpose', '/quality-certifications', '/sustainability-responsibility'].includes(pathname);
  
  const navRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleAbout = () => setIsAboutOpen(!isAboutOpen);

  useEffect(() => {
    if (isOpen && isAboutSectionActive) {
      setIsAboutOpen(true);
    }
  }, [isOpen, isAboutSectionActive]);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(navRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(contentRef.current, {
        x: 0,
        duration: 0.6,
        ease: 'power4.out',
        delay: 0.1
      });
      if (linksRef.current) {
        gsap.fromTo(linksRef.current.children, 
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power2.out', delay: 0.3 }
        );
      }
    } else {
      gsap.to(contentRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power4.in'
      });
      gsap.to(navRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        delay: 0.2,
        onComplete: () => {
          gsap.set(navRef.current, { visibility: 'hidden' });
          setIsAboutOpen(false);
        }
      });
    }
  }, [isOpen]);

  return (
    <>
      <header className="fixed right-4 sm:right-6 lg:right-10 top-7.5 w-fit flex justify-end items-center h-fit z-40">
        <button 
          onClick={toggleMenu}
          className="py-2 px-2.5 sm:py-3 sm:px-4 flex justify-center items-center gap-3 rounded-md bg-black/50 backdrop-blur-sm cursor-pointer border-none outline-none group hover:bg-black/70 transition-all"
        >
          <p className="text-bodyBase tracking-subHeading text-[#ffffff] leading-[124%] font-medium">
            Menu
          </p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_138_48"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_138_48)">
              <path
                d="M3.5 7V5.5H20.5V7H3.5ZM3.5 18.5V17H20.5V18.5H3.5ZM3.5 12.75V11.25H20.5V12.75H3.5Z"
                fill="white"
              />
            </g>
          </svg>
        </button>
      </header>

      <nav 
        ref={navRef}
        className='fixed z-50 bg-black/60 backdrop-blur-md h-screen w-screen inset-0 flex invisible opacity-0 overflow-hidden'
        style={{ pointerEvents: isOpen ? 'all' : 'none' }}
      >
        <div className="absolute inset-0" onClick={toggleMenu} />
        
        <div 
          ref={contentRef}
          className='absolute w-full sm:w-125 md:w-[60%] xl:w-[38%] right-0 h-full bg-white sm:rounded-2xl flex flex-col shadow-2xl translate-x-full overflow-hidden'
        >
          {/* Close button: blue circle with white X */}
          <button 
            onClick={toggleMenu}
            className="absolute top-9 right-4 sm:right-6 lg:right-10 w-8 h-8 rounded-full bg-blue flex items-center justify-center cursor-pointer z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex flex-col h-full py-10 px-4 sm:px-6 lg:px-10 overflow-y-auto no-scrollbar">
            <ul ref={linksRef} className="flex flex-col gap-6 sm:gap-7">
              {/* Home */}
              <li>
                <Link href="/" onClick={toggleMenu} className={`tracking-[-2%] text-heading3 leading-[110%] font-medium transition-colors block ${isActive('/') ? 'text-blue' : 'text-textPrimary hover:text-blue'}`}>
                  Home
                </Link>
              </li>
              {/* About - Dropdown */}
              <li className="flex flex-col">
                <div 
                  onClick={toggleAbout}
                  className="flex items-center justify-between cursor-pointer group w-fit gap-x-8"
                >
                  <span className={`tracking-[-2%] text-heading3 leading-[110%] font-medium transition-colors ${isAboutSectionActive ? 'text-blue' : 'text-textPrimary group-hover:text-blue'}`}>
                    About
                  </span>
                  <div className={` ${isAboutOpen ? 'rotate-180' : ''}`}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-textSecondary/50">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isAboutOpen ? 'max-h-125 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}
                >
                  <ul className="flex flex-col gap-5 pl-4 border-l-2 border-blue/20">
                    <li>
                      <Link href="/our-story-purpose" onClick={toggleMenu} className={`text-subHeading2 transition-colors block tracking-[-2%] font-medium ${isActive('/our-story-purpose') ? 'text-blue' : 'text-textSecondary hover:text-blue'}`}>
                        Our Story & Purpose
                      </Link>
                    </li>
                    <li>
                      <Link href="/quality-certifications" onClick={toggleMenu} className={`text-subHeading2 transition-colors block tracking-[-2%] font-medium ${isActive('/quality-certifications') ? 'text-blue' : 'text-textSecondary hover:text-blue'}`}>
                        Quality & Certifications
                      </Link>
                    </li>
                    <li>
                      <Link href="/sustainability-responsibility" onClick={toggleMenu} className={`text-subHeading2 transition-colors block tracking-[-2%] font-medium ${isActive('/sustainability-responsibility') ? 'text-blue' : 'text-textSecondary hover:text-blue'}`}>
                        Sustainability & Responsibility
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              
              {[
                // { name: 'Products', href: '/products' },
                { name: 'Health Solutions', href: '/health-solutions' },
                { name: 'CDMO', href: '/cdmo' },
                // { name: 'Research & Innovations', href: '/research-innovations' },
                { name: 'Contact Us', href: '/contact-us' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} onClick={toggleMenu} className={`tracking-[-2%] text-heading3 leading-[110%] font-medium transition-colors block ${isActive(link.href) ? 'text-blue' : 'text-textPrimary hover:text-blue'}`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
