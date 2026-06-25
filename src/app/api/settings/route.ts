import { NextRequest, NextResponse } from 'next/server';
import { settingsRepository } from '@/lib/repositories';
import { requireAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const settings = await settingsRepository.get();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdminSession();
    const body = await request.json();
    const updated = await settingsRepository.update(body);
    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Нет доступа' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Ошибка' }, { status: 500 });
  }
}
