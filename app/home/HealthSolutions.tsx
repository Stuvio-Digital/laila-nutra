"use client";
import React, { useState, useRef, useEffect } from 'react';
import SectionHeader from '@/components/SectionHeader';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const healthData = [
  {
    title: "Women’s Health",
    image: "/images/home/womens-health.webp",
    chips: ["EstroMira™", "Eve226™", "Miazen™"]
  },
  {
    title: "Joint & Bone Health",
    image: "/images/home/joints-bone-health.webp",
    chips: ["Ostibind®", "5-LOXIN®", "TamaFlex®", "AquaLox®", "Aflapin®", "CurQ60®"]
  },
  {
    title: "Cognition & Memory",
    image: "/images/home/metabolic-health-obesity.webp",
    chips: ["Nutricog®", "BacoZest®"]
  },
  {
    title: "Gut Health",
    image: "/images/home/male-vitality.webp",
    chips: ["Digexin®", "Motivia®"]
  },
  {
    title: "Energy, Muscle & Endurance",
    image: "/images/home/joints-bone-health.webp",
    chips: ["CinDura®", "Myotor®", "MaxiNOs®"]
  },
  {
    title: "Metabolic Health & Obesity",
    image: "/images/home/womens-health.webp",
    chips: ["Slimvance®", "Meratrim®", "CardiaSlim®", "Lowat®", "SuperCitrimax®", "TheoLim®"]
  },
  {
    title: "Immunity & Respiratory Health",
    image: "/images/home/metabolic-health-obesity.webp",
    chips: ["Immzita®", "Fytojas®", "MaxShield®", "Alviolife®"]
  },
  {
    title: "Male Vitality",
    image: "/images/home/male-vitality.webp",
    chips: ["Tesnor®", "Libiza®"]
  },
  {
    title: "Anti-Aging & Longevity",
    image: "/images/home/womens-health.webp",
    chips: ["NAD Booster"]
  }
];

