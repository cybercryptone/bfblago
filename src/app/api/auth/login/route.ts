import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { adminRepository } from '@/lib/repositories';
import { signToken, AUTH_COOKIE } from '@/lib/auth';

const loginSchema = z.object({
  login: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { login, password } = loginSchema.parse(body);

    const admin = await adminRepository.findByLogin(login);
    if (!admin) {
      return NextResponse.json({ error: 'Неверный логин или пароль' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Неверный логин или пароль' }, { status: 401 });
    }

    const token = await signToken({ adminId: admin.id, login: admin.login });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(AUTH_COOKIE.name, token, AUTH_COOKIE.options);
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Неверные данные' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
