import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { campaignRepository } from '@/lib/repositories';
import { requireAdminSession } from '@/lib/auth';
import { generateId } from '@/lib/utils';

const campaignSchema = z.object({
  name: z.string().min(2),
  age: z.number().int().min(0).max(18),
  city: z.string().min(2),
  story: z.string().min(10),
  shortStory: z.string().min(5),
  goalAmount: z.number().positive(),
  collectedAmount: z.number().min(0).default(0),
  image: z.string().default(''),
  isClosed: z.boolean().default(false),
});

export async function GET() {
  try {
    const campaigns = await campaignRepository.findAll();
    return NextResponse.json(campaigns);
  } catch {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminSession();
    const body = await request.json();
    const data = campaignSchema.parse(body);
    const now = new Date().toISOString();
    const campaign = await campaignRepository.create({
      id: generateId(),
      ...data,
      createdAt: now,
      updatedAt: now,
    });
    return NextResponse.json(campaign, { status: 201 });
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
