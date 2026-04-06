"use client";
import React from 'react';
import CTA from './CTA';

interface sectionHeaderProps {
  heading?: string;
  text?: string;
  className?: string;
  classNameHeadingStructure?: string;
  classNameTextStructure?: string;
  textPadding?: string;
  headingColor?: string;
  textColor?: string;
  textMaxWidth?: string;
  ctaContent?: string;
  ctaHref?: string;
  categories?: { name: string }[];
  activeCategory?: string;
  onCategoryChange?: (name: string) => void;
}

const SectionHeader: React.FC<sectionHeaderProps> = ({ heading, text, className, classNameHeadingStructure, classNameTextStructure, textPadding, textMaxWidth, textColor, headingColor, ctaContent, ctaHref, categories, activeCategory, onCategoryChange }) => {
  return (
    <div className={`${className} grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-5 md:gap-y-6 mb-10 lg:mb-15`}>
      <h3 className={`text-heading2 leading-[110%] tracking-[-2%] lg:tracking-[-4%] font-medium pl-4 sm:pl-6 lg:pl-10 ${headingColor ? `text-${headingColor}` : "text-black"} ${classNameHeadingStructure ? classNameHeadingStructure : "col-span-4 sm:col-span-12 lg:col-span-6 "}`}>
        {heading?.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </h3>
      {(text || ctaContent) && <div className={`${classNameTextStructure ? classNameTextStructure : (ctaContent ? "col-span-4 sm:col-span-12 lg:col-span-4 lg:col-start-9" : "col-span-4 sm:col-span-12 lg:col-span-6")} flex flex-col gap-y-5 md:gap-y-6 ${textPadding ? textPadding : "pe-4 pl-4 sm:pe-6 sm:pl-6 lg:pe-10 lg:pl-0"} ${text ? "w-fit" : "w-full"}`}>
        {text && (
          <p className={`${textColor ? (textColor.startsWith('text-') ? textColor : `text-${textColor}`) : "text-textSecondary"} text-bodyBase [@media(min-width:1920px)]:text-subHeading2 font-normal leading-[124%] tracking-[-2%] ${textMaxWidth && textMaxWidth}`}>
            {text}
          </p>
        )}
        {
          ctaContent && (
            <CTA ctaContent={ctaContent} href={ctaHref} className={text ? "" : "lg:mt-auto lg:ml-auto"} />
          )
        }
      </div>}
      {categories && categories.length > 0 && (
        <div className='min-w-full whitespace-nowrap no-scrollbar overflow-x-scroll col-span-4 sm:col-span-12 flex items-center justify-start lg:mt-4 gap-6 md:gap-7.5 lg:gap-10 px-4 sm:px-6 lg:px-10'>
          {categories.map((cat, index) => (
            <p
              key={index}
              onClick={() => onCategoryChange && onCategoryChange(cat.name)}
              className={`shrink-0 cursor-pointer py-3.5 md:py-4 text-subHeading2 tracking-[-2%] font-medium leading-[110%] border-b-2 transition-colors duration-300 ${activeCategory === cat.name ? 'text-blue border-blue' : 'text-textSecondary/80 border-transparent hover:text-blue/80'}`}
            >
              {cat.name}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default SectionHeader