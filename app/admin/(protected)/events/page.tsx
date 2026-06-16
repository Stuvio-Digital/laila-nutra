import { getAllEvents } from '@/lib/events-store';
import Link from 'next/link';
import EventsTable from '@/app/admin/components/EventsTable';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Events — Laila Nutra CMS' };

export default async function EventsListPage() {
  const allEvents = await getAllEvents();
  const events = allEvents.filter((e) => e.type !== 'wellness_calendar');

  const upcomingEvents = events.filter((e) => e.type === 'upcoming_event');
  const pastEvents = events.filter((e) => e.type === 'past_event');

  return (
    <div className="min-h-screen p-6 lg:p-10 pt-20 lg:pt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">Events</h1>
          <p className="text-slate-500 text-sm mt-1">{events.length} total entries</p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 bg-[#0080C7] hover:bg-[#0080C7]/90 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-150"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Add Event
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Events', value: events.length, color: 'text-slate-800' },
          { label: 'Upcoming Events', value: upcomingEvents.length, color: 'text-indigo-600' },
          { label: 'Past Events', value: pastEvents.length, color: 'text-[#0080C7]' },
          { label: 'Active', value: events.filter((e) => e.isActive).length, color: 'text-amber-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-slate-800 text-sm font-semibold">All Events</h2>
        </div>
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 text-slate-400">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-slate-500 text-sm">No events yet</p>
            <Link
              href="/admin/events/new"
              className="mt-4 text-[#0080C7] text-sm hover:underline"
            >
              Create your first event →
            </Link>
          </div>
        ) : (
          <EventsTable events={events} />
        )}
      </div>
    </div>
  );
}
