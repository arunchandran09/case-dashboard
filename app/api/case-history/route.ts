import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { caseHistory } from '@/db/schema';

export async function GET() {
  try {
    const history = await db.select({
      case_id: caseHistory.caseId,
      hearing_date: caseHistory.hearingDate,
      purpose_of_hearing: caseHistory.purposeOfHearing,
      brief_description: caseHistory.briefDescription,
      judge_id: caseHistory.judgeId,
      document_link: caseHistory.documentLink,
    }).from(caseHistory);

    console.log('Fetched case history:', history);
    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching case history:', error);
    return NextResponse.json({ error: 'Failed to fetch case history' }, { status: 500 });
  }
}