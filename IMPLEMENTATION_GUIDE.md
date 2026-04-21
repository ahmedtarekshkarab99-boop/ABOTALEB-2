# دليل التطبيق - نظام إدارة مطحنة القهوة

## نظرة عامة
هذا المشروع عبارة عن نظام ERP كامل مصمم خصيصاً لإدارة عمليات مطحنة القهوة (تحميص وطحن)، مع تركيز كامل على اللغة العربية والتخطيط من اليمين إلى اليسار.

## الحالة الحالية للمشروع

### تم إنجازه ✅
1. **البنية الأساسية**: مشروع React + TypeScript مع Vite
2. **نظام قاعدة البيانات**:
   - Drizzle ORM جاهز
   - جميع Schemas معرّفة لكل الموديولات
   - Repositories لكل وحدة نظام

3. **نظام اللغة**: 
   - ملف ar.json بـ 200+ عبارة عربية
   - نظام i18n كامل

4. **واجهة المستخدم**:
   - دعم RTL كامل في HTML و CSS
   - مكونات مشتركة (Button, DataGrid, Layout, Sidebar)
   - موديول Warehouse مكتمل وقابل للاستخدام

5. **الأداء والبناء**:
   - المشروع يُبنى بنجاح (✓ 195 modules)
   - حجم صغير وسريع (373 KB)

### المتوقع إنجازه قريباً 🔄
1. موديولات إضافية (Suppliers, Customers, Workers, etc.)
2. تقارير ورسوم بيانية
3. خصائص متقدمة للبحث والتصفية
4. نسخ احتياطية تلقائية

---

## إعدادات المشروع

### اسم المشروع
```
نظام إدارة مطحنة القهوة
Coffee Mill ERP System - Arabic-First
```

### الإصدار
```
v1.0.0
```

### اللغة
```
100% عربي - جميع عناصر الواجهة بالعربية فقط
```

### قاعدة البيانات
```
SQLite محلي (coffee-mill.db)
```

---

## بدء التطوير

### أولاً: التثبيت الأولي
```bash
# 1. فتح المجلد
cd coffee-mill-erp

# 2. تثبيت الحزم
npm install

# 3. بدء خادم التطوير
npm run dev
```

التطبيق سيكون متاحاً على: `http://localhost:5173`

---

## شرح البنية

### 1. مجلد `src/locales/`
يحتوي على جميع النصوص باللغة العربية
```
ar.json
├── app (عنوان التطبيق)
├── sidebar (قائمة التنقل)
├── warehouse (إدارة المخزن)
├── suppliers (إدارة الموردين)
├── customers (إدارة العملاء)
├── workers (إدارة العاملين)
├── production (إدارة الإنتاج)
├── expenses (المصروفات)
├── sales (المبيعات)
└── common (كلمات مشتركة)
```

### 2. مجلد `src/db/`
كل شيء متعلق بقاعدة البيانات

#### a. `schema/` - تعريفات الجداول
- `warehouse.ts`: جداول المخزن
- `suppliers.ts`: جدول الموردين
- `customers.ts`: جدول العملاء
- `workers.ts`: جداول العاملين والرواتب
- `production.ts`: جداول الإنتاج
- `expenses.ts`: جداول المصروفات
- `sales.ts`: جداول المبيعات والمشتريات

#### b. `repositories/` - دوال الوصول
كل repository يحتوي على دوال CRUD للتفاعل مع الجداول
```typescript
// مثال من warehouseRepo.ts
export const warehouseRepo = {
  getRawMaterials(),
  getRawMaterialById(id),
  createRawMaterial(data),
  updateRawMaterial(id, data),
  deleteRawMaterial(id),
  // ... وغيرها
}
```

### 3. مجلد `src/modules/`
كل وحدة نظام مستقلة تماماً

#### بنية الموديول النموذجية:
```
warehouse/
├── components/        # مكونات React
│   ├── RawMaterialsGrid.tsx
│   ├── RawMaterialForm.tsx
│   └── ...
├── hooks/            # React Hooks للبيانات
│   ├── useRawMaterials.ts
│   └── useFinishedProducts.ts
└── index.tsx         # صفحة الموديول الرئيسية
```

### 4. مجلد `src/shared/`
مكونات مشتركة بين جميع الموديولات
```
shared/
├── components/       # مكونات عامة
│   ├── Button.tsx
│   ├── DataGrid.tsx
│   ├── Layout.tsx
│   └── Sidebar.tsx
├── hooks/           # دوال مشتركة
└── utils/           # دوال مساعدة
    └── cn.ts        # دمج الأصناف
```

