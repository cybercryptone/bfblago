import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { newsRepository } from '@/lib/repositories';
import { requireAdminSession } from '@/lib/auth';

const updateSchema = z.object({
  title: z.string().min(2).optional(),
  excerpt: z.string().min(5).optional(),
  content: z.string().min(10).optional(),
  image: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
});

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const newsItem = await newsRepository.findById(id);
  if (!newsItem) return NextResponse.json({ error: 'Не найдено' }, { status: 404 });
  return NextResponse.json(newsItem);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const body = await request.json();
    const data = updateSchema.parse(body);
    const updated = await newsRepository.update(id, { ...data, updatedAt: new Date().toISOString() });
    if (!updated) return NextResponse.json({ error: 'Не найдено' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Нет доступа' }, { status: 401 });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const deleted = await newsRepository.delete(id);
    if (!deleted) return NextResponse.json({ error: 'Не найдено' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Нет доступа' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
