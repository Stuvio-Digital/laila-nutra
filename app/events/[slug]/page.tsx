import { notFound } from 'next/navigation';
import { getEventBySlug, getAllEvents, formatEventDateRange } from '@/lib/events-store';
import Link from 'next/link';
import type { Metadata } from 'next';

/**
 * Comprehensive HTML sanitizer that strips all browser-injected inline formatting
 * from CMS-generated HTML: style attrs, font tags, color attrs, align attrs.
 */
function sanitizeHtml(html: string): string {
  return html
    // Remove all style="..." attributes
    .replace(/\s?style="[^"]*"/gi, '')
    .replace(/\s?style='[^']*'/gi, '')
    // Remove align="..." attributes (set by execCommand for text-align)
    .replace(/\s?align="[^"]*"/gi, '')
    .replace(/\s?align='[^']*'/gi, '')
    // Remove color="..." attributes on <font> and other tags
    .replace(/\s?color="[^"]*"/gi, '')
    .replace(/\s?color='[^']*'/gi, '')
    // Remove face="..." and size="..." on <font>
    .replace(/\s?face="[^"]*"/gi, '')
    .replace(/\s?size="[^"]*"/gi, '')
    // Unwrap <font> tags entirely, keeping inner content
    .replace(/<font[^>]*>/gi, '')
    .replace(/<\/font>/gi, '')
    // Remove leftover empty spans
    .replace(/<span>\s*<\/span>/gi, '');
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const events = await getAllEvents();
    return events.map((e) => ({ slug: e.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: 'Event Not Found' };
  return {
    title: `${event.headline || event.title} — Laila Nutraceuticals`,
    description: event.description,
    openGraph: {
      images: event.imageUrl ? [event.imageUrl] : [],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event || !event.isActive) notFound();

  const hasGallery = event.galleryImages && event.galleryImages.length > 0;

  return (
    <main className="min-h-screen bg-white">

      {/* ── Top section: Go Back + Title + Date ─────────────────────────── */}
      <div className="w-full px-4 sm:px-6 lg:px-10 pt-30 sm:pt-40 pb-0">
        <div className="max-w-screen-xl mx-auto grid grid-cols-12 gap-x-5">

          {/* Go Back */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-11 mb-8">
            <Link
              href="/#events"
              className="inline-flex items-center gap-1.5 text-[#0080C7] text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Go Back
            </Link>
          </div>

          {/* Headline / Title */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-8 mb-5">
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold text-[#111] leading-[1.08] tracking-[-2px]">
              {event.headline || event.title}
            </h1>
          </div>

          {/* Date */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-8 mb-10">
            <p className="text-[#71717a] text-sm font-normal">
              {event.publishDate || formatEventDateRange(event.startDate, event.endDate)}
            </p>
          </div>

          {/* Hero Image — full width within the 2–11 column span */}
          <div className="col-span-12 lg:col-start-2 lg:col-span-11">
            <div className="w-full aspect-[16/7] overflow-hidden rounded-2xl bg-[#f4f4f5]">
              <img
                src={event.imageUrl}
                alt={event.imageAlt || event.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Body Content — aligned with Gallery ──────────────────────── */}
      {(event.contentHtml || event.description) && (
        <div className="w-full px-4 sm:px-6 lg:px-10 pt-14 pb-10">
          <div className="max-w-screen-xl mx-auto grid grid-cols-12 gap-x-5">
            {/* Body text — starts at col 2, same left edge as Gallery */}
            <div className="col-span-12 lg:col-start-2 lg:col-span-8">
              {event.contentHtml ? (
                <div
                  className="event-prose"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.contentHtml) }}
                />
              ) : (
                <div className="event-prose">
                  {event.description.split('\n').filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}

              {/* External link */}
              {event.externalLink && (
                <div className="mt-10 pt-8 border-t border-[#e4e4e7]">
                  <a
                    href={event.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#0080C7] text-sm font-medium hover:underline transition-all"
                  >
                    Visit Event Website
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Gallery ──────────────────────────────────────────────────────── */}
      {hasGallery && (
        <div className="w-full px-4 sm:px-6 lg:px-10 pt-8 pb-16">
          <div className="max-w-screen-xl mx-auto grid grid-cols-12 gap-x-5">

            {/* "Gallery" heading — left column */}
            <div className="col-span-12 lg:col-start-2 lg:col-span-3 mb-8 lg:mb-0">
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-[#111] tracking-[-1px]">
                Gallery
              </h2>
            </div>

            {/* Gallery images — right column, horizontal scroll */}
            <div className="col-span-12 lg:col-start-2 lg:col-span-11 mt-4 lg:mt-0">
              {/* First row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                {event.galleryImages.map((url, idx) => (
                  <a
                    key={url + idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-xl aspect-[4/3] bg-[#f4f4f5] group"
                  >
                    <img
                      src={url}
                      alt={`${event.title} — photo ${idx + 1}`}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}



    </main>
  );
}
