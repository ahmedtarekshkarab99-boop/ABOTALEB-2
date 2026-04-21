import React, { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { t } from '../../../lib/i18n';
import type { RawMaterial } from '../../../db/schema/warehouse';
import { useCreateRawMaterial, useUpdateRawMaterial } from '../hooks/useRawMaterials';

interface RawMaterialFormProps {
  item?: RawMaterial;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function RawMaterialForm({ item, onSuccess, onCancel }: RawMaterialFormProps) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    unit: item?.unit || 'kg',
    currentStockQty: item?.currentStockQty || 0,
    reorderThreshold: item?.reorderThreshold || 0,
    description: item?.description || '',
  });

  const createMutation = useCreateRawMaterial();
  const updateMutation = useUpdateRawMaterial();

  const isLoading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (item) {
      await updateMutation.mutateAsync({
        id: item.id,
        data: formData,
      });
    } else {
      await createMutation.mutateAsync(formData);
    }

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {t('warehouse.name')} *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          dir="rtl"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {t('warehouse.unit')} *
        </label>
        <input
          type="text"
          required
          value={formData.unit}
          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          dir="rtl"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {t('warehouse.currentStock')} *
        </label>
        <input
          type="number"
          step="0.01"
          required
          value={formData.currentStockQty}
          onChange={(e) => setFormData({ ...formData, currentStockQty: parseFloat(e.target.value) })}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          dir="ltr"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {t('warehouse.reorderThreshold')} *
        </label>
        <input
          type="number"
          step="0.01"
          required
          value={formData.reorderThreshold}
          onChange={(e) => setFormData({ ...formData, reorderThreshold: parseFloat(e.target.value) })}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          dir="ltr"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {t('warehouse.description')}
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          dir="rtl"
          rows={3}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          {t('common.cancel')}
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? t('common.loading') : t('common.save')}
        </Button>
      </div>
    </form>
  );
}
