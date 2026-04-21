import { db } from '../client';
import { suppliers, type NewSupplier } from '../schema/suppliers';
import { eq, isNull } from 'drizzle-orm';

export const supplierRepo = {
  getSuppliers() {
    return db
      .select()
      .from(suppliers)
      .where(isNull(suppliers.deletedAt))
      .all();
  },

  getSupplierById(id: number) {
    return db
      .select()
      .from(suppliers)
      .where(eq(suppliers.id, id))
      .get();
  },

  createSupplier(data: NewSupplier) {
    return db.insert(suppliers).values(data).returning().get();
  },

  updateSupplier(id: number, data: Partial<NewSupplier>) {
    return db
      .update(suppliers)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(suppliers.id, id))
      .returning()
      .get();
  },

  deleteSupplier(id: number) {
    return db
      .update(suppliers)
      .set({ deletedAt: new Date().toISOString() })
      .where(eq(suppliers.id, id))
      .run();
  },
};