const HealthSolutions: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [randomPositions, setRandomPositions] = useState<{top: string, left: string}[][]>([]);
  const prevIndexRef = useRef<number | null>(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const baseZones = [
      { tMin: 5, tMax: 20, lMin: 5, lMax: 25 },
      { tMin: 5, tMax: 20, lMin: 45, lMax: 65 },
      { tMin: 35, tMax: 45, lMin: 5, lMax: 20 },
      { tMin: 35, tMax: 45, lMin: 45, lMax: 65 },
      { tMin: 60, tMax: 70, lMin: 5, lMax: 25 },
      { tMin: 60, tMax: 70, lMin: 45, lMax: 65 },
    ];

    const positions = healthData.map((item) => {
      const availableZones = [...baseZones].sort(() => Math.random() - 0.5);
      
      return item.chips.map((_, chipIndex) => {
        const zone = availableZones[chipIndex % availableZones.length];
        const randomTop = Math.floor(Math.random() * (zone.tMax - zone.tMin + 1)) + zone.tMin;
        const randomLeft = Math.floor(Math.random() * (zone.lMax - zone.lMin + 1)) + zone.lMin;
        
        return {
          top: `${randomTop}%`,
          left: `${randomLeft}%`
        };
      });
    });
    setRandomPositions(positions);
  }, []);
  
  // Animate the line
  useGSAP(() => {
    if (activeIndex !== null && itemRefs.current[activeIndex] && lineRef.current) {
      const itemTop = itemRefs.current[activeIndex]?.offsetTop || 0;
      const itemHeight = itemRefs.current[activeIndex]?.offsetHeight || 0;
      const lineHeight = 65; // from svg
      const offset = itemTop + (itemHeight / 2) - (lineHeight / 2);

      gsap.to(lineRef.current, { y: offset, duration: 0.5, ease: "power2.out" });
    }
  }, [activeIndex]);

  // Animate images and chips
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

        // Animate chips inside the active image
        const chips = currentImg.querySelectorAll('.health-chip');
        if (chips.length > 0) {
          gsap.fromTo(chips,
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", stagger: 0.1, delay: 1.2 }
          );
        }
      }
    }

    if (prev !== null && (active === null || active !== prev)) {
      const prevImg = imageRefs.current[prev];
      if (prevImg && active === null) {
        gsap.to(prevImg, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut" });
      }
    }

    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  return (
    <section className='@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 bg-black'>
      <SectionHeader heading={"Solutions for Today’s \n Health Needs"} text="From women’s health to longevity, our clinically validated ingredients address today’s most pressing health needs." textColor="textSecondary" textMaxWidth="max-w-[90%] xl:max-w-142 2xl:max-w-[80%]" headingColor="white" className='col-span-4 sm:col-span-12' ctaContent='Know More' ctaHref='/health-solutions' />
      <div className='col-span-4 sm:col-span-12 w-full h-fit px-4 sm:px-6 lg:px-10'>
        <div className='grid grid-cols-4 sm:grid-cols-12 gap-y-0 md:gap-y-10 gap-x-4 md:gap-x-5 lg:gap-x-7.5 h-fit md:py-10 px-0 sm:px-6 lg:px-10 md:bg-backgroundBlack md:items-center'>
          
          <div className='col-span-2 sm:col-span-6 relative border-l border-[#242424] py-4 sm:py-6 md:py-10 h-max'>
            <div ref={lineRef} className='absolute left-[-4px] top-0 z-10 pointer-events-none'>
              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="65" viewBox="0 0 9 65" fill="none">
                <g filter="url(#filter0_f_46_2211)">
                  <line x1="4.5" y1="61" x2="4.5" y2="4" stroke="#0080C7"/>
                </g>
                <line x1="4.5" y1="61" x2="4.5" y2="4" stroke="url(#paint0_linear_46_2211)"/>
                <defs>
                  <filter id="filter0_f_46_2211" x="0" y="0" width="9" height="65" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_46_2211"/>
                  </filter>
                  <linearGradient id="paint0_linear_46_2211" x1="5.5" y1="4" x2="5.5" y2="61" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0080C7" stopOpacity="0.01"/>
                    <stop offset="0.5" stopColor="#0080C7"/>
                    <stop offset="1" stopColor="#0080C7" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <ul className='flex flex-col gap-y-5 sm:gap-y-6 lg:gap-y-8 [@media(min-width:1536px)]:gap-y-10 pl-4 sm:pl-6 lg:pl-7 sm:max-w-[90%] md:max-w-[80%]'>
              {healthData.map((item, index) => (
                <li 
                  key={index}
                  ref={el => { itemRefs.current[index] = el; }}
                  onClick={() => setActiveIndex(index)}
                  className={`cursor-pointer transition-colors duration-300 ${
                    activeIndex === index 
                    ? 'text-text18 lg:text-heading3 font-medium leading-[124%] tracking-[-2%] text-white' 
                    : 'text-text16 lg:text-subHeading1 font-medium leading-[124%] tracking-[-2%] text-textSecondary hover:text-white/60'
                  }`}
                >
                  {index === 8 ? (
                    <>
                      <span className='md:hidden'>Anti-Aging & <br/> Longevity</span>
                      <span className='hidden md:block'>Anti-Aging & Longevity</span>
                    </>
                  ) : item.title}
                </li>
              ))}
            </ul>
          </div>

          <div className='col-span-2 sm:col-span-6 w-full flex flex-col'>
            <div className='w-full aspect-square relative overflow-hidden'>
              {healthData.map((item, index) => (
                <div 
                  key={index}
                  ref={el => { imageRefs.current[index] = el; }}
                  className='absolute top-0 left-0 w-full h-full'
                  style={{
                    clipPath: "inset(100% 0% 0% 0%)",
                    zIndex: 1
                  }}
                >
                  <img src={item.image} alt={item.title} className='w-full h-full object-cover object-center' />
                  
                  {/* Desktop Chips */}
                  <div className='hidden md:block absolute h-full w-full top-0 left-0 z-20 pointer-events-none p-6 lg:p-10'>
                    <div className='relative w-full h-full'>
                      {item.chips.map((chip, chipIndex) => {
                        const pos = randomPositions[index]?.[chipIndex];
                        return (
                          <div 
                            key={chipIndex}
                            className={`health-chip absolute px-4.5 py-3.5 text-sm lg:text-body [@media(min-width:1920px)]:px-6 [@media(min-width:1920px)]:py-5 [@media(min-width:1920px)]:text-bodyBase rounded-full w-max text-center tracking-[-0.75%] font-medium leading-[110%] bg-black/32 backdrop-blur-xl text-white`}
                            style={pos ? { top: pos.top, left: pos.left } : { top: '50%', left: '50%', opacity: 0 }}
                          >
                            {chip}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Chips (Flex Wrap below image) */}
            <div className='md:hidden w-full flex flex-wrap gap-1.5 mt-4 sm:mt-5'>
              {healthData[activeIndex]?.chips.map((chip, i) => (
                <div 
                  key={i} 
                  className='text-[12px] w-max tracking-[-0.75%] text-white/50 font-medium leading-[110%]'
                >
                  {chip}{i < healthData[activeIndex].chips.length - 1 ? ',' : ''}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HealthSolutions;