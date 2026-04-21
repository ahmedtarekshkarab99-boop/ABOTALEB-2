import React, { useState } from 'react';
import { t } from '../../lib/i18n';
import { Button } from '../../shared/components/Button';
import { RawMaterialsGrid } from './components/RawMaterialsGrid';
import { RawMaterialForm } from './components/RawMaterialForm';
import type { RawMaterial } from '../../db/schema/warehouse';

export function WarehouseModule() {
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RawMaterial | undefined>();
  const [activeTab, setActiveTab] = useState<'raw' | 'finished'>('raw');

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedItem(undefined);
  };

  const handleEdit = (item: RawMaterial) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {t('warehouse.title')}
        </h1>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('raw')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'raw'
              ? 'bg-primary-600 text-white'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          {t('warehouse.rawMaterials')}
        </button>
        <button
          onClick={() => setActiveTab('finished')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'finished'
              ? 'bg-primary-600 text-white'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          {t('warehouse.finishedProducts')}
        </button>
      </div>

      {!showForm && (
        <div className="mb-6">
          <Button onClick={() => setShowForm(true)}>
            {activeTab === 'raw'
              ? t('warehouse.addRawMaterial')
              : t('warehouse.addFinishedProduct')}
          </Button>
        </div>
      )}

      {showForm && (
        <div className="mb-8 p-6 bg-white rounded-lg border border-slate-200">
          <h2 className="text-xl font-semibold mb-4 text-slate-900">
            {selectedItem
              ? activeTab === 'raw'
                ? `${t('warehouse.edit')} ${t('warehouse.rawMaterials')}`
                : `${t('warehouse.edit')} ${t('warehouse.finishedProducts')}`
              : activeTab === 'raw'
              ? t('warehouse.addRawMaterial')
              : t('warehouse.addFinishedProduct')}
          </h2>
          <RawMaterialForm
            item={selectedItem}
            onSuccess={handleFormClose}
            onCancel={handleFormClose}
          />
        </div>
      )}

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        {activeTab === 'raw' && (
          <RawMaterialsGrid onEdit={handleEdit} />
        )}
        {activeTab === 'finished' && (
          <div className="text-center text-slate-500 py-8">
            {t('common.noData')}
          </div>
        )}
      </div>
    </div>
  );
}
