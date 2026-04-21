# نظام إدارة مطحنة القهوة - Coffee Mill ERP System

## نظرة عامة
نظام شامل لإدارة جميع عمليات مطحنة القهوة (تحميص وطحن)، مصمم للعمل بشكل مستقل (Offline-First) مع دعم كامل للغة العربية والتخطيط من اليمين إلى اليسار (RTL).

## البنية المعمارية

### المستويات التقنية

```
┌─────────────────────────────────────────┐
│    المستخدم / واجهة المستخدم           │
├─────────────────────────────────────────┤
│  مكونات React + Tailwind CSS (RTL)     │
├─────────────────────────────────────────┤
│  طبقة الحالة: Zustand + TanStack Query │
├─────────────────────────────────────────┤
│  طبقة البيانات: Repositories           │
├─────────────────────────────────────────┤
│  طبقة الوصول: Drizzle ORM + SQLite     │
├─────────────────────────────────────────┤
│  قاعدة البيانات: SQLite (Local File)   │
└─────────────────────────────────────────┘
```

## المشروع الهيكلي

```
coffee-mill-erp/
├── src/
│   ├── locales/                    # ملفات اللغة (عربي)
│   │   └── ar.json               # جميع النصوص والعبارات
│   │
│   ├── lib/
│   │   └── i18n.ts               # نظام الترجمة
│   │
│   ├── db/
│   │   ├── client.ts             # اتصال قاعدة البيانات
│   │   ├── schema/               # تعريفات جداول البيانات
│   │   │   ├── warehouse.ts
│   │   │   ├── suppliers.ts
│   │   │   ├── customers.ts
│   │   │   ├── workers.ts
│   │   │   ├── production.ts
│   │   │   ├── expenses.ts
│   │   │   └── sales.ts
│   │   ├── migrations/           # ملفات الترحيل (SQL)
│   │   └── repositories/         # دوال الوصول للبيانات
│   │       ├── warehouseRepo.ts
│   │       ├── supplierRepo.ts
│   │       ├── customerRepo.ts
│   │       ├── workerRepo.ts
│   │       ├── productionRepo.ts
│   │       ├── expenseRepo.ts
│   │       └── salesRepo.ts
│   │
│   ├── modules/                  # وحدات النظام الرئيسية
│   │   ├── warehouse/
│   │   ├── suppliers/
│   │   ├── customers/
│   │   ├── workers/
│   │   ├── production/
│   │   ├── expenses/
│   │   └── sales/
│   │
│   ├── shared/                   # المكونات المشتركة
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   │
│   ├── main.tsx                 # نقطة الدخول
│   └── index.css                # أنماط عامة
│
├── index.html
├── drizzle.config.ts            # إعدادات Drizzle ORM
├── tailwind.config.js           # إعدادات Tailwind CSS
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## الوحدات الرئيسية

### 1. إدارة المخزن (Warehouse)
- **الميزات**: إدارة المواد الخام والمنتجات النهائية
- **الجداول**: 
  - raw_materials
  - finished_products
  - stock_movements (سجل حركات المخزن)
- **الملفات الرئيسية**:
  - `src/modules/warehouse/hooks/useRawMaterials.ts`
  - `src/modules/warehouse/components/RawMaterialsGrid.tsx`
  - `src/db/repositories/warehouseRepo.ts`

### 2. إدارة الموردين (Suppliers)
- **الميزات**: تسجيل الموردين وتتبع الشراء
- **الجداول**: suppliers
- **الملفات الرئيسية**:
  - `src/db/repositories/supplierRepo.ts`

### 3. إدارة العملاء (Customers)
- **الميزات**: تسجيل العملاء وتتبع المبيعات
- **الجداول**: customers
- **الملفات الرئيسية**:
  - `src/db/repositories/customerRepo.ts`

### 4. إدارة العاملين (Workers)
- **الميزات**: تسجيل العاملين والحضور والرواتب
- **الجداول**: workers, attendance_logs, payroll_records
- **الملفات الرئيسية**:
  - `src/db/repositories/workerRepo.ts`

### 5. إدارة الإنتاج (Production)
- **الميزات**: تتبع دفعات التحميص والطحن
- **الجداول**: machines, production_batches
- **الملفات الرئيسية**:
  - `src/db/repositories/productionRepo.ts`

### 6. تتبع المصروفات (Expenses)
- **الميزات**: تسجيل المصروفات وتصنيفها
- **الجداول**: expense_categories, expenses
- **الملفات الرئيسية**:
  - `src/db/repositories/expenseRepo.ts`

### 7. المبيعات والمشتريات (Sales)
- **الميزات**: فواتير البيع والشراء والدفعات
- **الجداول**: purchase_orders, sale_orders, payments
- **الملفات الرئيسية**:
  - `src/db/repositories/salesRepo.ts`

## نظام اللغة والترجمة

### ملف اللغة الرئيسي
`src/locales/ar.json` يحتوي على جميع النصوص:
```json
{
  "app": { "title": "نظام إدارة مطحنة القهوة" },
  "warehouse": { "title": "إدارة المخزن", "name": "الاسم" },
  ...
}
```

### الاستخدام في المكونات
```typescript
import { t } from '@/lib/i18n';

