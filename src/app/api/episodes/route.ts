//ROUTE API/EPISODES

import { prisma } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const episode = await prisma.episode.create({
      data: {
        id: data.id,
        name: data.name,
      },
    });
    return NextResponse.json({ success: true, data: episode });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
