'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { EventItem } from '@/lib/events-store';

interface WellnessFormProps {
  initialData?: Partial<EventItem>;
  eventId?: string;
  mode: 'create' | 'edit';
}

// ─── Slug generator ─────────────────────────────────────────────────────────
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─── Image Upload Helper ─────────────────────────────────────────────────────
async function uploadFile(file: File): Promise<string | null> {
  try {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    if (!res.ok) {
      console.error('Upload response not ok:', res.status, res.statusText);
      return null;
    }
    const data = await res.json();
    return data.success ? data.url : null;
  } catch (err) {
    console.error('uploadFile error:', err);
    return null;
  }
}

export default function WellnessForm({ initialData, eventId, mode }: WellnessFormProps) {
  const router = useRouter();
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [dragOverThumb, setDragOverThumb] = useState(false);

  const [form, setForm] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    startDate: initialData?.startDate ? initialData.startDate.slice(0, 10) : '',
    description: initialData?.description || '',
    imageUrl: initialData?.imageUrl || '',
    imageAlt: initialData?.imageAlt || '',
    externalLink: initialData?.externalLink || '',
    isActive: initialData?.isActive ?? true,
  });

  function set(field: string, value: string | boolean | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleTitleChange(val: string) {
    set('title', val);
    set('slug', slugify(val));
  }

  // ── Thumbnail Upload ──────────────────────────────────────────────────────
  async function handleThumbnailUpload(file: File) {
    setUploadingThumb(true);
    setError('');
    try {
      const url = await uploadFile(file);
      if (url) {
        set('imageUrl', url);
        if (!form.imageAlt) set('imageAlt', file.name.replace(/\.[^.]+$/, ''));
      } else {
        setError('Image upload failed. Please try again.');
      }
    } catch (err: any) {
      setError(err?.message || 'Image upload failed');
    } finally {
      setUploadingThumb(false);
    }
  }

  const handleThumbDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOverThumb(false);
    const file = e.dataTransfer.files[0];
    if (file) handleThumbnailUpload(file);
  }, []);

  // ── Submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload = {
      ...form,
      type: 'wellness_calendar', // statically set for Wellness Calendar
      startDate: form.startDate ? new Date(form.startDate).toISOString() : '',
      endDate: '', // wellness calendar only uses a single date
    };

    try {
      const url = mode === 'create' ? '/api/admin/events' : `/api/admin/events/${eventId}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(mode === 'create' ? 'Wellness entry created!' : 'Wellness entry updated!');
        router.refresh();
        setTimeout(() => {
          window.location.href = '/admin/wellness';
        }, 1000);
      } else {
        setError(data.error || 'Save failed');
      }
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Alerts */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0"><circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="1.5"/><path d="M12 8v4m0 4h.01" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0"><circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="1.5"/><path d="M8 12l3 3 5-5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <p className="text-emerald-600 text-sm">{success}</p>
        </div>
      )}

      {/* ── Section: Visual Asset ─────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-400"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <p className="text-slate-600 text-sm font-medium">Wellness Post Image <span className="text-slate-400">(Thumbnail)</span></p>
        </div>

        <div className="flex items-start gap-5">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOverThumb(true); }}
            onDragLeave={() => setDragOverThumb(false)}
            onDrop={handleThumbDrop}
            onClick={() => thumbnailInputRef.current?.click()}
            className={`relative cursor-pointer rounded-xl overflow-hidden shrink-0 border-2 border-dashed transition-all duration-200 ${
              dragOverThumb ? 'border-[#0080C7] bg-[#0080C7]/5' : 'border-slate-200 hover:border-slate-300'
            } ${form.imageUrl ? 'w-32 h-32' : 'w-32 h-32 bg-slate-50 flex items-center justify-center'}`}
          >
            {form.imageUrl ? (
              <>
                <img src={form.imageUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                  <p className="text-white text-xs font-medium">Replace</p>
                </div>
              </>
            ) : uploadingThumb ? (
              <svg className="animate-spin w-6 h-6 text-[#0080C7]" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            ) : (
              <div className="text-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-slate-300 mx-auto mb-1"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><polyline points="17,8 12,3 7,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <p className="text-slate-400 text-[10px]">Upload</p>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <button
              type="button"
              onClick={() => thumbnailInputRef.current?.click()}
              className="text-[#0080C7] text-sm font-medium hover:underline mb-1"
            >
              Upload Post Image
            </button>
            <p className="text-slate-400 text-xs">This image is rendered on the homepage Wellness Calendar row.</p>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => set('imageUrl', e.target.value)}
              placeholder="Or paste image URL"
              className="mt-3 w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-600 text-xs placeholder-slate-400 focus:outline-none focus:border-slate-300 focus:bg-white transition-all"
            />
          </div>
        </div>
        <input
          ref={thumbnailInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleThumbnailUpload(e.target.files[0]);
            }
            e.target.value = '';
          }}
        />
      </div>

      {/* ── Section: Core Fields ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left col */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Title <span className="text-red-400">*</span></label>
            <input
              type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)}
              required placeholder="e.g. World Health Day"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#0080C7]/60 focus:bg-white transition-all"
            />
          </div>



          {/* Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Date <span className="text-red-400">*</span></label>
            <input type="date" value={form.startDate} onChange={(e) => set('startDate', e.target.value)} required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-[#0080C7]/60 focus:bg-white transition-all" />
          </div>
        </div>

        {/* Right col */}
        <div className="space-y-5">
          {/* Visibility */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Visibility</label>
            <button type="button" onClick={() => set('isActive', !form.isActive)}
              className={`flex items-center gap-2 w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${
                form.isActive ? 'bg-[#0080C7]/8 border-[#0080C7]/20 text-[#0080C7]' : 'bg-slate-100 border-slate-200 text-slate-400'
              }`}>
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${form.isActive ? 'border-[#0080C7] bg-[#0080C7]' : 'border-slate-300'}`}>
                {form.isActive && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </span>
              {form.isActive ? 'Active (Visible)' : 'Hidden'}
            </button>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description <span className="text-red-400">*</span></label>
            <textarea value={form.description} onChange={(e) => set('description', e.target.value)} required rows={4}
              placeholder="Write a brief message for this wellness date…"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#0080C7]/60 focus:bg-white transition-all resize-none" />
          </div>

          {/* External Reels/Post URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">External Instagram/Reel URL</label>
            <input type="url" value={form.externalLink} onChange={(e) => set('externalLink', e.target.value)}
              placeholder="https://www.instagram.com/reel/…"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#0080C7]/60 focus:bg-white transition-all" />
          </div>

          {/* Image Alt */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Image Alt Text</label>
            <input type="text" value={form.imageAlt} onChange={(e) => set('imageAlt', e.target.value)}
              placeholder="Descriptive alt text for accessibility"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#0080C7]/60 focus:bg-white transition-all" />
          </div>
        </div>
      </div>

      {/* ── Submit ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
        <button
          type="submit"
          disabled={saving || uploadingThumb}
          className="flex items-center gap-2 bg-[#0080C7] hover:bg-[#0080C7]/90 disabled:bg-[#0080C7]/40 text-white font-medium px-6 py-2.5 rounded-xl transition-all text-sm"
        >
          {saving ? (
            <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Saving…</>
          ) : mode === 'create' ? 'Create Wellness Entry' : 'Update Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/wellness')} className="px-6 py-2.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
          Cancel and Discard
        </button>
      </div>
    </form>
  );
}