---

## مثال عملي: إضافة موديول جديد

لنفترض أننا نريد إكمال موديول `Suppliers` (الموردين)

### الخطوة 1: إنشاء الهياكل الأساسية

```bash
mkdir -p src/modules/suppliers/components
mkdir -p src/modules/suppliers/hooks
touch src/modules/suppliers/index.tsx
```

### الخطوة 2: إنشاء Hooks للبيانات

```typescript
// src/modules/suppliers/hooks/useSuppliers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supplierRepo } from '../../../db/repositories/supplierRepo';
import type { NewSupplier } from '../../../db/schema/suppliers';

export function useSuppliers() {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: () => supplierRepo.getSuppliers(),
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NewSupplier) => supplierRepo.createSupplier(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
  });
}
```

### الخطوة 3: إنشاء مكونات الواجهة

```typescript
// src/modules/suppliers/components/SuppliersGrid.tsx
import { DataGrid } from '../../../shared/components/DataGrid';
import { useSuppliers } from '../hooks/useSuppliers';
import { t } from '../../../lib/i18n';

export function SuppliersGrid() {
  const { data: suppliers = [], isLoading } = useSuppliers();

  const columns = [
    { accessorKey: 'name', header: t('suppliers.supplierName') },
    { accessorKey: 'phone', header: t('suppliers.phone') },
    { accessorKey: 'email', header: t('suppliers.email') },
    // ... أعمدة إضافية
  ];

  return (
    <DataGrid
      columns={columns}
      data={suppliers}
      isLoading={isLoading}
    />
  );
}
```

### الخطوة 4: دمج في الصفحة الرئيسية

```typescript
// src/modules/suppliers/index.tsx
export function SuppliersModule() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{t('suppliers.title')}</h1>
      <SuppliersGrid />
    </div>
  );
}
```

### الخطوة 5: ربط مع التوجيه (Routing)

```typescript
// في src/main.tsx، أضف:
import { SuppliersModule } from './modules/suppliers'

<Route path="/suppliers" element={<SuppliersModule />} />
```

---

## شرح نظام الترجمة

### كيف يعمل نظام الترجمة (i18n)

#### 1. تخزين النصوص
جميع النصوص محفوظة في هيكل هرمي:
```json
{
  "warehouse": {
    "title": "إدارة المخزن",
    "rawMaterials": "المواد الخام",
    "name": "الاسم"
  }
}
```

#### 2. استخدام النصوص في المكونات
```typescript
import { t } from '@/lib/i18n';

function MyComponent() {
  return <h1>{t('warehouse.title')}</h1>;
}
```

#### 3. إضافة نص جديد
1. افتح `src/locales/ar.json`
2. أضف النص في المكان المناسب:
```json
{
  "suppliers": {
    "newField": "حقل جديد"
  }
}
```
3. استخدمه في المكون:
```typescript
<label>{t('suppliers.newField')}</label>
```

---

## شرح RTL (من اليمين إلى اليسار)

### التكوينات

#### 1. في HTML
```html
<html lang="ar" dir="rtl">
```

#### 2. في CSS
```css
html {
  direction: rtl;
}

body {
  text-align: right;
}
```

#### 3. في العناصر النصية
```jsx
{/* نصوص عربية - RTL تلقائي */}
<p dir="rtl">مرحبا بك</p>

{/* أرقام - LTR */}
<input dir="ltr" type="number" />

{/* نص يحتوي على عربي وأرقام */}
<p>
  <span dir="rtl">السعر:</span>
  <span dir="ltr">1000</span>
</p>
```

---

## تعامل مع قاعدة البيانات

### إضافة جدول جديد

#### 1. إنشاء Schema
```typescript
// src/db/schema/example.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const examples = sqliteTable('examples', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export type Example = typeof examples.$inferSelect;
export type NewExample = typeof examples.$inferInsert;
```

#### 2. إنشاء Repository
```typescript
// src/db/repositories/exampleRepo.ts
import { db } from '../client';
import { examples } from '../schema/example';
import { eq } from 'drizzle-orm';

export const exampleRepo = {
  getAll() {
    return db.select().from(examples).all();
  },

  create(data: NewExample) {
    return db.insert(examples).values(data).returning().get();
  },

  // ... باقي العمليات
};
```

