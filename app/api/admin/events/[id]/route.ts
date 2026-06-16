import { NextRequest, NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/auth';
import { getEventById, updateEvent, deleteEvent } from '@/lib/events-store';
import { revalidatePath } from 'next/cache';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const event = await getEventById(id);
    if (!event) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: event });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await getAuthFromRequest(req);
  if (!authed) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const updated = await updateEvent(id, body);
    if (!updated) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    revalidatePath('/admin/events');
    revalidatePath('/admin/wellness');
    revalidatePath('/');
    revalidatePath(`/events/${updated.slug}`);

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await getAuthFromRequest(req);
  if (!authed) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const event = await getEventById(id);
    if (!event) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    const deleted = await deleteEvent(id);
    if (!deleted) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });

    revalidatePath('/admin/events');
    revalidatePath('/admin/wellness');
    revalidatePath('/');
    revalidatePath(`/events/${event.slug}`);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
