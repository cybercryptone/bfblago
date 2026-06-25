import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { campaignRepository, donationRepository } from '@/lib/repositories';
import { generateId } from '@/lib/utils';

const paymentSchema = z.object({
  campaignId: z.string().min(1),
  amount: z.number().positive().min(10),
  email: z.string().email(),
  returnUrl: z.string().url().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, amount, email, returnUrl } = paymentSchema.parse(body);

    const campaign = await campaignRepository.findById(campaignId);
    if (!campaign) {
      return NextResponse.json({ error: 'Сбор не найден' }, { status: 404 });
    }
    if (campaign.isClosed) {
      return NextResponse.json({ error: 'Сбор закрыт' }, { status: 400 });
    }

    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;

    if (!shopId || !secretKey) {
      // Demo mode: simulate successful payment
      const donation = await donationRepository.create({
        id: generateId(),
        campaignId,
        amount,
        email,
        status: 'succeeded',
        paymentId: `demo-${generateId()}`,
        createdAt: new Date().toISOString(),
      });
      await campaignRepository.update(campaignId, {
        collectedAmount: campaign.collectedAmount + amount,
        updatedAt: new Date().toISOString(),
      });
      return NextResponse.json({
        ok: true,
        mode: 'demo',
        donationId: donation.id,
        message: 'Тестовый режим: YooKassa не настроена',
      });
    }

    // YooKassa integration
    const idempotenceKey = generateId();
    const yooResponse = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${shopId}:${secretKey}`).toString('base64')}`,
        'Idempotence-Key': idempotenceKey,
      },
      body: JSON.stringify({
        amount: { value: amount.toFixed(2), currency: 'RUB' },
        confirmation: {
          type: 'redirect',
          return_url: returnUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
        },
        capture: true,
        description: `Пожертвование для ${campaign.name} — ${campaign.city}`,
        metadata: { campaignId, email },
      }),
    });

    if (!yooResponse.ok) {
      const err = await yooResponse.json();
      return NextResponse.json({ error: 'Ошибка платёжного сервиса', details: err }, { status: 502 });
    }

    const payment = await yooResponse.json();

    const donation = await donationRepository.create({
      id: generateId(),
      campaignId,
      amount,
      email,
      status: 'pending',
      paymentId: payment.id,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      donationId: donation.id,
      paymentId: payment.id,
      confirmationUrl: payment.confirmation.confirmation_url,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
