'use client';
import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import { FeatureGridItem } from '@/components/FeatureGridItem';

export interface featureItem {
  icon: string;
  title: string;
}

export interface featureGridItem {
  title?: string;
  description?: string;
  subTitle?: string;
  image: string;
  featureItems: featureItem[];
  orderClassFeature?: string;
  orderClassImage?: string;
}

export { FeatureGridItem };

interface FeatureImageGridSectionProps {
  heading?: string;
  text?: string;
  featureGridItem: featureGridItem[];
}

const FeatureImageGridSection: React.FC<FeatureImageGridSectionProps> = ({ heading, text, featureGridItem }) => {
  return (
    <section className='@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5'>
      {
        (heading || text) && (
          <SectionHeader className='col-span-4 sm:col-span-12' heading={heading} text={text} textColor='textSecondary' textMaxWidth='max-w-[90%]  xl:max-w-142 2xl:max-w-[80%]' />
        )
      }

      {featureGridItem.map((item, index) => (
        <FeatureGridItem
          key={index}
          item={item}
          index={index}
          totalItems={featureGridItem.length}
        />
      ))}
    </section>
  )
}

export default FeatureImageGridSection;
