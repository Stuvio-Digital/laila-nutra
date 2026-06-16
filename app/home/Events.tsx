import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import CTA from '@/components/CTA';
import FadeUp from '@/components/FadeUp';
import Link from 'next/link';
import { formatEventDateRange, getAllEvents, type EventItem } from '@/lib/events-store';

async function getActiveEvents(): Promise<EventItem[]> {
  try {
    const events = await getAllEvents();
    return events.filter(e => e.isActive);
  } catch {
    return [];
  }
}

const renderEventRow = (event: EventItem) => {
  const detailHref = event.slug ? `/events/${event.slug}` : (event.externalLink || '#');
  const isInternal = !!event.slug;

  return (
    <FadeUp
      key={event.id}
      className="col-span-4 sm:col-span-12 h-fit w-full grid grid-cols-4 gap-x-4 md:gap-x-5 lg:gap-x-7.5 gap-y-6 mb-6 md:mb-7.5 lg:mb-10 pt-6 border-t border-borderColor px-4 sm:px-6 lg:px-10"
    >
      <div className="col-span-4 sm:col-span-3 lg:col-span-2 md:max-w-[80%] flex flex-col gap-y-4 md:gap-y-5">
        <div className="flex justify-between items-start gap-7">
          <div className="flex flex-col gap-y-4 md:gap-y-5 w-[60%]">
            <p className="text-heading3 text-blue leading-[100%] tracking-[-3%] font-medium">
              {formatEventDateRange(event.startDate, event.endDate)}
            </p>
            <Link
              href={detailHref}
              target={isInternal ? '_self' : '_blank'}
              className="text-subHeading2 text-black [@media(min-width:1920px)]:text-subHeading1 leading-[100%] tracking-[-2%] font-medium hover:text-blue transition-colors"
            >
              {event.title}
            </Link>
          </div>
          <CTA ctaContent="View More" href={detailHref} target={isInternal ? '_self' : '_blank'} className="sm:hidden block" />
        </div>
        <p className="text-body [@media(min-width:1920px)]:text-bodyBase leading-[124%] tracking-[-2%] font-normal text-textSecondary text-wrap max-w-[90%] lg:max-w-[80%]">
          {event.description.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < event.description.split('\n').length - 1 && <><br /><br /></>}
            </React.Fragment>
          ))}
        </p>
        <CTA ctaContent="View More" href={detailHref} target={isInternal ? '_self' : '_blank'} className="sm:block hidden" />
      </div>

      {/* Event Image */}
      <Link
        href={detailHref}
        target={isInternal ? '_self' : '_blank'}
        className="col-span-4 sm:col-span-2 w-full relative overflow-hidden aspect-4/3"
      >
        <img src={event.imageUrl} alt={event.imageAlt} className="w-full h-full object-cover object-center absolute top-0 left-0 z-10" />
        <div className="h-full w-full bg-black/30 backdrop-blur-md absolute top-0 left-0 z-20" />
        <img src={event.imageUrl} alt={event.imageAlt} className="h-full w-auto object-contain object-center absolute top-0 left-1/2 -translate-x-1/2 z-30" />
      </Link>
    </FadeUp>
  );
};

const renderEmptyState = (type: 'upcoming' | 'past' | 'all') => {
  const isUpcoming = type === 'upcoming';
  const isPast = type === 'past';
  return (
    <FadeUp className="col-span-4 sm:col-span-12 flex flex-col items-center justify-center py-16 px-6 bg-slate-50/50 border border-borderColor/60 rounded-3xl text-center max-w-xl mx-auto w-full mb-10 mt-4">
      <div className="w-14 h-14 rounded-2xl bg-blue/5 border border-blue/10 flex items-center justify-center mb-5 text-blue">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </div>
      <p className="text-subHeading2 font-medium text-black mb-2">
        {isUpcoming ? 'No Upcoming Events' : isPast ? 'No Past Events' : 'No Events Registered'}
      </p>
      <p className="text-body text-textSecondary max-w-xs">
        {type === 'past'
          ? 'No past events found in our archives.'
          : 'Stay tuned! We are planning exciting new events. Check back soon for updates.'}
      </p>
    </FadeUp>
  );
};

const Events: React.FC = async () => {
  const events = await getActiveEvents();
  const normalEvents = events.filter((e) => e.type !== 'wellness_calendar');

  const upcomingEvents = normalEvents.filter((event) => event.type === 'upcoming_event');
  const pastEvents = normalEvents.filter((event) => event.type === 'past_event');

  // Sort upcoming ascending (closest first), past descending (most recent first)
  upcomingEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  pastEvents.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  const hasUpcoming = upcomingEvents.length > 0;
  const hasPast = pastEvents.length > 0;
  const hasAny = hasUpcoming || hasPast;

  return (
    <section id="events" className="@container h-fit w-full py-15 lg:py-20 grid grid-cols-4 sm:grid-cols-12 gap-x-4 md:gap-x-5 lg:gap-x-7.5">
      {!hasAny ? (
        <>
          <SectionHeader
            className="col-span-4 sm:col-span-12"
            heading="Events"
          />
          {renderEmptyState('all')}
        </>
      ) : (
        <>
          {/* ── Upcoming Events ────────────────────────────────────────────────── */}
          {hasUpcoming && (
            <>
              <SectionHeader
                className="col-span-4 sm:col-span-12"
                heading="Upcoming Events"
              />
              {upcomingEvents.map(renderEventRow)}
            </>
          )}

          {/* Spacer between sections if both are present */}
          {hasUpcoming && hasPast && (
            <div className="col-span-4 sm:col-span-12 h-10 lg:h-14" />
          )}

          {/* ── Past Events ────────────────────────────────────────────────────── */}
          {hasPast && (
            <>
              <SectionHeader
                className="col-span-4 sm:col-span-12"
                heading="Past Events"
              />
              {pastEvents.map(renderEventRow)}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Events;