import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { caseDetails } from '@/db/schema';

export async function GET() {
  try {
    const cases = await db.select().from(caseDetails);
    return NextResponse.json(cases);
  } catch (error) {
    console.error('Error fetching cases:', error);
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 });
  }
}