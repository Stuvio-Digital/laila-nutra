import { put, list } from '@vercel/blob';
import { unstable_noStore as noStore } from 'next/cache';

export interface EventItem {
  id: string;
  slug: string;             // URL-friendly identifier e.g. "vitafoods-europe-2026"
  title: string;            // Used in CMS list and homepage card
  headline: string;         // Sub-headline shown on the inside page
  dateRange: string;        // Display string e.g. "5 to 7 May, 2026"
  publishDate: string;      // Flexible string e.g. "May 2026"
  startDate: string;        // ISO string for sorting
  endDate?: string;         // ISO string, optional
  description: string;      // Short summary for homepage card
  contentHtml: string;      // Rich text HTML for the event inside page
  imageUrl: string;         // Primary thumbnail (homepage card + hero)
  imageAlt: string;
  galleryImages: string[];  // Array of Vercel Blob URLs for event gallery
  externalLink: string;
  type: 'past_event' | 'upcoming_event' | 'wellness_calendar';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}


const DATA_BLOB_KEY = 'cms/events.json';

// ─── Helpers ────────────────────────────────────────────────────────────────

function generateId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}


let cachedBlobUrl: string | null = null;

/** Fetch the events JSON from Vercel Blob. Returns [] if not found. */
export async function readEvents(): Promise<EventItem[]> {
  noStore();
  try {
    let url = cachedBlobUrl;
    if (!url) {
      const { blobs } = await list({ prefix: 'cms/events' });
      const blob = blobs.find((b) => b.pathname === DATA_BLOB_KEY);
      if (!blob) return [];
      url = blob.url;
      cachedBlobUrl = url;
    }
    // Append cache-busting query parameter to guarantee fetching the fresh version
    const cacheBusterUrl = `${url}?t=${Date.now()}`;
    const res = await fetch(cacheBusterUrl, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/** Persist the full events array back to Vercel Blob. */
async function writeEvents(events: EventItem[]): Promise<void> {
  const blob = await put(DATA_BLOB_KEY, JSON.stringify(events, null, 2), {
    access: 'public',
    contentType: 'application/json',
    allowOverwrite: true,
    addRandomSuffix: false,
  });
  cachedBlobUrl = blob.url;
}

// ─── CRUD Operations ────────────────────────────────────────────────────────

export async function getAllEvents(): Promise<EventItem[]> {
  const events = await readEvents();
  return events
    .map(adjustEventType)
    .sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
}

export async function getEventById(id: string): Promise<EventItem | null> {
  const events = await readEvents();
  const event = events.find((e) => e.id === id);
  return event ? adjustEventType(event) : null;
}

export async function createEvent(
  data: Omit<EventItem, 'id' | 'createdAt' | 'updatedAt'>
): Promise<EventItem> {
  const events = await readEvents();
  const now = new Date();
  const nowIso = now.toISOString();

  // Format publishDate as "16 June, 2026" if not provided/empty
  let computedPublishDate = data.publishDate;
  if (!computedPublishDate) {
    const day = now.toLocaleDateString('en-US', { day: 'numeric' });
    const month = now.toLocaleDateString('en-US', { month: 'long' });
    const year = now.getFullYear();
    computedPublishDate = `${day} ${month}, ${year}`;
  }

  const newEvent: EventItem = {
    ...data,
    publishDate: computedPublishDate,
    id: generateId(),
    createdAt: nowIso,
    updatedAt: nowIso,
  };
  events.push(newEvent);
  await writeEvents(events);
  return newEvent;
}

export async function updateEvent(
  id: string,
  data: Partial<Omit<EventItem, 'id' | 'createdAt'>>
): Promise<EventItem | null> {
  const events = await readEvents();
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return null;

  const current = events[index];
  const newStartDate = data.startDate !== undefined ? data.startDate : current.startDate;
  const newEndDate = data.endDate !== undefined ? data.endDate : current.endDate;
  const newType = data.type !== undefined ? data.type : current.type;

  let computedDateRange = data.dateRange || current.dateRange;
  if (data.startDate !== undefined || data.endDate !== undefined) {
    computedDateRange = formatEventDateRange(newStartDate, newEndDate);
  }

  let computedType = newType;
  if (newType !== 'wellness_calendar') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(newEndDate || newStartDate);
    computedType = eventDate >= today ? 'upcoming_event' : 'past_event';
  }

  const updated: EventItem = {
    ...current,
    ...data,
    dateRange: computedDateRange,
    type: computedType,
    updatedAt: new Date().toISOString(),
  };
  events[index] = updated;
  await writeEvents(events);
  return updated;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const events = await readEvents();
  const filtered = events.filter((e) => e.id !== id);
  if (filtered.length === events.length) return false;
  await writeEvents(filtered);
  return true;
}

export async function getActiveEventsByType(
  type: EventItem['type']
): Promise<EventItem[]> {
  const events = await readEvents();
  return events
    .map(adjustEventType)
    .filter((e) => e.type === type && e.isActive)
    .sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const events = await readEvents();
  const event = events.find((e) => e.slug === slug);
  return event ? adjustEventType(event) : null;
}

export function formatEventDateRange(startDateStr: string, endDateStr?: string): string {
  if (!startDateStr) return '';
  const start = new Date(startDateStr);
  if (isNaN(start.getTime())) return '';

  const optionsDay: Intl.DateTimeFormatOptions = { day: 'numeric' };
  const optionsMonthOnly: Intl.DateTimeFormatOptions = { month: 'long' };

  const startDay = start.toLocaleDateString('en-US', optionsDay);
  const startMonth = start.toLocaleDateString('en-US', optionsMonthOnly);
  const startYear = start.getFullYear();

  if (!endDateStr) {
    return `${startDay} ${startMonth}, ${startYear}`;
  }

  const end = new Date(endDateStr);
  if (isNaN(end.getTime())) {
    return `${startDay} ${startMonth}, ${startYear}`;
  }

  const endDay = end.toLocaleDateString('en-US', optionsDay);
  const endMonth = end.toLocaleDateString('en-US', optionsMonthOnly);
  const endYear = end.getFullYear();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${startDay} to ${endDay} ${startMonth}, ${startYear}`;
    } else {
      return `${startDay} ${startMonth} to ${endDay} ${endMonth}, ${startYear}`;
    }
  } else {
    return `${startDay} ${startMonth}, ${startYear} to ${endDay} ${endMonth}, ${endYear}`;
  }
}

export function adjustEventType(event: EventItem): EventItem {
  if (event.type === 'wellness_calendar') return event;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(event.endDate || event.startDate);

  return {
    ...event,
    type: eventDate >= today ? 'upcoming_event' : 'past_event',
  };
}

