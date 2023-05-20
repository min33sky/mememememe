import { NextResponse } from 'next/server';
import memeTemplates from '@/data/memeTemplates';

export async function GET(req: Request) {
  return NextResponse.json(memeTemplates);
}
