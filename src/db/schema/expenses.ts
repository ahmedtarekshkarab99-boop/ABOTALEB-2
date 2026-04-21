import { sqliteTable, text, integer, real, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const expenseCategories = sqliteTable('expense_categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  description: text('description'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const expenses = sqliteTable('expenses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  categoryId: integer('category_id').notNull().references(() => expenseCategories.id),
  expenseDate: text('expense_date').notNull(),
  amount: real('amount').notNull(),
  currency: text('currency').default('SAR'),
  paymentMethod: text('payment_method', {
    enum: ['CASH', 'BANK', 'CHEQUE'],
  }).notNull(),
  paidTo: text('paid_to'),
  description: text('description'),
  receiptFilePath: text('receipt_file_path'),
  createdByWorkerId: integer('created_by_worker_id'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  deletedAt: text('deleted_at'),
}, (table) => ({
  categoryIdx: index('idx_expenses_category').on(table.categoryId),
  dateIdx: index('idx_expenses_date').on(table.expenseDate),
}));

export type ExpenseCategory = typeof expenseCategories.$inferSelect;
export type NewExpenseCategory = typeof expenseCategories.$inferInsert;
export type Expense = typeof expenses.$inferSelect;
export type NewExpense = typeof expenses.$inferInsert;
