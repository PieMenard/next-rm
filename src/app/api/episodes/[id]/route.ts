//ROUTE API/EPISODES/[ID]

import { prisma } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  try {
    const episode = await prisma.episode.findUnique({
      where: { id },
    });
    if (!episode) {
      return NextResponse.json(
        { success: false, error: 'Episode not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: episode });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const newData = await req.json();
  if (newData.id) {
    return NextResponse.json(
      { success: false, error: 'Cannot modify id' },
      { status: 500 }
    );
  }
  try {
    const episode = await prisma.episode.update({
      where: { id },
      data: {
        name: newData.name,
      },
    });
    if (!episode) {
      return NextResponse.json(
        { success: false, error: 'Episode not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: episode });
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
    const episode = await prisma.episode.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `deleted "${episode.name}"`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error });
  }
}
