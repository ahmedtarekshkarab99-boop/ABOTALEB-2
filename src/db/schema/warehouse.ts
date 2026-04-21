import { sqliteTable, text, integer, real, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const rawMaterials = sqliteTable('raw_materials', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  unit: text('unit').notNull(), // kg, bag, etc.
  currentStockQty: real('current_stock_qty').default(0).notNull(),
  reorderThreshold: real('reorder_threshold').default(0).notNull(),
  description: text('description'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  deletedAt: text('deleted_at'),
});

export const finishedProducts = sqliteTable('finished_products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  sku: text('sku').unique(),
  unit: text('unit').notNull(),
  currentStockQty: real('current_stock_qty').default(0).notNull(),
  reorderThreshold: real('reorder_threshold').default(0).notNull(),
  description: text('description'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  deletedAt: text('deleted_at'),
});

export const stockMovements = sqliteTable('stock_movements', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  movementType: text('movement_type', {
    enum: ['RECEIPT', 'CONSUMPTION', 'PRODUCTION_OUTPUT', 'SALE', 'ADJUSTMENT'],
  }).notNull(),
  itemType: text('item_type', { enum: ['RAW', 'FINISHED'] }).notNull(),
  itemId: integer('item_id').notNull(),
  quantityDelta: real('quantity_delta').notNull(),
  balanceAfter: real('balance_after').notNull(),
  referenceType: text('reference_type', {
    enum: ['BATCH', 'PURCHASE_ORDER', 'SALE_ORDER', 'MANUAL'],
  }),
  referenceId: integer('reference_id'),
  notes: text('notes'),
  performedByWorkerId: integer('performed_by_worker_id'),
  movementDate: text('movement_date').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  itemIdx: index('idx_stock_item').on(table.itemId),
  dateIdx: index('idx_stock_date').on(table.movementDate),
}));

export type RawMaterial = typeof rawMaterials.$inferSelect;
export type NewRawMaterial = typeof rawMaterials.$inferInsert;
export type FinishedProduct = typeof finishedProducts.$inferSelect;
export type NewFinishedProduct = typeof finishedProducts.$inferInsert;
export type StockMovement = typeof stockMovements.$inferSelect;
export type NewStockMovement = typeof stockMovements.$inferInsert;
