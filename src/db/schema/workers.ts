import { sqliteTable, text, integer, real, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const workers = sqliteTable('workers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  fullName: text('full_name').notNull(),
  nationalId: text('national_id').unique(),
  phone: text('phone'),
  role: text('role', {
    enum: ['ROASTER', 'GRINDER', 'PACKAGER', 'DRIVER', 'ADMIN'],
  }).notNull(),
  contractType: text('contract_type', { enum: ['DAILY', 'MONTHLY'] }).default('MONTHLY'),
  dailyRate: real('daily_rate').default(0),
  monthlySalary: real('monthly_salary').default(0),
  hireDate: text('hire_date').notNull(),
  status: text('status', { enum: ['ACTIVE', 'INACTIVE'] }).default('ACTIVE'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  deletedAt: text('deleted_at'),
}, (table) => ({
  nameIdx: index('idx_workers_name').on(table.fullName),
}));

export const attendanceLogs = sqliteTable('attendance_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  workerId: integer('worker_id').notNull().references(() => workers.id),
  logDate: text('log_date').notNull(),
  status: text('status', {
    enum: ['PRESENT', 'ABSENT', 'HALF_DAY', 'LEAVE'],
  }).notNull(),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  workerDateIdx: index('idx_attendance_worker_date').on(table.workerId, table.logDate),
}));

export const payrollRecords = sqliteTable('payroll_records', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  workerId: integer('worker_id').notNull().references(() => workers.id),
  periodStart: text('period_start').notNull(),
  periodEnd: text('period_end').notNull(),
  daysPresent: integer('days_present').default(0),
  daysAbsent: integer('days_absent').default(0),
  grossAmount: real('gross_amount').default(0).notNull(),
  deductions: real('deductions').default(0),
  netAmount: real('net_amount').default(0).notNull(),
  paidAt: text('paid_at'),
  paymentMethod: text('payment_method', {
    enum: ['CASH', 'BANK', 'CHEQUE'],
  }),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  workerIdIdx: index('idx_payroll_worker').on(table.workerId),
  periodIdx: index('idx_payroll_period').on(table.periodStart, table.periodEnd),
}));

export type Worker = typeof workers.$inferSelect;
export type NewWorker = typeof workers.$inferInsert;
export type AttendanceLog = typeof attendanceLogs.$inferSelect;
export type NewAttendanceLog = typeof attendanceLogs.$inferInsert;
export type PayrollRecord = typeof payrollRecords.$inferSelect;
export type NewPayrollRecord = typeof payrollRecords.$inferInsert;
