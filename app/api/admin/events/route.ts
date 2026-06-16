import { NextRequest, NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/auth';
import { getAllEvents, createEvent, formatEventDateRange } from '@/lib/events-store';
import { revalidatePath } from 'next/cache';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') as 'past_event' | 'upcoming_event' | 'wellness_calendar' | null;
    const activeOnly = searchParams.get('active') === 'true';

    let events = await getAllEvents();

    if (type) events = events.filter((e) => e.type === type);
    if (activeOnly) events = events.filter((e) => e.isActive);

    return NextResponse.json({ success: true, data: events });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authed = await getAuthFromRequest(req);
  if (!authed) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const {
      title, slug, headline, dateRange, publishDate,
      startDate, endDate, description, contentHtml,
      imageUrl, imageAlt, galleryImages,
      externalLink, type, isActive,
    } = body;

    if (!title || !startDate || !description || !imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const computedDateRange = dateRange || formatEventDateRange(startDate, endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(endDate || startDate);
    const computedType = type || (eventDate >= today ? 'upcoming_event' : 'past_event');

    const event = await createEvent({
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      headline: headline || '',
      dateRange: computedDateRange,
      publishDate: publishDate || '',
      startDate,
      endDate,
      description,
      contentHtml: contentHtml || '',
      imageUrl,
      imageAlt: imageAlt || title,
      galleryImages: galleryImages || [],
      externalLink: externalLink || '',
      type: computedType,
      isActive: isActive ?? true,
    });

    revalidatePath('/admin/events');
    revalidatePath('/admin/wellness');
    revalidatePath('/');

    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

