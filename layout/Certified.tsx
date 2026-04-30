import SectionHeader from '@/components/SectionHeader'
import React from 'react'

const certificationsData = [
  {
    id: 1,
    image: "/images/home/fda.png",
    alt: "US FDA Registered",
    title: "US FDA Registered",
    description: "Meeting U.S. regulatory and manufacturing standards."
  },
  {
    id: 2,
    image: "/images/home/cgmp.png",
    alt: "cGMP Certified",
    title: "cGMP (Good Manufacturing Practices)",
    description: "Ensuring quality and safety from raw material to finished product."
  },
  {
    id: 3,
    image: "/images/home/fssc.png",
    alt: "FSSC 22000",
    title: "FSSC 22000 Certified",
    description: "Guaranteeing food safety management at every step."
  },
  {
    id: 4,
    image: "/images/home/iso.png",
    alt: "ISO Certified",
    title: "ISO 9001:2015 Certified",
    description: "Delivering consistent quality across processes."
  },
  {
    id: 5,
    image: "/images/home/halal.png",
    alt: "Kosher Certified",
    title: "Kosher Certified",
    description: "Meets strict kosher guidelines for quality and purity assurance."
  },
  {
    id: 6,
    image: "/images/home/halal-1.png",
    alt: "Halal Certified",
    title: "Halal Certified",
    description: "Compliant with Islamic dietary standards for global acceptability."
  },
  {
    id: 7,
    image: "/images/home/non-gmo.png",
    alt: "Non-GMO Project Verified",
    title: "Non-GMO & Allergen-Free",
    description: "Committed to clean, safe formulations for every consumer."
  },
  {
    id: 8,
    image: "/images/home/eu.png",
    alt: "EU Compliant",
    title: "EU Compliance",
    description: "Meeting European Union regulatory standards for safety, quality, and product integrity across all markets."
  },
];

const Certified: React.FC = () => {
  return (
    <section className='@container w-full h-fit py-15 lg:py-20 bg-backgroundSecondary'>
      <SectionHeader heading={"Globally Certified and \n Recognised"} text="Our facilities are certified by leading international bodies to ensure consistency, safety and efficacy in every solution." textColor="textSecondary" textMaxWidth="max-w-[90%] xl:max-w-142 2xl:max-w-[80%]" />
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5 px-4 sm:px-6 lg:px-10 gap-y-6 sm:gap-y-7 md:gap-y-10 lg:gap-y-15 items-stretch">
        {certificationsData.map((item) => (
          <div key={item.id} className='bg-white col-span-4 sm:col-span-6 md:col-span-4 @6xl:col-span-3 w-full sm:aspect-square aspect-4/3 flex flex-col justify-between p-6 sm:p-5 lg:p-6 sm:gap-y-10'>
            <div className='w-20 h-auto max-h-20 2xl:max-h-25 2xl:w-25  overflow-hidden'>
              <img src={item.image} alt={item.alt} className='w-auto h-full m-auto' />
            </div>
            <div className='flex flex-col gap-y-2'>
              <p className='text-subHeading2 [@media(min-width:1920px)]:text-subHeading1 text-black leading-[124%] tracking-[-2%] font-medium'>{item.title}</p>
              <p className='text-body [@media(min-width:1920px)]:text-bodyBase leading-[124%] tracking-[-1%] text-textSecondary font-normal'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Certified