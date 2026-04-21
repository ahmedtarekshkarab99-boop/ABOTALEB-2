import { sqliteTable, text, integer, real, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const machines = sqliteTable('machines', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  machineType: text('machine_type', { enum: ['ROASTER', 'GRINDER'] }).notNull(),
  capacityKg: real('capacity_kg').notNull(),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const productionBatches = sqliteTable('production_batches', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  batchCode: text('batch_code').unique().notNull(),
  batchType: text('batch_type', { enum: ['ROASTING', 'GRINDING'] }).notNull(),
  machineId: integer('machine_id').notNull().references(() => machines.id),
  operatorWorkerId: integer('operator_worker_id').notNull(),
  plannedStart: text('planned_start'),
  actualStart: text('actual_start'),
  actualEnd: text('actual_end'),
  status: text('status', {
    enum: ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED'],
  }).default('PLANNED'),
  inputMaterialId: integer('input_material_id').notNull(),
  inputQuantityKg: real('input_quantity_kg').notNull(),
  outputProductId: integer('output_product_id').notNull(),
  outputQuantityKg: real('output_quantity_kg').notNull(),
  lossKg: real('loss_kg').default(0),
  lossPercentage: real('loss_percentage').default(0),
  temperatureProfile: text('temperature_profile'),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  batchCodeIdx: index('idx_batch_code').on(table.batchCode),
  statusIdx: index('idx_batch_status').on(table.status),
  dateIdx: index('idx_batch_dates').on(table.actualStart, table.actualEnd),
}));

export type Machine = typeof machines.$inferSelect;
export type NewMachine = typeof machines.$inferInsert;
export type ProductionBatch = typeof productionBatches.$inferSelect;
export type NewProductionBatch = typeof productionBatches.$inferInsert;
