import Link from 'next/link';
import WellnessForm from '@/app/admin/components/WellnessForm';

export const metadata = { title: 'New Wellness Entry — Laila Nutra CMS' };

export default function NewWellnessPage() {
  return (
    <div className="min-h-screen p-6 lg:p-10 pt-20 lg:pt-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/wellness"
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Wellness Calendar
        </Link>
        <span className="text-slate-300">/</span>
        <h1 className="text-slate-800 text-lg font-semibold">New Entry</h1>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm">
        <WellnessForm mode="create" />
      </div>
    </div>
  );
}
