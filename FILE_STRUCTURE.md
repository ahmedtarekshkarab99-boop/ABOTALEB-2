# شرح البنية الهيكلية للملفات
# File Structure Documentation

## البنية الكاملة للمشروع

```
coffee-mill-erp/
│
├── 📄 ملفات التكوين الرئيسية
│   ├── package.json              ← الحزم والمتطلبات
│   ├── package-lock.json
│   ├── tsconfig.json             ← إعدادات TypeScript
│   ├── tsconfig.node.json
│   ├── vite.config.ts            ← إعدادات Vite والبناء
│   ├── tailwind.config.js        ← إعدادات Tailwind CSS
│   ├── drizzle.config.ts         ← إعدادات Drizzle ORM
│   ├── postcss.config.js         ← معالجة CSS
│   ├── index.html                ← الصفحة الرئيسية (HTML)
│   └── .gitignore
│
├── 📁 node_modules/              ← حزم npm المثبتة
│
├── 📁 dist/                      ← المجلد الناتج من البناء
│   ├── index.html
│   └── assets/                   ← CSS و JS المضغوطة
│
├── 📁 src/                       ← كود التطبيق الرئيسي
│   │
│   ├── 🌐 locales/              ← ملفات اللغة
│   │   └── ar.json              ← جميع النصوص العربية (200+ عبارة)
│   │       ├── app              ← معلومات التطبيق
│   │       ├── sidebar           ← قائمة التنقل
│   │       ├── warehouse         ← إدارة المخزن
│   │       ├── suppliers         ← إدارة الموردين
│   │       ├── customers         ← إدارة العملاء
│   │       ├── workers           ← إدارة العاملين
│   │       ├── production        ← إدارة الإنتاج
│   │       ├── expenses          ← المصروفات
│   │       ├── sales             ← المبيعات والمشتريات
│   │       └── common            ← كلمات مشتركة
│   │
│   ├── 📚 lib/                   ← مكتبات وأدوات
│   │   └── i18n.ts              ← نظام الترجمة والـ i18n
│   │
│   ├── 💾 db/                    ← كل شيء متعلق بقاعدة البيانات
│   │   │
│   │   ├── client.ts             ← اتصال قاعدة البيانات
│   │   │
│   │   ├── 🏗️ schema/            ← تعريفات الجداول (Drizzle Schema)
│   │   │   ├── warehouse.ts      ← جداول المخزن
│   │   │   │   ├── rawMaterials
│   │   │   │   ├── finishedProducts
│   │   │   │   └── stockMovements
│   │   │   │
│   │   │   ├── suppliers.ts      ← جدول الموردين
│   │   │   │
│   │   │   ├── customers.ts      ← جدول العملاء
│   │   │   │
│   │   │   ├── workers.ts        ← جداول العاملين
│   │   │   │   ├── workers
│   │   │   │   ├── attendanceLogs
│   │   │   │   └── payrollRecords
│   │   │   │
│   │   │   ├── production.ts     ← جداول الإنتاج
│   │   │   │   ├── machines
│   │   │   │   └── productionBatches
│   │   │   │
│   │   │   ├── expenses.ts       ← جداول المصروفات
│   │   │   │   ├── expenseCategories
│   │   │   │   └── expenses
│   │   │   │
│   │   │   └── sales.ts          ← جداول المبيعات والمشتريات
│   │   │       ├── purchaseOrders
│   │   │       ├── purchaseOrderItems
│   │   │       ├── saleOrders
│   │   │       ├── saleOrderItems
│   │   │       └── payments
│   │   │
│   │   ├── 🔧 repositories/      ← دوال الوصول للبيانات (CRUD)
│   │   │   ├── warehouseRepo.ts  ← عمليات المخزن
│   │   │   │   ├── getRawMaterials()
│   │   │   │   ├── createRawMaterial()
│   │   │   │   ├── updateRawMaterial()
│   │   │   │   ├── deleteRawMaterial()
│   │   │   │   ├── getFinishedProducts()
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── supplierRepo.ts   ← عمليات الموردين
│   │   │   ├── customerRepo.ts   ← عمليات العملاء
│   │   │   ├── workerRepo.ts     ← عمليات العاملين
│   │   │   ├── productionRepo.ts ← عمليات الإنتاج
│   │   │   ├── expenseRepo.ts    ← عمليات المصروفات
│   │   │   └── salesRepo.ts      ← عمليات المبيعات
│   │   │
│   │   └── migrations/            ← ملفات ترحيل قاعدة البيانات
│   │       └── (تُنشأ تلقائياً)
│   │
│   ├── 📦 modules/               ← وحدات/موديولات النظام الرئيسية
│   │   │
│   │   ├── warehouse/            ← وحدة إدارة المخزن (مكتملة)
│   │   │   ├── index.tsx         ← صفحة الموديول الرئيسية
│   │   │   │
│   │   │   ├── hooks/            ← React Hooks لإدارة البيانات
│   │   │   │   ├── useRawMaterials.ts
│   │   │   │   │   ├── useRawMaterials()
│   │   │   │   │   ├── useCreateRawMaterial()
│   │   │   │   │   ├── useUpdateRawMaterial()
│   │   │   │   │   └── useDeleteRawMaterial()
│   │   │   │   │
│   │   │   │   └── useFinishedProducts.ts
│   │   │   │       ├── useFinishedProducts()
│   │   │   │       ├── useCreateFinishedProduct()
│   │   │   │       └── ...
│   │   │   │
│   │   │   └── components/       ← مكونات React
│   │   │       ├── RawMaterialsGrid.tsx       ← جدول المواد الخام
│   │   │       │   ├── عرض البيانات
│   │   │       │   ├── حذف البيانات
│   │   │       │   └── تعديل البيانات
│   │   │       │
│   │   │       └── RawMaterialForm.tsx       ← نموذج الإضافة/التعديل
│   │   │           ├── حقول الإدخال
│   │   │           ├── التحقق من البيانات
│   │   │           └── معالجة الأخطاء
│   │   │
│   │   ├── suppliers/            ← وحدة إدارة الموردين (قاعدة)
│   │   │   ├── index.tsx
│   │   │   ├── hooks/
│   │   │   └── components/
│   │   │
│   │   ├── customers/            ← وحدة إدارة العملاء (قاعدة)
│   │   ├── workers/              ← وحدة إدارة العاملين (قاعدة)
│   │   ├── production/           ← وحدة إدارة الإنتاج (قاعدة)
│   │   ├── expenses/             ← وحدة تتبع المصروفات (قاعدة)
│   │   └── sales/                ← وحدة المبيعات والمشتريات (قاعدة)
│   │
│   ├── 🎨 shared/                ← مكونات مشتركة بين جميع الموديولات
│   │   │
│   │   ├── components/           ← مكونات React قابلة لإعادة الاستخدام
│   │   │   ├── Button.tsx        ← مكون الأزرار
│   │   │   │   ├── variant: default, secondary, outline, ghost, destructive
│   │   │   │   └── size: sm, md, lg, icon
│   │   │   │
│   │   │   ├── DataGrid.tsx      ← جدول البيانات التفاعلي
│   │   │   │   ├── عرض البيانات
│   │   │   │   ├── البحث والتصفية
│   │   │   │   ├── الترتيب
│   │   │   │   └── معالجة النقر على الصفوف
│   │   │   │
│   │   │   ├── Layout.tsx        ← التخطيط الأساسي
│   │   │   │   ├── Sidebar + Main Content
│   │   │   │   └── RTL Support
│   │   │   │
│   │   │   └── Sidebar.tsx       ← القائمة الجانبية
│   │   │       ├── قائمة التنقل
│   │   │       ├── الروابط النشطة
│   │   │       └── زر الإعدادات
│   │   │
│   │   ├── hooks/                ← React Hooks مشتركة
│   │   │   └── (سيتم إضافة المزيد)
│   │   │
│   │   └── utils/                ← دوال مساعدة
│   │       └── cn.ts             ← دمج أصناف Tailwind CSS
│   │
│   ├── main.tsx                  ← نقطة دخول التطبيق
│   │   ├── إعداد React
│   │   ├── إعداد QueryClient
│   │   ├── تعريف الروتات
│   │   └── تحميل التطبيق
│   │
│   └── index.css                 ← أنماط عامة
│       ├── Tailwind directives
│       ├── RTL styles
│       └── Custom utilities
│
├── 📋 ملفات التوثيق
│   ├── ARCHITECTURE.md           ← البنية المعمارية الشاملة
│   ├── IMPLEMENTATION_GUIDE.md   ← دليل التطبيق والتطوير
│   ├── PROJECT_SUMMARY.md        ← ملخص المشروع
│   ├── FILE_STRUCTURE.md         ← هذا الملف
│   └── README_AR.md              ← ملف التعريف بالعربية
│
└── 📄 ملفات أخرى
    └── .env                      ← المتغيرات البيئية (غير مُدرج)
```

