import { NextResponse } from 'next/server';

import memes from '@/data/db';

export async function GET(req: Request) {
  return NextResponse.json(memes);
}

export async function POST(req: Request) {
  const newMeme = await req.json();
  memes.unshift(newMeme);
  return NextResponse.json(newMeme);
}
