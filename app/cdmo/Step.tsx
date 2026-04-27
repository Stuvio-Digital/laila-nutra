import React from 'react'
import SectionHeader from '@/components/SectionHeader'

const Step: React.FC = () => {
  return (
    <section className='h-fit w-full  relative overflow-hidden py-15 lg:py-20 hidden md:block'>
      <SectionHeader heading="8-step Innovation Cycle" />
      <img src="/images/cdmo/8-step-innovation.svg" alt="8 Step" className='max-w-[1280px] mx-auto h-auto object-contain object-center px-4 sm:px-6 lg:px-10' />
    </section>
  )
}

export default Step