---

## 📊 عدد الملفات حسب النوع

| نوع الملف | العدد | الملفات |
|----------|------|--------|
| TypeScript (.ts) | 19 | Schema، Repository، Hooks، Utils |
| React (.tsx) | 10 | Components، Pages |
| JSON | 2 | ar.json، package.json |
| CSS | 1 | index.css |
| Config | 6 | vite، tailwind، drizzle، tsconfig، postcss |
| Markdown | 4 | ARCHITECTURE، GUIDE، SUMMARY، README |
| **الإجمالي** | **42** | |

---

## 🗂️ البنية حسب الطبقات

### الطبقة 1: واجهة المستخدم (UI Layer)
```
modules/[name]/index.tsx
    ↓
modules/[name]/components/
    ├── Grid.tsx
    ├── Form.tsx
    └── ...
```

### الطبقة 2: إدارة الحالة (State Layer)
```
modules/[name]/hooks/
    ├── useData()
    └── useMutation()
        ↓
    TanStack Query (Caching)
```

### الطبقة 3: طبقة البيانات (Data Layer)
```
db/repositories/[name]Repo.ts
    ├── getAll()
    ├── getById()
    ├── create()
    ├── update()
    └── delete()
        ↓
    Drizzle ORM
```

### الطبقة 4: قاعدة البيانات (Database Layer)
```
db/schema/[name].ts
    ├── Table definitions
    ├── Types
    └── Relations
        ↓
    SQLite (coffee-mill.db)
```

