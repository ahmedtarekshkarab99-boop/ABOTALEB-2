import { db } from '../client';
import {
  workers,
  attendanceLogs,
  payrollRecords,
  type NewWorker,
  type NewAttendanceLog,
  type NewPayrollRecord,
} from '../schema/workers';
import { eq, isNull } from 'drizzle-orm';

export const workerRepo = {
  getWorkers() {
    return db
      .select()
      .from(workers)
      .where(isNull(workers.deletedAt))
      .all();
  },

  getWorkerById(id: number) {
    return db
      .select()
      .from(workers)
      .where(eq(workers.id, id))
      .get();
  },

  createWorker(data: NewWorker) {
    return db.insert(workers).values(data).returning().get();
  },

  updateWorker(id: number, data: Partial<NewWorker>) {
    return db
      .update(workers)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(workers.id, id))
      .returning()
      .get();
  },

  deleteWorker(id: number) {
    return db
      .update(workers)
      .set({ deletedAt: new Date().toISOString() })
      .where(eq(workers.id, id))
      .run();
  },

  // Attendance
  getAttendanceLogs(workerId?: number) {
    if (workerId) {
      return db
        .select()
        .from(attendanceLogs)
        .where(eq(attendanceLogs.workerId, workerId))
        .all();
    }
    return db.select().from(attendanceLogs).all();
  },

  createAttendanceLog(data: NewAttendanceLog) {
    return db.insert(attendanceLogs).values(data).returning().get();
  },

  // Payroll
  getPayrollRecords(workerId?: number) {
    if (workerId) {
      return db
        .select()
        .from(payrollRecords)
        .where(eq(payrollRecords.workerId, workerId))
        .all();
    }
    return db.select().from(payrollRecords).all();
  },

  createPayrollRecord(data: NewPayrollRecord) {
    return db.insert(payrollRecords).values(data).returning().get();
  },
};
