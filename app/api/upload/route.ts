import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getAuthFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  console.log('[API UPLOAD] POST request received');
  const authed = await getAuthFromRequest(req);
  console.log('[API UPLOAD] Auth status:', authed);
  if (!authed) {
    console.log('[API UPLOAD] Unauthorized. Cookies:', req.cookies.getAll());
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    console.log('[API UPLOAD] File:', file ? { name: file.name, type: file.type, size: file.size } : null);

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF, SVG' },
        { status: 400 }
      );
    }

    const maxSizeMB = 10;
    if (file.size > maxSizeMB * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: `File too large. Max ${maxSizeMB}MB` },
        { status: 400 }
      );
    }

    const ext = file.name.split('.').pop() || 'jpg';
    const uniqueName = `cms/images/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const blob = await put(uniqueName, file, {
      access: 'public',
      contentType: file.type,
    });

    console.log('[API UPLOAD] Success! Blob URL:', blob.url);
    return NextResponse.json({ success: true, url: blob.url });
  } catch (err: any) {
    console.error('[API UPLOAD] Error in POST upload:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