export function MyComponent() {
  return <h1>{t('warehouse.title')}</h1>;
}
```

## دعم RTL (من اليمين إلى اليسار)

### التكوين
- `index.html`: `<html lang="ar" dir="rtl">`
- `src/index.css`: أنماط خاصة بـ RTL
- `tailwind.config.js`: إعدادات Tailwind للـ RTL

### استخدام dir في الحقول
- `<input dir="rtl">` للنصوص العربية
- `<input dir="ltr">` للأرقام والبيانات الرقمية

## قاعدة البيانات

### محرك البيانات
- **SQLite**: قاعدة بيانات محلية في ملف واحد
- **الموقع**: `coffee-mill.db`
- **الوضع**: WAL Mode (Write-Ahead Logging)

### ORM
- **Drizzle ORM**: توافق مباشر مع SQLite و PostgreSQL
- **ملفات الترحيل**: يتم إنشاؤها تلقائياً

### الاتصال
```typescript
import { db } from '@/db/client';

const materials = db.select().from(rawMaterials).all();
```

## طبقة البيانات (Data Layer)

### معايير التخزين
- **الأموال**: تُخزن كأعداد صحيحة (بالفلوس/هللة) لتجنب أخطاء الفاصلة العائمة
- **التواريخ**: بصيغة ISO-8601 النصية
- **الحذف الناعم**: استخدام عمود `deleted_at` بدلاً من الحذف النهائي

### مثال على Schema
```typescript
export const rawMaterials = sqliteTable('raw_materials', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  unit: text('unit').notNull(),
  currentStockQty: real('current_stock_qty').default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
  deletedAt: text('deleted_at'),
});
```

## تدفق البيانات

### من واجهة المستخدم إلى قاعدة البيانات

```
Component (React)
    ↓
Hooks (useQuery/useMutation)
    ↓
TanStack Query (Caching)
    ↓
Repository Functions
    ↓
Drizzle ORM
    ↓
SQLite Database
```

### مثال
```typescript
// في Component
const { data } = useRawMaterials();

// في Hook
export function useRawMaterials() {
  return useQuery({
    queryKey: ['rawMaterials'],
    queryFn: () => warehouseRepo.getRawMaterials(),
  });
}

// في Repository
export const warehouseRepo = {
  getRawMaterials() {
    return db.select().from(rawMaterials).all();
  }
}
```

## مكونات واجهة المستخدم (UI Components)

### المكونات المشتركة
- `Button`: أزرار متعددة الأنماط
- `DataGrid`: شبكة بيانات تفاعلية (مثل Excel)
- `Layout`: تخطيط الصفحة الأساسي
- `Sidebar`: القائمة الجانبية

### استخدام الشبكة
```typescript
<DataGrid
  columns={columns}
  data={materials}
  isLoading={isLoading}
  onRowClick={handleEdit}
/>
```

## سير العمل للإضافة والتعديل

### إضافة مادة خام جديدة
1. استخدام النموذج `RawMaterialForm`
2. استدعاء `createRawMaterial()` من hook
3. Repository يستدعي `db.insert()`
4. قاعدة البيانات تحفظ البيانات
5. TanStack Query يُعدّل Cache
6. UI يُحدّث تلقائياً

## الترحيل والتحديثات

### إنشاء ترحيل جديد
```bash
npx drizzle-kit generate:sqlite
```

### ملف الترحيل
```sql
-- تاريخ الإنشاء: 2026-04-21
-- الوصف: إضافة جدول المواد الخام
CREATE TABLE raw_materials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  current_stock_qty REAL DEFAULT 0,
  ...
);
```

## التعامل مع الأخطاء

### معالجة الأخطاء في الـ Hooks
```typescript
const { data, error, isLoading } = useRawMaterials();

if (isLoading) return <Loading />;
if (error) return <Error message={error.message} />;
return <Grid data={data} />;
```

## الأداء والتحسينات

### Caching مع TanStack Query
- **staleTime**: 5 دقائق
- **gcTime**: 10 دقائق
- إعادة التحقق التلقائي عند التركيز

### الفهارس على قاعدة البيانات
- `idx_raw_materials_name`: للبحث السريع عن الأسماء
- `idx_stock_date`: لترتيب حركات المخزن
- `idx_batch_code`: للبحث السريع عن الدفعات

## التوسع المستقبلي

### للمزامنة السحابية
يمكن تبديل Repository Functions للاتصال بـ API بدلاً من SQLite:
```typescript
// بدلاً من:
return db.select().from(rawMaterials).all();

// استخدم:
const response = await fetch('/api/raw-materials');
return await response.json();
```

### الترقية إلى PostgreSQL
Drizzle ORM يدعم كلاً من SQLite و PostgreSQL نفس الصيغة تقريباً.

## الأوامر المهمة

```bash
# البناء
npm run build

# التطوير
npm run dev

# التحقق من الأنواع
npm run type-check

# إنشاء ترحيل جديد
npx drizzle-kit generate:sqlite

# الاطلاع على قاعدة البيانات
npx drizzle-kit studio
```

## الملفات الأساسية للبدء

1. `src/db/schema/*.ts` - تعريفات الجداول
2. `src/db/repositories/*.ts` - دوال الوصول للبيانات
3. `src/modules/*/index.tsx` - صفحات الوحدات
4. `src/locales/ar.json` - النصوص والعبارات
5. `src/main.tsx` - نقطة الدخول والتوجيه

## ملاحظات أمان

- جميع التاريخ والساعة في UTC بصيغة ISO-8601
- البيانات الحساسة لا تُخزن في localStorage
- كل جدول له حقول `createdAt` و `updatedAt` للمراجعة
- استخدام `deletedAt` للحذف الآمن بدلاً من الحذف النهائي
