import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { newsRepository } from '@/lib/repositories';
import { requireAdminSession } from '@/lib/auth';
import { generateId } from '@/lib/utils';

const newsSchema = z.object({
  title: z.string().min(2),
  excerpt: z.string().min(5),
  content: z.string().min(10),
  image: z.string().default(''),
  publishedAt: z.string().datetime().optional(),
});

export async function GET() {
  try {
    const news = await newsRepository.findAll();
    return NextResponse.json(news);
  } catch {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminSession();
    const body = await request.json();
    const data = newsSchema.parse(body);
    const now = new Date().toISOString();
    const newsItem = await newsRepository.create({
      id: generateId(),
      ...data,
      publishedAt: data.publishedAt ?? now,
      createdAt: now,
      updatedAt: now,
    });
    return NextResponse.json(newsItem, { status: 201 });
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
