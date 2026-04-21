import { db } from '../client';
import {
  machines,
  productionBatches,
  type NewMachine,
  type NewProductionBatch,
} from '../schema/production';
import { eq } from 'drizzle-orm';

export const productionRepo = {
  getMachines() {
    return db.select().from(machines).all();
  },

  getMachineById(id: number) {
    return db
      .select()
      .from(machines)
      .where(eq(machines.id, id))
      .get();
  },

  createMachine(data: NewMachine) {
    return db.insert(machines).values(data).returning().get();
  },

  updateMachine(id: number, data: Partial<NewMachine>) {
    return db
      .update(machines)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(machines.id, id))
      .returning()
      .get();
  },

  getProductionBatches() {
    return db.select().from(productionBatches).all();
  },

  getBatchById(id: number) {
    return db
      .select()
      .from(productionBatches)
      .where(eq(productionBatches.id, id))
      .get();
  },

  getBatchByCode(code: string) {
    return db
      .select()
      .from(productionBatches)
      .where(eq(productionBatches.batchCode, code))
      .get();
  },

  createProductionBatch(data: NewProductionBatch) {
    return db.insert(productionBatches).values(data).returning().get();
  },

  updateProductionBatch(id: number, data: Partial<NewProductionBatch>) {
    return db
      .update(productionBatches)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(productionBatches.id, id))
      .returning()
      .get();
  },
};
