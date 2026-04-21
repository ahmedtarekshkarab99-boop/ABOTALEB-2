import { sqliteTable, text, integer, real, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const purchaseOrders = sqliteTable('purchase_orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  poNumber: text('po_number').unique().notNull(),
  supplierId: integer('supplier_id').notNull(),
  orderDate: text('order_date').notNull(),
  expectedDeliveryDate: text('expected_delivery_date'),
  actualDeliveryDate: text('actual_delivery_date'),
  status: text('status', {
    enum: ['DRAFT', 'CONFIRMED', 'DELIVERED', 'CANCELLED'],
  }).default('DRAFT'),
  totalAmount: real('total_amount').default(0).notNull(),
  amountPaid: real('amount_paid').default(0),
  paymentStatus: text('payment_status', {
    enum: ['UNPAID', 'PARTIAL', 'PAID'],
  }).default('UNPAID'),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  poNumberIdx: index('idx_po_number').on(table.poNumber),
  supplierIdx: index('idx_po_supplier').on(table.supplierId),
}));

export const purchaseOrderItems = sqliteTable('purchase_order_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  purchaseOrderId: integer('purchase_order_id').notNull().references(() => purchaseOrders.id),
  rawMaterialId: integer('raw_material_id').notNull(),
  quantity: real('quantity').notNull(),
  unitPrice: real('unit_price').notNull(),
  totalPrice: real('total_price').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  poIdx: index('idx_poi_po').on(table.purchaseOrderId),
}));

export const saleOrders = sqliteTable('sale_orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  soNumber: text('so_number').unique().notNull(),
  customerId: integer('customer_id').notNull(),
  saleDate: text('sale_date').notNull(),
  status: text('status', {
    enum: ['DRAFT', 'CONFIRMED', 'DELIVERED', 'CANCELLED'],
  }).default('DRAFT'),
  totalAmount: real('total_amount').default(0).notNull(),
  amountPaid: real('amount_paid').default(0),
  paymentStatus: text('payment_status', {
    enum: ['UNPAID', 'PARTIAL', 'PAID'],
  }).default('UNPAID'),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  soNumberIdx: index('idx_so_number').on(table.soNumber),
  customerIdx: index('idx_so_customer').on(table.customerId),
}));

export const saleOrderItems = sqliteTable('sale_order_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  saleOrderId: integer('sale_order_id').notNull().references(() => saleOrders.id),
  finishedProductId: integer('finished_product_id').notNull(),
  quantity: real('quantity').notNull(),
  unitPrice: real('unit_price').notNull(),
  totalPrice: real('total_price').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  soIdx: index('idx_soi_so').on(table.saleOrderId),
}));

export const payments = sqliteTable('payments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  paymentType: text('payment_type', { enum: ['INCOMING', 'OUTGOING'] }).notNull(),
  referenceType: text('reference_type', {
    enum: ['SALE_ORDER', 'PURCHASE_ORDER'],
  }).notNull(),
  referenceId: integer('reference_id').notNull(),
  amount: real('amount').notNull(),
  paymentDate: text('payment_date').notNull(),
  paymentMethod: text('payment_method', {
    enum: ['CASH', 'BANK', 'CHEQUE'],
  }).notNull(),
  notes: text('notes'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  refIdx: index('idx_payment_ref').on(table.referenceType, table.referenceId),
  dateIdx: index('idx_payment_date').on(table.paymentDate),
}));

export type PurchaseOrder = typeof purchaseOrders.$inferSelect;
export type NewPurchaseOrder = typeof purchaseOrders.$inferInsert;
export type PurchaseOrderItem = typeof purchaseOrderItems.$inferSelect;
export type NewPurchaseOrderItem = typeof purchaseOrderItems.$inferInsert;
export type SaleOrder = typeof saleOrders.$inferSelect;
export type NewSaleOrder = typeof saleOrders.$inferInsert;
export type SaleOrderItem = typeof saleOrderItems.$inferSelect;
export type NewSaleOrderItem = typeof saleOrderItems.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;
