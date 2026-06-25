import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { campaignRepository } from '@/lib/repositories';
import { requireAdminSession } from '@/lib/auth';

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  age: z.number().int().min(0).max(18).optional(),
  city: z.string().min(2).optional(),
  story: z.string().min(10).optional(),
  shortStory: z.string().min(5).optional(),
  goalAmount: z.number().positive().optional(),
  collectedAmount: z.number().min(0).optional(),
  image: z.string().optional(),
  isClosed: z.boolean().optional(),
});

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campaign = await campaignRepository.findById(id);
  if (!campaign) return NextResponse.json({ error: 'Не найдено' }, { status: 404 });
  return NextResponse.json(campaign);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const body = await request.json();
    const data = updateSchema.parse(body);
    const updated = await campaignRepository.update(id, { ...data, updatedAt: new Date().toISOString() });
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
    const deleted = await campaignRepository.delete(id);
    if (!deleted) return NextResponse.json({ error: 'Не найдено' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Нет доступа' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
