import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import FadeUp from '@/components/FadeUp';
import CTA from '@/components/CTA';
import Link from 'next/link';
import { formatEventDateRange, getActiveEventsByType, type EventItem } from '@/lib/events-store';

async function getWellnessEvents(): Promise<EventItem[]> {
  try {
    return await getActiveEventsByType('wellness_calendar');
  } catch {
    return [];
  }
}

// Fallback hardcoded events shown while CMS is empty
const FALLBACK_EVENTS: EventItem[] = [
  {
    id: 'wf-1',
    slug: 'earth-day-2026',
    title: 'Earth Day',
    headline: '',
    dateRange: '22 April, 2026',
    publishDate: 'April 2026',
    startDate: '2026-04-22T00:00:00.000Z',
    description:
      'This Earth Day, we highlight our commitment to sustainably sourced botanicals and responsible manufacturing practices. Because innovation should move forward without leaving a footprint behind.',
    contentHtml: '',
    imageUrl: '/images/wellness-calendar/earth-day.webp',
    imageAlt: 'Earth Day',
    galleryImages: [],
    externalLink: 'https://www.instagram.com/reel/DXbqDqok9i3/',
    type: 'wellness_calendar',
    isActive: true,
    createdAt: '2026-04-22T00:00:00.000Z',
    updatedAt: '2026-04-22T00:00:00.000Z',
  },
  {
    id: 'wf-2',
    slug: 'world-health-day-2026',
    title: 'World Health Day',
    headline: '',
    dateRange: '07 April, 2026',
    publishDate: 'April 2026',
    startDate: '2026-04-07T00:00:00.000Z',
    description:
      "Health is no longer just about treatment. It's about prevention, resilience, and long-term well-being. This World Health Day, we reaffirm our commitment to advancing wellness through innovation and evidence-based nutrition.",
    contentHtml: '',
    imageUrl: '/images/wellness-calendar/health-day.webp',
    imageAlt: 'World Health Day',
    galleryImages: [],
    externalLink: 'https://www.instagram.com/reel/DW0Td6nk61G/',
    type: 'wellness_calendar',
    isActive: true,
    createdAt: '2026-04-07T00:00:00.000Z',
    updatedAt: '2026-04-07T00:00:00.000Z',
  },
  {
    id: 'wf-3',
    slug: 'world-water-day-2026',
    title: 'World Water Day',
    headline: '',
    dateRange: '22 March, 2026',
    publishDate: 'March 2026',
    startDate: '2026-03-22T00:00:00.000Z',
    description:
      "Every drop matters, not just for life, but for the future of health and innovation. As water continues to be a critical resource across industries, responsible usage and sustainable practices become more important than ever. This World Water Day, we reaffirm the need to protect what sustains us all.",
    contentHtml: '',
    imageUrl: '/images/wellness-calendar/water-day.webp',
    imageAlt: 'World Water Day',
    galleryImages: [],
    externalLink: 'https://www.instagram.com/reel/DWLT0X-uNu6/',
    type: 'wellness_calendar',
    isActive: true,
    createdAt: '2026-03-22T00:00:00.000Z',
    updatedAt: '2026-03-22T00:00:00.000Z',
  },

  {
    id: 'wf-4',
    slug: 'international-womens-day-2026',
    title: "International Women's Day",
    headline: '',
    dateRange: '08 March, 2026',
    publishDate: 'March 2026',
    startDate: '2026-03-08T00:00:00.000Z',
    description:
      "This International Women's Day, we celebrate women who balance strength with grace every single day. With science-backed ingredients like EstroMira™ for hormonal balance and Boswellin® for joint and mobility support, Laila Nutra contributes to solutions designed to support women's health and vitality across life stages. Supporting women's wellness through science-led nutrition.",
    contentHtml: '',
    imageUrl: '/images/wellness-calendar/women-day.webp',
    imageAlt: "International Women's Day",
    galleryImages: [],
    externalLink: 'https://www.instagram.com/reel/DVnFs0ajNRp/',
    type: 'wellness_calendar',
    isActive: true,
    createdAt: '2026-03-08T00:00:00.000Z',
    updatedAt: '2026-03-08T00:00:00.000Z',
  },
];

const WellnessCalendar: React.FC = async () => {
  const events = await getWellnessEvents();
  const displayEvents = events.length > 0 ? events : FALLBACK_EVENTS;

  return (
    <section className="@container relative w-full h-fit grid grid-cols-4 py-15 lg:py-20 gap-x-4 md:gap-x-5 lg:gap-x-7.5">
      <SectionHeader
        className='col-span-4'
        heading={"The Wellness Calendar"}
      />
      {displayEvents.map((event) => (
        <FadeUp
          key={event.id}
          className='col-span-4 h-fit w-full grid grid-cols-4 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-6 mb-6 md:mb-7.5 lg:mb-10 pt-6 border-t border-borderColor px-4 sm:px-6 lg:px-10'
        >
          <div className='col-span-4 sm:col-span-2 md:max-w-[80%] flex flex-col gap-y-4 md:gap-y-5'>
            <div className='flex gap-7 items-start justify-between'>
              <div className='flex flex-col gap-y-4 md:gap-y-5 w-[60%]'>
                <p className='text-heading3 text-blue leading-[100%] tracking-[-3%] font-medium'>
                  {formatEventDateRange(event.startDate, event.endDate)}
                </p>
                <p className='text-subHeading2 text-black [@media(min-width:1920px)]:text-subHeading1 leading-[100%] tracking-[-2%] font-medium'>
                  {event.title}
                </p>
              </div>
              {event.externalLink && (
                <CTA ctaContent="View Post" href={event.externalLink} target='_blank' className='sm:hidden block' />
              )}
            </div>
            <p className='text-body [@media(min-width:1920px)]:text-bodyBase leading-[124%] tracking-[-2%] font-normal text-textSecondary text-wrap max-w-[90%] lg:max-w-[80%]'>
              {event.description}
            </p>
            {event.externalLink && (
              <CTA ctaContent="View Post" href={event.externalLink} target='_blank' className='sm:block hidden' />
            )}
          </div>
          {event.externalLink ? (
            <Link href={event.externalLink} target='_blank' className='col-span-4 sm:col-span-2 w-full relative overflow-hidden aspect-580/330'>
              <img src={event.imageUrl} alt={event.imageAlt} className='w-full h-full object-cover object-center absolute top-0 left-0 z-10' />
              <div className='h-full w-full bg-black/30 backdrop-blur-md absolute top-0 left-0 z-20' />
              <img src={event.imageUrl} alt={event.imageAlt} className='h-full w-auto object-contain object-center absolute top-0 left-1/2 -translate-x-1/2 z-30' />
            </Link>
          ) : (
            <div className='col-span-4 sm:col-span-2 w-full relative overflow-hidden aspect-580/330'>
              <img src={event.imageUrl} alt={event.imageAlt} className='w-full h-full object-cover object-center absolute top-0 left-0 z-10' />
              <div className='h-full w-full bg-black/30 backdrop-blur-md absolute top-0 left-0 z-20' />
              <img src={event.imageUrl} alt={event.imageAlt} className='h-full w-auto object-contain object-center absolute top-0 left-1/2 -translate-x-1/2 z-30' />
            </div>
          )}
        </FadeUp>
      ))}
    </section>
  );
};

export default WellnessCalendar;