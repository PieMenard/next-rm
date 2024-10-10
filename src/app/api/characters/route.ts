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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = parseInt(searchParams.get('offset') || '0')

  const idSearch = searchParams.get('id')
  const nameSearch = searchParams.get('name')
  const episodeSearch = searchParams.get('episode')

  const filters: any = {}

  if (idSearch) {
    filters.id = parseInt(idSearch)
  }

  if (nameSearch) {
    filters.name = { contains: nameSearch, mode: 'insensitive' }
  }

  if (episodeSearch) {
    filters.episodes = {
      some: {
        name: {
          contains: episodeSearch,
          mode: 'insensitive'
        }
      }
    }
  }

  try {
    const characters = await prisma.character.findMany({
      where: filters,
      skip: offset,
      take: limit,
      include: {
        episodes: true,
      },
    });
    const total = await prisma.character.count()
    const results = {
      data: characters,
      total: total
    }
    return NextResponse.json({ success: true, results: results });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}