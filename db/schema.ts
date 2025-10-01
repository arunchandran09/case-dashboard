// schema.ts
import { relations } from 'drizzle-orm';
import { pgTable, varchar, date, text, unique, integer, timestamp } from 'drizzle-orm/pg-core';

// Users Table
export const users = pgTable('users', {
  id: integer('user_id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name').notNull(),
  role: varchar('role').notNull(),
  address: text('address'),
});

export const usersRelations = relations(users, ({ many }) => ({
  casesAsPetitioner: many(caseDetails, { relationName: 'petitioner' }),
  casesAsRespondent: many(caseDetails, { relationName: 'respondent' }),
}));

// Court Details Table
export const courtDetails = pgTable('court_details', {
  id: integer('judge_id').primaryKey().generatedAlwaysAsIdentity(),
  courtName: varchar('court_name').notNull(),
  courtNumber: varchar('court_number').notNull(),
});

export const courtDetailsRelations = relations(courtDetails, ({ many }) => ({
  caseHistory: many(caseHistory),
}));

// Case Details Table
export const caseDetails = pgTable('case_details', {
  id: integer('case_id').primaryKey().generatedAlwaysAsIdentity(),
  caseType: varchar('case_type').notNull(),
  filingNumber: varchar('filing_number'),
  registrationNumber: varchar('registration_number'),
  filingDate: date('filing_date'),
  registrationDate: date('registration_date'),
  actsUnder: varchar('acts_under'),
  cnrNumber: varchar('cnr_number').unique().notNull(),
  currentStatus: varchar('current_status'),
  petitionerId: integer('petitioner_id').notNull().references(() => users.id),
  respondentId: integer('respondent_id').notNull().references(() => users.id),
});

export const caseDetailsRelations = relations(caseDetails, ({ one, many }) => ({
  petitioner: one(users, {
    fields: [caseDetails.petitionerId],
    references: [users.id], // Updated to use users.id instead of users.user_id
    relationName: 'petitioner',
  }),
  respondent: one(users, {
    fields: [caseDetails.respondentId],
    references: [users.id], // Updated to use users.id instead of users.user_id
    relationName: 'respondent',
  }),
  caseHistory: many(caseHistory),
}));

// Case History Table
export const caseHistory = pgTable('case_history', {
  id: integer('history_id').primaryKey().generatedAlwaysAsIdentity(),
  caseId: integer('case_id').notNull().references(() => caseDetails.id),
  hearingDate: date('hearing_date'),
  purposeOfHearing: text('purpose_of_hearing'),
  briefDescription: text('brief_description'),
  nextHearingDate: date('next_hearing_date'),
  judgeId: integer('judge_id').references(() => courtDetails.id),
  documentLink: text('document_link'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const caseHistoryRelations = relations(caseHistory, ({ one }) => ({
  case: one(caseDetails, {
    fields: [caseHistory.caseId],
    references: [caseDetails.id],
  }),
  judge: one(courtDetails, {
    fields: [caseHistory.judgeId],
    references: [courtDetails.id],
  }),
}));




export type User = typeof users.$inferSelect;