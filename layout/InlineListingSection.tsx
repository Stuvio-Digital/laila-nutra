"use client";
import InlineList from '@/components/InlineList';
import SectionHeader from '@/components/SectionHeader';
import React, { useState } from 'react';

export interface InlineListItems {
  imgSrc: string;
  title: string;
  text: string;
  listLink?: string;
  listLinkContent?: string;
}

export interface InlineListCategory {
  name: string;
  items: InlineListItems[];
}

interface InlineListingSectionProps {
  heading: string;
  text?: string;
  ctaContent?: string;
  ctaHref?: string;
  classNameTextStructure?: string;
  headingColor?: string;
  textMaxWidth?: string;
  textColor?: string;
  bgColor?: string
  inlineListItems?: InlineListItems[];
  categories?: InlineListCategory[];
  inlineListStructure?: string;
  inlineListDetailsStructure?: string;
  inlineListImgStructure?: string;
}

const InlineListingSection: React.FC<InlineListingSectionProps> = ({
  heading,
  text,
  ctaContent,
  ctaHref,
  classNameTextStructure,
  headingColor,
  textMaxWidth,
  textColor,
  bgColor,
  inlineListItems,
  categories,
  inlineListStructure,
  inlineListDetailsStructure,
  inlineListImgStructure
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories && categories.length > 0 ? categories[0].name : ""
  );

  const displayItems = categories && categories.length > 0 
    ? categories.find(cat => cat.name === activeCategory)?.items || []
    : inlineListItems || [];

  return (
    <section className={`@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 gap-x-4 md:gap-x-5 lg:gap-x-7.5 bg-${bgColor}`}>
      <SectionHeader 
        heading={heading} 
        text={text} 
        ctaContent={ctaContent} 
        ctaHref={ctaHref} 
        classNameTextStructure={classNameTextStructure} 
        headingColor={headingColor} 
        textMaxWidth={textMaxWidth}
        textColor={textColor} 
        className='col-span-4' 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <ul className='col-span-4 grid grid-cols-4 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-6 sm:gap-y-7 lg:gap-y-10 px-4 sm:px-6 lg:px-10'>
        {displayItems.map((item, index) => (
          <InlineList key={index} inlineListStructure={inlineListStructure} inlineListImgStructure={inlineListImgStructure} inlineListDetailsStructure={inlineListDetailsStructure} imgSrc={item.imgSrc} title={item.title} text={item.text} listLink={item.listLink} listLinkContent={item.listLinkContent} />
        ))}
      </ul>
    </section>
  )
}

export default InlineListingSection