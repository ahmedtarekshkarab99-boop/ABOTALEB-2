import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataGrid } from '../../../shared/components/DataGrid';
import { Button } from '../../../shared/components/Button';
import { t } from '../../../lib/i18n';
import type { RawMaterial } from '../../../db/schema/warehouse';
import { useRawMaterials, useDeleteRawMaterial } from '../hooks/useRawMaterials';

interface RawMaterialsGridProps {
  onEdit?: (item: RawMaterial) => void;
}

export function RawMaterialsGrid({ onEdit }: RawMaterialsGridProps) {
  const { data: materials = [], isLoading } = useRawMaterials();
  const deleteMutation = useDeleteRawMaterial();

  const columns: ColumnDef<RawMaterial>[] = [
    {
      accessorKey: 'name',
      header: t('warehouse.name'),
    },
    {
      accessorKey: 'unit',
      header: t('warehouse.unit'),
    },
    {
      accessorKey: 'currentStockQty',
      header: t('warehouse.currentStock'),
      cell: ({ getValue }) => (getValue() as number).toFixed(2),
    },
    {
      accessorKey: 'reorderThreshold',
      header: t('warehouse.reorderThreshold'),
      cell: ({ getValue }) => (getValue() as number).toFixed(2),
    },
    {
      id: 'actions',
      header: t('warehouse.actions'),
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit?.(row.original)}
          >
            {t('warehouse.edit')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700"
            onClick={() => deleteMutation.mutate(row.original.id)}
          >
            {t('warehouse.delete')}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataGrid
      columns={columns}
      data={materials}
      isLoading={isLoading}
      emptyMessage={t('common.noData')}
    />
  );
}
