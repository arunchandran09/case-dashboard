import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { caseDetails } from '@/db/schema';

export async function GET() {
  try {
    const details = await db.select({
      case_type: caseDetails.caseType,
      filing_number: caseDetails.filingNumber,
      registration_number: caseDetails.registrationNumber,
      filing_date: caseDetails.filingDate,
      registration_date: caseDetails.registrationDate,
      acts_under: caseDetails.actsUnder,
      cnr_number: caseDetails.cnrNumber,
      current_status: caseDetails.currentStatus,
      petitioner_id: caseDetails.petitionerId,
      respondent_id: caseDetails.respondentId,
    }).from(caseDetails);

    return NextResponse.json(details);
  } catch (error) {
    console.error('Error fetching case details:', error);
    return NextResponse.json({ error: 'Failed to fetch case details' }, { status: 500 });
  }
}