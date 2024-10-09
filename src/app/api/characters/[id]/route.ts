//ROUTE API/CHARACTERS

import { prisma } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  try {
    const character = await prisma.character.findUnique({
      where: { id },
      include: { episodes: true },
    });
    if (!character) {
      return NextResponse.json(
        { success: false, error: 'Character not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: character });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const newData = await req.json();
  const id = parseInt(params.id);
  try {
    const existingCharacter = await prisma.character.findUnique({
      where: { id },
      include: { episodes: true },
    });
    if (!existingCharacter) {
      return NextResponse.json(
        { success: false, error: 'Character not found' },
        { status: 404 }
      );
    }

    const currentEpisodesIds = existingCharacter.episodes.map(
      (episode) => episode.id
    );

    const newEpisodesIds = newData.episodes.map(
      (episodeData: any) => episodeData.episode.id
    );

    const episodesToConnect = newEpisodesIds.filter(
      (id: number) => !currentEpisodesIds.includes(id)
    );

    const episodesToDisconnect = currentEpisodesIds.filter(
      (id: number) => !newEpisodesIds.includes(id)
    );

    const character = await prisma.character.update({
      where: { id },
      data: {
        id: newData.id,
        name: newData.name,
        image: newData.image,
        episodes: {
          connect: episodesToConnect.map((episodeId: number) => ({
            id: episodeId,
          })),
          disconnect: episodesToDisconnect.map((episodeId: number) => ({
            id: episodeId,
          })),
        },
      },
      include: { episodes: true },
    });

    return NextResponse.json({ success: true, data: character });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  try {
    const character = await prisma.character.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `deleted "${character.name}"`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