#### 3. إنشاء Hooks
```typescript
// في modules/your-module/hooks/useExamples.ts
export function useExamples() {
  return useQuery({
    queryKey: ['examples'],
    queryFn: () => exampleRepo.getAll(),
  });
}
```

#### 4. إنشاء ترحيل قاعدة البيانات
```bash
npx drizzle-kit generate:sqlite
```

---

## معايير الترميز

### 1. أسماء الملفات
- مكونات React: PascalCase (e.g., `RawMaterialForm.tsx`)
- Hooks: camelCase مع البادئة `use` (e.g., `useRawMaterials.ts`)
- الملفات العادية: camelCase (e.g., `cn.ts`)
- Repositories: camelCase مع اللاحقة `Repo` (e.g., `warehouseRepo.ts`)

### 2. أسماء المتغيرات
```typescript
// المتغيرات: camelCase
const rawMaterials = [];
const currentStock = 100;

// الثوابت: UPPER_SNAKE_CASE
const DEFAULT_STOCK = 0;
const MAX_QUANTITY = 1000;
```

### 3. التعليقات
- فقط للأشياء الغير واضحة
- تجنب التعليقات الطويلة

```typescript
// ✅ جيد
// حساب الخسارة في التحميص
const lossPercentage = (inputQty - outputQty) / inputQty * 100;

// ❌ سيء
// هذه الدالة تحسب الخسارة
function calculateLoss() { ... }
```

---

## أوامر Git المهمة

```bash
# إنشاء فرع جديد
git checkout -b feature/supplier-module

# إضافة الملفات
git add .

# حفظ التغييرات
git commit -m "feat: add supplier module"

# رفع الفرع
git push origin feature/supplier-module
```

---

## الأخطاء الشائعة وحلولها

### ❌ خطأ: `Module "fs" has been externalized for browser compatibility`
- **السبب**: تحذير من Vite حول better-sqlite3
- **الحل**: هذا تحذير فقط ولا يؤثر على التطبيق

### ❌ خطأ: البيانات لا تظهر في الجدول
```typescript
// ❌ خطأ
const { data } = useRawMaterials();
return <DataGrid data={data} /> // data قد تكون undefined

// ✅ صحيح
const { data = [] } = useRawMaterials();
return <DataGrid data={data} />
```

### ❌ خطأ: الأنماط CSS لا تعمل
```typescript
// ❌ خطأ
className="text-blue-500"

// ✅ صحيح (تأكد من وجود اللون في tailwind.config.js)
className="text-primary-600"
```

### ❌ خطأ: النصوص العربية تظهر معكوسة
```jsx
// ❌ خطأ
<div>{arabicText.split('').reverse()}</div>

// ✅ صحيح
<div dir="rtl">{arabicText}</div>
```

---

## التطوير السريع

### Snippets مفيدة

#### مكون جديد
```typescript
// src/modules/[name]/index.tsx
import { t } from '@/lib/i18n';

export function [Name]Module() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        {t('[name].title')}
      </h1>
    </div>
  );
}
```

#### Hooks جديد
```typescript
// src/modules/[name]/hooks/use[Name].ts
import { useQuery } from '@tanstack/react-query';
import { [name]Repo } from '@/db/repositories/[name]Repo';

export function use[Name]s() {
  return useQuery({
    queryKey: ['[name]s'],
    queryFn: () => [name]Repo.getAll(),
  });
}
```

---

## الخطوات التالية الموصى بها

### 1. إكمال الموديولات الأخرى
- [ ] Suppliers (الموردين)
- [ ] Customers (العملاء)
- [ ] Workers (العاملين)
- [ ] Production (الإنتاج)
- [ ] Expenses (المصروفات)
- [ ] Sales (المبيعات والمشتريات)

### 2. إضافة التقارير
```typescript
// تقرير المخزن الشهري
// تقرير المبيعات اليومية
// تقرير الرواتب
// إلخ
```

### 3. البحث والتصفية
```typescript
// إضافة حقول بحث في كل جدول
// إضافة مرشحات متقدمة
```

### 4. التصدير والطباعة
```typescript
// تصدير إلى Excel
// تصدير إلى PDF
// طباعة الفواتير
```

---

## الاتصال والدعم

للمزيد من المساعدة أو إذا واجهت مشاكل، يرجى التواصل عبر:
- فتح Issue في GitHub
- البريد الإلكتروني
- المشاورة المباشرة

---

**آخر تحديث**: 2026-04-21  
**نسخة الوثائق**: 1.0.0
