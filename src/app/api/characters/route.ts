//ROUTE API/CHARACTERS

import { prisma } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const character = await prisma.character.create({
      data: {
        id: data.id,
        name: data.name,
        image: data.image,
        episodes: {
          connect: data.episodes.map((episodeData: any) => ({
            id: episodeData.episode.id,
          })),
        },
      },
      include: {
        episodes: true,
      },
    });
    return NextResponse.json({ success: true, data: character });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
