import { db } from '../client';
import {
  expenseCategories,
  expenses,
  type NewExpenseCategory,
  type NewExpense,
} from '../schema/expenses';
import { eq, isNull } from 'drizzle-orm';

export const expenseRepo = {
  getCategories() {
    return db.select().from(expenseCategories).all();
  },

  getCategoryById(id: number) {
    return db
      .select()
      .from(expenseCategories)
      .where(eq(expenseCategories.id, id))
      .get();
  },

  createCategory(data: NewExpenseCategory) {
    return db.insert(expenseCategories).values(data).returning().get();
  },

  updateCategory(id: number, data: Partial<NewExpenseCategory>) {
    return db
      .update(expenseCategories)
      .set(data)
      .where(eq(expenseCategories.id, id))
      .returning()
      .get();
  },

  getExpenses() {
    return db
      .select()
      .from(expenses)
      .where(isNull(expenses.deletedAt))
      .all();
  },

  getExpenseById(id: number) {
    return db
      .select()
      .from(expenses)
      .where(eq(expenses.id, id))
      .get();
  },

  createExpense(data: NewExpense) {
    return db.insert(expenses).values(data).returning().get();
  },

  updateExpense(id: number, data: Partial<NewExpense>) {
    return db
      .update(expenses)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(expenses.id, id))
      .returning()
      .get();
  },

  deleteExpense(id: number) {
    return db
      .update(expenses)
      .set({ deletedAt: new Date().toISOString() })
      .where(eq(expenses.id, id))
      .run();
  },
};
