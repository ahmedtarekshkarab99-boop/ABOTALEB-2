import { db } from '../client';
import { customers, type NewCustomer } from '../schema/customers';
import { eq, isNull } from 'drizzle-orm';

export const customerRepo = {
  getCustomers() {
    return db
      .select()
      .from(customers)
      .where(isNull(customers.deletedAt))
      .all();
  },

  getCustomerById(id: number) {
    return db
      .select()
      .from(customers)
      .where(eq(customers.id, id))
      .get();
  },

  createCustomer(data: NewCustomer) {
    return db.insert(customers).values(data).returning().get();
  },

  updateCustomer(id: number, data: Partial<NewCustomer>) {
    return db
      .update(customers)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(customers.id, id))
      .returning()
      .get();
  },

  deleteCustomer(id: number) {
    return db
      .update(customers)
      .set({ deletedAt: new Date().toISOString() })
      .where(eq(customers.id, id))
      .run();
  },
};
