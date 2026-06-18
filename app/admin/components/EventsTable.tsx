'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { EventItem } from '@/lib/events-store';
import { formatDateCMS } from '@/lib/events-store';

const TYPE_LABELS: Record<EventItem['type'], string> = {
  past_event: 'Past Event',
  upcoming_event: 'Upcoming Event',
  wellness_calendar: 'Wellness Calendar',
};

const TYPE_COLORS: Record<EventItem['type'], string> = {
  past_event: 'bg-[#0080C7]/15 text-[#0080C7] border-[#0080C7]/20',
  upcoming_event: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  wellness_calendar: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

export default function EventsTable({ events: initialEvents }: { events: EventItem[] }) {
  const router = useRouter();
  const [events, setEvents] = useState(initialEvents);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  async function handleDelete(id: string) {
    const originalEvents = events;
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        setEvents(originalEvents);
        alert('Failed to delete event');
      } else {
        setTimeout(() => {
          router.refresh();
        }, 800);
      }
    } catch {
      setEvents(originalEvents);
      alert('Failed to delete event');
    } finally {
      setDeleting(null);
      setConfirmId(null);
    }
  }

  async function toggleActive(event: EventItem) {
    setEvents((prev) =>
      prev.map((e) => (e.id === event.id ? { ...e, isActive: !e.isActive } : e))
    );
    try {
      const res = await fetch(`/api/admin/events/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !event.isActive }),
      });
      if (!res.ok) {
        setEvents((prev) =>
          prev.map((e) => (e.id === event.id ? { ...e, isActive: event.isActive } : e))
        );
      } else {
        setTimeout(() => {
          router.refresh();
        }, 800);
      }
    } catch {
      setEvents((prev) =>
        prev.map((e) => (e.id === event.id ? { ...e, isActive: event.isActive } : e))
      );
    }
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              {['Event', 'Date', 'Type', 'Status', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors duration-100"
              >
                {/* Event */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {event.imageUrl && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                        <img
                          src={event.imageUrl}
                          alt={event.imageAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-slate-800 text-sm font-medium truncate max-w-[200px]">{event.title}</p>
                      {event.externalLink && (
                        <a
                          href={event.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 text-xs hover:text-slate-600 truncate block max-w-[200px]"
                        >
                          {event.externalLink.replace(/^https?:\/\//, '').slice(0, 40)}
                        </a>
                      )}
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  <p className="text-slate-600 text-sm">
                    {formatDateCMS(event.startDate, event.endDate)}
                  </p>
                </td>

                {/* Type */}
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${TYPE_COLORS[event.type]}`}>
                    {TYPE_LABELS[event.type]}
                  </span>
                </td>

                {/* Status toggle */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleActive(event)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ${
                      event.isActive ? 'bg-[#0080C7] border-[#0080C7]' : 'bg-slate-200 border-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ${
                        event.isActive ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/events/${event.id}`}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-all duration-150"
                    >
                      Edit
                    </Link>
                    {confirmId === event.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(event.id)}
                          disabled={deleting === event.id}
                          className="px-3 py-1.5 text-xs text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-150"
                        >
                          {deleting === event.id ? '…' : 'Confirm'}
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 bg-slate-100 rounded-lg transition-all duration-150"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmId(event.id)}
                        className="px-3 py-1.5 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-150"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-slate-100">
        {events.map((event) => (
          <div key={event.id} className="p-4 flex flex-col gap-3 bg-white">
            <div className="flex gap-3">
              {event.imageUrl && (
                <img src={event.imageUrl} alt={event.title} className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-100" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-slate-800 text-sm font-medium truncate">{event.title}</p>
                <p className="text-slate-500 text-xs mt-0.5">
                  {formatDateCMS(event.startDate, event.endDate)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium border ${TYPE_COLORS[event.type]}`}>
                    {TYPE_LABELS[event.type]}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions row */}
            <div className="flex items-center justify-between gap-4 mt-1 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/events/${event.id}`}
                  className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-all duration-150"
                >
                  Edit
                </Link>
                <button
                  onClick={() => toggleActive(event)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ${
                    event.isActive ? 'bg-[#0080C7] border-[#0080C7]' : 'bg-slate-200 border-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 ${
                      event.isActive ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {confirmId === event.id ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleDelete(event.id)}
                    disabled={deleting === event.id}
                    className="px-2.5 py-1.5 text-xs text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-150"
                  >
                    {deleting === event.id ? '…' : 'Confirm'}
                  </button>
                  <button
                    onClick={() => setConfirmId(null)}
                    className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-700 bg-slate-100 rounded-lg transition-all duration-150"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmId(event.id)}
                  className="px-2.5 py-1.5 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-150"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
