import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { warehouseRepo } from '../../../db/repositories/warehouseRepo';
import type { NewRawMaterial } from '../../../db/schema/warehouse';

export function useRawMaterials() {
  return useQuery({
    queryKey: ['rawMaterials'],
    queryFn: () => warehouseRepo.getRawMaterials(),
  });
}

export function useCreateRawMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewRawMaterial) => warehouseRepo.createRawMaterial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rawMaterials'] });
    },
  });
}

export function useUpdateRawMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<NewRawMaterial> }) =>
      warehouseRepo.updateRawMaterial(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rawMaterials'] });
    },
  });
}

export function useDeleteRawMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => warehouseRepo.deleteRawMaterial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rawMaterials'] });
    },
  });
}