---

## 🔗 العلاقات بين الملفات

### مثال: إضافة مادة خام جديدة

```
1. واجهة المستخدم
   RawMaterialForm.tsx
   └── يستخدم:

2. Hooks
   useCreateRawMaterial.ts
   └── يستدعي:

3. Repository
   warehouseRepo.ts (createRawMaterial)
   └── يستخدم:

4. ORM
   Drizzle
   └── يتفاعل مع:

5. قاعدة البيانات
   raw_materials table
```

---

## 📈 حجم الملفات

| الملف | الحجم (تقريبي) |
|------|----------------|
| ar.json (النصوص) | 8 KB |
| DataGrid.tsx | 2 KB |
| warehouse schema + repo | 5 KB |
| main.tsx + routing | 2 KB |
| مكونات مشتركة | 4 KB |
| باقي الملفات | 10 KB |
| **الإجمالي** | **31 KB** |

---

## 🚀 مسارات الملفات الشائعة

### للبحث عن نص معين
```
src/locales/ar.json
```

### لإضافة جدول جديد
```
src/db/schema/[name].ts
```

### لإضافة عمليات جديدة
```
src/db/repositories/[name]Repo.ts
```

### لإضافة موديول جديد
```
src/modules/[name]/
├── index.tsx
├── components/
└── hooks/
```

### لتعديل الواجهة
```
src/shared/components/
```

---

## 🔍 البحث عن الملفات

### للعثور على ملف معين
```bash
find src -name "*RawMaterial*"
# النتيجة:
# src/modules/warehouse/components/RawMaterialForm.tsx
# src/modules/warehouse/components/RawMaterialsGrid.tsx
# src/modules/warehouse/hooks/useRawMaterials.ts
```

### للعثور على جميع الـ Components
```bash
find src -path "*/components/*.tsx"
```

### للعثور على جميع الـ Hooks
```bash
find src -path "*/hooks/*.ts"
```

---

## 📝 تسمية الملفات والمتغيرات

### المكونات (Components)
- **الاسم**: PascalCase
- **الملف**: `RawMaterialForm.tsx`
- **الدالة**: `export function RawMaterialForm() {}`

### Hooks
- **الاسم**: camelCase مع البادئة `use`
- **الملف**: `useRawMaterials.ts`
- **الدالة**: `export function useRawMaterials() {}`

### Repositories
- **الاسم**: camelCase مع اللاحقة `Repo`
- **الملف**: `warehouseRepo.ts`
- **الكائن**: `export const warehouseRepo = { ... }`

### Schemas
- **الاسم**: camelCase مع اللاحقة `s` (جمع)
- **الملف**: `warehouse.ts`
- **الجدول**: `export const rawMaterials = sqliteTable(...)`

---

## 🔄 تدفق الملفات

### عند فتح الموديول

```
1. user opens /warehouse
   ↓
2. main.tsx routes to warehouse/index.tsx
   ↓
3. WarehouseModule renders
   ↓
4. Components call useRawMaterials() hook
   ↓
5. Hook calls warehouseRepo.getRawMaterials()
   ↓
6. Repository queries SQLite
   ↓
7. TanStack Query caches the result
   ↓
8. UI renders with data
```

---

## 📌 الملفات الأساسية للتعديل

### عند إضافة ميزة جديدة:
1. **أضف النص**: `src/locales/ar.json`
2. **أضف Schema**: `src/db/schema/*.ts`
3. **أضف Repository**: `src/db/repositories/*.ts`
4. **أضف Hooks**: `src/modules/*/hooks/*.ts`
5. **أضف Components**: `src/modules/*/components/*.tsx`
6. **أضف Routing**: `src/main.tsx`

### عند تعديل الأنماط:
- CSS عام: `src/index.css`
- Tailwind config: `tailwind.config.js`
- مكونات: `src/shared/components/*.tsx`

### عند إصلاح أخطاء:
- خطأ في البيانات: `src/db/`
- خطأ في الواجهة: `src/modules/` أو `src/shared/`
- خطأ في الترجمة: `src/locales/ar.json`

---

**تاريخ آخر تحديث**: 2026-04-21  
**نسخة الوثائق**: 1.0.0
