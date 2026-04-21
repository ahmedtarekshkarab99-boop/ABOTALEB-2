import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as warehouseSchema from './schema/warehouse';
import * as supplierSchema from './schema/suppliers';
import * as customerSchema from './schema/customers';
import * as workerSchema from './schema/workers';
import * as productionSchema from './schema/production';
import * as expenseSchema from './schema/expenses';
import * as salesSchema from './schema/sales';

const sqlite = new Database('coffee-mill.db');
sqlite.pragma('journal_mode = WAL');

export const db = drizzle(sqlite, {
  schema: {
    ...warehouseSchema,
    ...supplierSchema,
    ...customerSchema,
    ...workerSchema,
    ...productionSchema,
    ...expenseSchema,
    ...salesSchema,
  },
});

export type Database = typeof db;
