import React from 'react'
import SectionHeader from '@/components/SectionHeader'

const Step: React.FC = () => {
  return (
    <section className='@container h-fit w-full  relative overflow-hidden py-15 lg:py-20 bg-backgroundSecondary'>
      <SectionHeader heading="8-step Innovation Cycle" />
      <img src="/images/cdmo/8-step-innovation.svg" alt="8 Step" className='hidden @4xl:block md:max-w-[700px] lg:max-w-[1024px] xl:max-w-[1440px] mx-auto h-auto object-contain object-center px-4 sm:px-6 lg:px-10' />
      <img src="/images/cdmo/8-step-innovation-mobile.svg" alt="8 Step" className='block @4xl:hidden max-w-90 md:max-w-[40%] mx-auto h-auto object-contain object-center px-4 sm:px-6 lg:px-10' />
    </section>
  )
}

export default Step