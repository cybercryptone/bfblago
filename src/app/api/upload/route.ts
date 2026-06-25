import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { requireAdminSession } from '@/lib/auth';
import { generateId } from '@/lib/utils';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    await requireAdminSession();

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Файл не найден' }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Неподдерживаемый тип файла' }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Файл слишком большой (макс. 5МБ)' }, { status: 400 });
    }

    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = `${generateId()}.${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    await mkdir(uploadDir, { recursive: true });
    const bytes = await file.arrayBuffer();
    await writeFile(path.join(uploadDir, fileName), Buffer.from(bytes));

    return NextResponse.json({ url: `/uploads/${fileName}` });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Нет доступа' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Ошибка загрузки' }, { status: 500 });
  }
}
