import { db } from '../client';
import {
  purchaseOrders,
  purchaseOrderItems,
  saleOrders,
  saleOrderItems,
  payments,
  type NewPurchaseOrder,
  type NewPurchaseOrderItem,
  type NewSaleOrder,
  type NewSaleOrderItem,
  type NewPayment,
} from '../schema/sales';
import { eq } from 'drizzle-orm';

export const salesRepo = {
  // Purchase Orders
  getPurchaseOrders() {
    return db.select().from(purchaseOrders).all();
  },

  getPurchaseOrderById(id: number) {
    return db
      .select()
      .from(purchaseOrders)
      .where(eq(purchaseOrders.id, id))
      .get();
  },

  createPurchaseOrder(data: NewPurchaseOrder) {
    return db.insert(purchaseOrders).values(data).returning().get();
  },

  updatePurchaseOrder(id: number, data: Partial<NewPurchaseOrder>) {
    return db
      .update(purchaseOrders)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(purchaseOrders.id, id))
      .returning()
      .get();
  },

  // Purchase Order Items
  getPurchaseOrderItems(poId: number) {
    return db
      .select()
      .from(purchaseOrderItems)
      .where(eq(purchaseOrderItems.purchaseOrderId, poId))
      .all();
  },

  createPurchaseOrderItem(data: NewPurchaseOrderItem) {
    return db.insert(purchaseOrderItems).values(data).returning().get();
  },

  // Sale Orders
  getSaleOrders() {
    return db.select().from(saleOrders).all();
  },

  getSaleOrderById(id: number) {
    return db
      .select()
      .from(saleOrders)
      .where(eq(saleOrders.id, id))
      .get();
  },

  createSaleOrder(data: NewSaleOrder) {
    return db.insert(saleOrders).values(data).returning().get();
  },

  updateSaleOrder(id: number, data: Partial<NewSaleOrder>) {
    return db
      .update(saleOrders)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(saleOrders.id, id))
      .returning()
      .get();
  },

  // Sale Order Items
  getSaleOrderItems(soId: number) {
    return db
      .select()
      .from(saleOrderItems)
      .where(eq(saleOrderItems.saleOrderId, soId))
      .all();
  },

  createSaleOrderItem(data: NewSaleOrderItem) {
    return db.insert(saleOrderItems).values(data).returning().get();
  },

  // Payments
  getPayments() {
    return db.select().from(payments).all();
  },

  getPaymentsByReference(referenceType: string, referenceId: number) {
    return db
      .select()
      .from(payments)
      .where(
        eq(payments.referenceType, referenceType) &&
        eq(payments.referenceId, referenceId)
      )
      .all();
  },

  createPayment(data: NewPayment) {
    return db.insert(payments).values(data).returning().get();
  },
};
