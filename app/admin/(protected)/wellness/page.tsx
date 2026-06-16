import { getAllEvents } from '@/lib/events-store';
import Link from 'next/link';
import WellnessTable from '@/app/admin/components/WellnessTable';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Wellness Calendar — Laila Nutra CMS' };

export default async function WellnessListPage() {
  const events = await getAllEvents();
  const wellnessEvents = events.filter((e) => e.type === 'wellness_calendar');

  const activeCount = wellnessEvents.filter((e) => e.isActive).length;
  const hiddenCount = wellnessEvents.length - activeCount;

  return (
    <div className="min-h-screen p-6 lg:p-10 pt-20 lg:pt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">Wellness Calendar</h1>
          <p className="text-slate-500 text-sm mt-1">{wellnessEvents.length} total entries</p>
        </div>
        <Link
          href="/admin/wellness/new"
          className="flex items-center gap-2 bg-[#0080C7] hover:bg-[#0080C7]/90 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all duration-150"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Add Wellness Entry
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total entries', value: wellnessEvents.length, color: 'text-slate-800' },
          { label: 'Active', value: activeCount, color: 'text-emerald-600' },
          { label: 'Hidden', value: hiddenCount, color: 'text-amber-600' },
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
          <h2 className="text-slate-800 text-sm font-semibold">All Wellness Calendar Entries</h2>
        </div>
        {wellnessEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 text-slate-400">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-slate-500 text-sm">No entries yet</p>
            <Link
              href="/admin/wellness/new"
              className="mt-4 text-[#0080C7] text-sm hover:underline"
            >
              Create your first wellness entry →
            </Link>
          </div>
        ) : (
          <WellnessTable events={wellnessEvents} />
        )}
      </div>
    </div>
  );
}
