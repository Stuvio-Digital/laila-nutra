'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { EventItem } from '@/lib/events-store';

interface EventFormProps {
  initialData?: Partial<EventItem>;
  eventId?: string;
  mode: 'create' | 'edit';
}

// ─── Slug generator (client-side mirror) ────────────────────────────────────
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─── Rich Text Toolbar ───────────────────────────────────────────────────────
const TOOLBAR_BUTTONS = [
  { label: 'B', cmd: 'bold', title: 'Bold', style: 'font-bold' },
  { label: 'I', cmd: 'italic', title: 'Italic', style: 'italic' },
  { label: 'U', cmd: 'underline', title: 'Underline', style: 'underline' },
  { label: 'H₁', cmd: 'formatBlock', value: 'h2', title: 'Heading 1' },
  { label: 'H₂', cmd: 'formatBlock', value: 'h3', title: 'Heading 2' },
];

function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  /** Strip all browser-injected inline formatting so saved HTML is always clean */
  function stripStyles(html: string): string {
    return html
      .replace(/\s?style="[^"]*"/gi, '')
      .replace(/\s?style='[^']*'/gi, '')
      .replace(/\s?align="[^"]*"/gi, '')
      .replace(/\s?align='[^']*'/gi, '')
      .replace(/\s?color="[^"]*"/gi, '')
      .replace(/\s?color='[^']*'/gi, '')
      .replace(/\s?face="[^"]*"/gi, '')
      .replace(/\s?size="[^"]*"/gi, '')
      .replace(/<font[^>]*>/gi, '')
      .replace(/<\/font>/gi, '')
      .replace(/<span>\s*<\/span>/gi, '');
  }

  useEffect(() => {
    if (editorRef.current && !initialized) {
      // Strip any previously-saved inline styles before loading into editor
      editorRef.current.innerHTML = stripStyles(value || '');
      setInitialized(true);
    }
  }, [value, initialized]);

  function execCmd(cmd: string, val?: string) {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
    if (editorRef.current) onChange(stripStyles(editorRef.current.innerHTML));
  }

  function handleList(type: 'insertUnorderedList' | 'insertOrderedList') {
    document.execCommand(type, false);
    editorRef.current?.focus();
    if (editorRef.current) onChange(stripStyles(editorRef.current.innerHTML));
  }

  function handleInput() {
    if (editorRef.current) onChange(stripStyles(editorRef.current.innerHTML));
  }

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-white/10 bg-white/3 flex-wrap">
        {TOOLBAR_BUTTONS.map((btn) => (
          <button
            key={btn.cmd + (btn.value || '')}
            type="button"
            title={btn.title}
            onMouseDown={(e) => {
              e.preventDefault();
              execCmd(btn.cmd, btn.value);
            }}
            className={`px-2.5 py-1 text-xs text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all ${btn.style || ''}`}
          >
            {btn.label}
          </button>
        ))}
        <div className="w-px h-4 bg-white/15 mx-1" />
        {/* Bullet list */}
        <button
          type="button"
          title="Bullet List"
          onMouseDown={(e) => { e.preventDefault(); handleList('insertUnorderedList'); }}
          className="px-2.5 py-1 text-xs text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 6h11M9 12h11M9 18h11M5 6h.01M5 12h.01M5 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        {/* Numbered list */}
        <button
          type="button"
          title="Numbered List"
          onMouseDown={(e) => { e.preventDefault(); handleList('insertOrderedList'); }}
          className="px-2.5 py-1 text-xs text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 14c0-1 2-1 2 0s-2 1-2 2h2M4 20v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        {/* Link */}
        <button
          type="button"
          title="Insert Link"
          onMouseDown={(e) => {
            e.preventDefault();
            const url = prompt('Enter URL:');
            if (url) execCmd('createLink', url);
          }}
          className="px-2.5 py-1 text-xs text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        {/* Clear format */}
        <button
          type="button"
          title="Clear Formatting"
          onMouseDown={(e) => { e.preventDefault(); execCmd('removeFormat'); }}
          className="ml-auto px-2.5 py-1 text-xs text-white/30 hover:text-white/60 hover:bg-white/5 rounded-lg transition-all"
        >
          ↩
        </button>
      </div>

      {/* Content area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        className="min-h-48 px-4 py-3 text-white/80 text-sm leading-relaxed focus:outline-none prose-dark"
        style={{
          lineHeight: '1.75',
        }}
        data-placeholder="Write executive summary / description…"
      />

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: rgba(255,255,255,0.2);
          pointer-events: none;
        }
        /* Override any inline color/alignment styles saved by browser editing */
        [contenteditable] * { color: inherit !important; text-align: left !important; }
        [contenteditable] { color: rgba(255,255,255,0.8); text-align: left; }
        [contenteditable] h2 { font-size: 1.15em; font-weight: 700; margin: 0.75em 0 0.4em; color: white !important; }
        [contenteditable] h3 { font-size: 1em; font-weight: 600; margin: 0.6em 0 0.3em; color: rgba(255,255,255,0.9) !important; }
        [contenteditable] ul { list-style: disc; padding-left: 1.4em; margin: 0.5em 0; }
        [contenteditable] ol { list-style: decimal; padding-left: 1.4em; margin: 0.5em 0; }
        [contenteditable] li { margin: 0.2em 0; }
        [contenteditable] a { color: #0080C7 !important; text-decoration: underline; }
        [contenteditable] p { margin: 0.4em 0; }
        [contenteditable] strong { color: white !important; }
        [contenteditable] font { color: inherit !important; }
      `}</style>
    </div>
  );
}

// ─── Image Upload Button ─────────────────────────────────────────────────────
async function uploadFile(file: File): Promise<string | null> {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/upload', { method: 'POST', body: fd });
  const data = await res.json();
  return data.success ? data.url : null;
}

// ─── Main Form ───────────────────────────────────────────────────────────────
export default function EventForm({ initialData, eventId, mode }: EventFormProps) {
  const router = useRouter();
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [dragOverThumb, setDragOverThumb] = useState(false);
  const [slugEdited, setSlugEdited] = useState(false);

  const [form, setForm] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    headline: initialData?.headline || '',
    startDate: initialData?.startDate ? initialData.startDate.slice(0, 10) : '',
    endDate: initialData?.endDate ? initialData.endDate.slice(0, 10) : '',
    description: initialData?.description || '',
    contentHtml: initialData?.contentHtml || '',
    imageUrl: initialData?.imageUrl || '',
    imageAlt: initialData?.imageAlt || '',
    galleryImages: initialData?.galleryImages || [] as string[],
    externalLink: initialData?.externalLink || '',
    isActive: initialData?.isActive ?? true,
  });

  function set(field: string, value: string | boolean | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // Auto-generate slug from title (unless manually edited)
  function handleTitleChange(val: string) {
    set('title', val);
    if (!slugEdited) {
      set('slug', slugify(val));
    }
  }

  // ── Thumbnail Upload ──────────────────────────────────────────────────────
  async function handleThumbnailUpload(file: File) {
    setUploadingThumb(true);
    setError('');
    const url = await uploadFile(file);
    if (url) {
      set('imageUrl', url);
      if (!form.imageAlt) set('imageAlt', file.name.replace(/\.[^.]+$/, ''));
    } else {
      setError('Thumbnail upload failed');
    }
    setUploadingThumb(false);
  }

  const handleThumbDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOverThumb(false);
    const file = e.dataTransfer.files[0];
    if (file) handleThumbnailUpload(file);
  }, []);

  // ── Gallery Upload ─────────────────────────────────────────────────────────
  async function handleGalleryUpload(files: FileList) {
    setUploadingGallery(true);
    setError('');
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadFile(file);
      if (url) newUrls.push(url);
    }
    set('galleryImages', [...form.galleryImages, ...newUrls]);
    setUploadingGallery(false);
  }

  function removeGalleryImage(idx: number) {
    set('galleryImages', form.galleryImages.filter((_, i) => i !== idx));
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload = {
      ...form,
      startDate: form.startDate ? new Date(form.startDate).toISOString() : '',
      endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
      type: initialData?.type,
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
        setSuccess(mode === 'create' ? 'Event created!' : 'Event updated!');
        router.refresh();
        setTimeout(() => {
          window.location.href = '/admin/events';
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

      {/* ── Section: Primary Visual Asset ─────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-400"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <p className="text-slate-600 text-sm font-medium">Primary Visual Asset <span className="text-slate-400">(Thumbnail)</span></p>
        </div>

        <div className="flex items-start gap-5">
          {/* Thumbnail preview / drop zone */}
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
              Upload Thumbnail Image
            </button>
            <p className="text-slate-400 text-xs">This image represents the entry in the list and grid views.</p>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => set('imageUrl', e.target.value)}
              placeholder="Or paste image URL"
              className="mt-3 w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-600 text-xs placeholder-slate-400 focus:outline-none focus:border-slate-300 focus:bg-white transition-all"
            />
          </div>
        </div>
        <input ref={thumbnailInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleThumbnailUpload(e.target.files[0])} />
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
              required placeholder="e.g. Vitafoods Europe 2026"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#0080C7]/60 focus:bg-white transition-all"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">URL Slug <span className="text-red-400">*</span></label>
            <div className="flex items-center gap-0 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-[#0080C7]/60 focus-within:bg-white transition-all">
              <span className="px-3 text-slate-400 text-xs shrink-0 border-r border-slate-200 py-2.5 bg-slate-100/50">/events/</span>
              <input
                type="text" value={form.slug}
                onChange={(e) => { setSlugEdited(true); set('slug', slugify(e.target.value)); }}
                required placeholder="vitafoods-europe-2026"
                className="flex-1 bg-transparent px-3 py-2.5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Headline */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Headline</label>
            <input
              type="text" value={form.headline} onChange={(e) => set('headline', e.target.value)}
              placeholder="Sub-headline shown on the event inside page"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#0080C7]/60 focus:bg-white transition-all"
            />
          </div>




          {/* Start / End Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Start Date <span className="text-red-400">*</span></label>
              <input type="date" value={form.startDate} onChange={(e) => set('startDate', e.target.value)} required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-[#0080C7]/60 focus:bg-white transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">End Date</label>
              <input type="date" value={form.endDate} onChange={(e) => set('endDate', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-[#0080C7]/60 focus:bg-white transition-all" />
            </div>
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

          {/* Short Description (homepage card) */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Short Description <span className="text-slate-400">(Homepage Card)</span> <span className="text-red-400">*</span></label>
            <textarea value={form.description} onChange={(e) => set('description', e.target.value)} required rows={4}
              placeholder="Brief summary shown on the homepage card…"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:border-[#0080C7]/60 focus:bg-white transition-all resize-none" />
          </div>

          {/* External Link */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">External Link (URL)</label>
            <input type="url" value={form.externalLink} onChange={(e) => set('externalLink', e.target.value)}
              placeholder="https://vitafoods.eu.com/…"
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

      {/* ── Section: Executive Summary / Rich Text ─────────────────────────── */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Executive Summary / Description <span className="text-slate-400">(Inside Page)</span>
        </label>
        <RichTextEditor value={form.contentHtml} onChange={(html) => set('contentHtml', html)} />
      </div>

      {/* ── Section: Event Gallery Assets ──────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-400"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <p className="text-slate-600 text-sm font-medium">Event Gallery Assets</p>
          </div>
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            disabled={uploadingGallery}
            className="text-[#0080C7] text-xs font-medium hover:underline disabled:opacity-50"
          >
            {uploadingGallery ? 'Uploading…' : 'Upload Multi-Select'}
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {form.galleryImages.map((url, idx) => (
            <div key={url + idx} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-200">
              <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeGalleryImage(idx)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
              >
                ×
              </button>
            </div>
          ))}

          {/* Add more */}
          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            disabled={uploadingGallery}
            className="aspect-square rounded-xl border-2 border-dashed border-slate-200 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50 flex flex-col items-center justify-center gap-1 transition-all disabled:opacity-50"
          >
            {uploadingGallery ? (
              <svg className="animate-spin w-5 h-5 text-slate-300" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-400"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                <span className="text-slate-400 text-[10px] uppercase tracking-wider">Add More</span>
              </>
            )}
          </button>
        </div>

        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleGalleryUpload(e.target.files)}
        />
      </div>

      {/* ── Submit ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
        <button
          type="submit"
          disabled={saving || uploadingThumb || uploadingGallery}
          className="flex items-center gap-2 bg-[#0080C7] hover:bg-[#0080C7]/90 disabled:bg-[#0080C7]/40 text-white font-medium px-6 py-2.5 rounded-xl transition-all text-sm"
        >
          {saving ? (
            <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Saving…</>
          ) : mode === 'create' ? 'Create Event' : 'Update Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/events')} className="px-6 py-2.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
          Cancel and Discard Draft
        </button>
      </div>
    </form>
  );
}
