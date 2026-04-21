import { db } from '../client';
import {
  rawMaterials,
  finishedProducts,
  stockMovements,
  type NewRawMaterial,
  type NewFinishedProduct,
  type NewStockMovement,
} from '../schema/warehouse';
import { eq, isNull, desc } from 'drizzle-orm';

export const warehouseRepo = {
  // Raw Materials
  getRawMaterials() {
    return db
      .select()
      .from(rawMaterials)
      .where(isNull(rawMaterials.deletedAt))
      .all();
  },

  getRawMaterialById(id: number) {
    return db
      .select()
      .from(rawMaterials)
      .where(eq(rawMaterials.id, id))
      .get();
  },

  createRawMaterial(data: NewRawMaterial) {
    return db.insert(rawMaterials).values(data).returning().get();
  },

  updateRawMaterial(id: number, data: Partial<NewRawMaterial>) {
    return db
      .update(rawMaterials)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(rawMaterials.id, id))
      .returning()
      .get();
  },

  deleteRawMaterial(id: number) {
    return db
      .update(rawMaterials)
      .set({ deletedAt: new Date().toISOString() })
      .where(eq(rawMaterials.id, id))
      .run();
  },

  // Finished Products
  getFinishedProducts() {
    return db
      .select()
      .from(finishedProducts)
      .where(isNull(finishedProducts.deletedAt))
      .all();
  },

  getFinishedProductById(id: number) {
    return db
      .select()
      .from(finishedProducts)
      .where(eq(finishedProducts.id, id))
      .get();
  },

  createFinishedProduct(data: NewFinishedProduct) {
    return db.insert(finishedProducts).values(data).returning().get();
  },

  updateFinishedProduct(id: number, data: Partial<NewFinishedProduct>) {
    return db
      .update(finishedProducts)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(finishedProducts.id, id))
      .returning()
      .get();
  },

  deleteFinishedProduct(id: number) {
    return db
      .update(finishedProducts)
      .set({ deletedAt: new Date().toISOString() })
      .where(eq(finishedProducts.id, id))
      .run();
  },

  // Stock Movements
  getStockMovements() {
    return db
      .select()
      .from(stockMovements)
      .orderBy(desc(stockMovements.movementDate))
      .all();
  },

  getStockMovementsByItem(itemId: number, itemType: 'RAW' | 'FINISHED') {
    return db
      .select()
      .from(stockMovements)
      .where(
        eq(stockMovements.itemId, itemId) &&
        eq(stockMovements.itemType, itemType)
      )
      .orderBy(desc(stockMovements.movementDate))
      .all();
  },

  createStockMovement(data: NewStockMovement) {
    return db.insert(stockMovements).values(data).returning().get();
  },

  getLowStockItems() {
    const rawLowStock = db
      .select()
      .from(rawMaterials)
      .where(
        isNull(rawMaterials.deletedAt) &&
        eq(rawMaterials.currentStockQty, db.select().from(rawMaterials).where(rawMaterials.currentStockQty <= rawMaterials.reorderThreshold))
      )
      .all();

    const finishedLowStock = db
      .select()
      .from(finishedProducts)
      .where(
        isNull(finishedProducts.deletedAt) &&
        eq(finishedProducts.currentStockQty, db.select().from(finishedProducts).where(finishedProducts.currentStockQty <= finishedProducts.reorderThreshold))
      )
      .all();

    return { rawMaterials: rawLowStock, finishedProducts: finishedLowStock };
  },
};
