"use client";
import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from '@/components/SectionHeader';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface DataItem {
  title: string;
  points: string[];
  image: string;
}

interface BlackSectionListProps {
  heading: string;
  text?: string;
  textMaxWidth?: string;
  textColor?: string;
  data: DataItem[];
}

const BlackSectionList: React.FC<BlackSectionListProps> = ({ heading, text, textMaxWidth, textColor, data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const prevIndexRef = useRef<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Tween | null>(null);

  // 1. Handle Responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Timer Logic (Desktop Only)
  useGSAP(() => {
    if (timelineRef.current) timelineRef.current.kill();

    progressRefs.current.forEach((el) => {
      if (el) gsap.set(el, { width: "0%", clearProps: "all" });
    });

    if (isDesktop && activeIndex !== null) {
      const tween = gsap.to(progressRefs.current[activeIndex], {
        width: "100%",
        duration: 8,
        ease: "none",
        onComplete: () => {
          gsap.set(progressRefs.current[activeIndex], { width: "0%" });
          setActiveIndex((prev) => (prev !== null ? (prev + 1) % data.length : 0));
        }
      });
      timelineRef.current = tween;
      return () => { tween.kill(); };
    }
  }, [activeIndex, isDesktop, data.length]);

  // 3. Image & Points Transition Logic
  useGSAP(() => {
    const active = activeIndex;
    const prev = prevIndexRef.current;

    if (active !== null) {
      const currentImg = imageRefs.current[active];
      const prevImg = (prev !== null && active !== prev) ? imageRefs.current[prev] : null;

      if (currentImg) {
        gsap.fromTo(currentImg, 
          { clipPath: "inset(100% 0% 0% 0%)", zIndex: 10 },
          { 
            clipPath: "inset(0% 0% 0% 0%)", 
            duration: 1.2, 
            ease: "power3.inOut",
            onComplete: () => {
              if (prevImg) gsap.set(prevImg, { clipPath: "inset(100% 0% 0% 0%)", zIndex: 1 });
              gsap.set(currentImg, { zIndex: 5 });
            }
          }
        );
      }

      if (pointsRef.current) {
        gsap.fromTo(pointsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
      }
    }

    if (prev !== null && (active === null || active !== prev)) {
      const prevImg = imageRefs.current[prev];
      if (prevImg && active === null) {
        gsap.to(prevImg, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut" });
      }
    }

    prevIndexRef.current = activeIndex;
  }, [activeIndex, isDesktop]);

  const handleItemClick = (index: number) => {
    setActiveIndex(prev => prev === index ? null : index);
  };

  return (
    <section className='@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 bg-black' ref={containerRef}>
      <SectionHeader heading={heading} text={text} textColor={textColor} textMaxWidth={textMaxWidth} headingColor='white' className='col-span-4 sm:col-span-12' />
      
      <div className='col-span-4 sm:col-span-12 w-full h-fit px-4 sm:px-6 lg:px-10'>
        <div className='grid grid-cols-4 sm:grid-cols-12 gap-y-0 md:gap-y-10 gap-x-4 md:gap-x-5 lg:gap-x-7.5 h-fit md:py-10 px-0 md:px-6 lg:px-10 md:bg-backgroundBlack'>
          
          {/* Left Side: flex-col justify-between */}
          <div className='col-span-4 sm:col-span-12 md:col-span-7 lg:col-span-6 md:max-w-[90%] h-auto flex flex-col justify-between gap-y-4 md:gap-y-0'>
            
            {/* Top: Titles List */}
            <div className='flex flex-col gap-y-4 md:gap-y-0'>
              {data.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => handleItemClick(index)}
                  className={`w-full h-fit px-4 sm:px-6 md:px-0 py-6 2xl:py-7 flex flex-col group cursor-pointer relative border-b-0 md:border-b-[1.5px] border-white/20 transition-colors duration-500 overflow-hidden bg-backgroundBlack md:bg-transparent rounded-lg md:rounded-none`}
                >
                  <div 
                    className='absolute bottom-0 left-0 h-[1.5px] bg-blue md:block hidden z-10' 
                    ref={el => { progressRefs.current[index] = el; }}
                    style={{ width: "0%" }}
                  />

                  <div className='flex items-center justify-between'>
                    <p className={`text-subHeading1 font-normal leading-[124%] tracking-[-2%] transition-colors duration-500 ${index === activeIndex ? 'text-white' : 'text-white/20 group-hover:text-white/40'}`}>
                      {item.title}
                    </p>
                    
                    <div className='w-8 h-8 md:hidden'>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 12H17" stroke="white" strokeWidth="1.5" opacity={index === activeIndex ? "1" : "0.6"}/>
                        <path d="M12 7V17" stroke="white" strokeWidth="1.5" opacity={index === activeIndex ? "0" : "0.6"}/>
                      </svg>
                    </div>
                  </div>

                  {/* Mobile Accordion Content (Custom order: title, img, points) */}
                  <div className={`md:hidden ${index === activeIndex ? 'block' : 'hidden'}`}>
                    <div className='overflow-hidden pt-4 pb-2'>
                        <div className='relative w-full aspect-square overflow-hidden rounded-lg mb-6'>
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className='object-cover object-center h-full w-full' 
                          />
                        </div>
                        <ul className='flex flex-col gap-y-2 pl-5 list-disc'>
                          {item.points.map((point, idx) => (
                            <li key={idx} className='font-normal text-textSecondary leading-[140%] tracking-[-2%] text-bodyBase [@media(min-width:1920px)]:text-bodyBase'>
                              {point}
                            </li>
                          ))}
                        </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom: Active Item Points (Desktop Only) */}
            <div className='hidden md:block mt-10 min-h-[120px]'>
              {activeIndex !== null && (
                <div ref={pointsRef}>
                   <ul className='flex flex-col gap-y-2.5 list-disc list-inside'>
                    {data[activeIndex].points.map((point, idx) => (
                      <li key={idx} className='font-normal text-textSecondary leading-[140%] tracking-[-2%] text-bodyBase [@media(min-width:1920px)]:text-bodyBase'>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Desktop Images */}
          <div className='md:col-span-5 lg:col-span-6 aspect-square relative md:inline-block hidden overflow-hidden'>
            {data.map((item, index) => (
              <div 
                key={index}
                ref={el => { imageRefs.current[index] = el; }}
                className='absolute top-0 left-0 w-full h-full'
                style={{
                  clipPath: "inset(100% 0% 0% 0%)",
                  zIndex: 1
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className='object-cover object-center h-full w-full' 
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default BlackSectionList;
