import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { warehouseRepo } from '../../../db/repositories/warehouseRepo';
import type { NewFinishedProduct } from '../../../db/schema/warehouse';

export function useFinishedProducts() {
  return useQuery({
    queryKey: ['finishedProducts'],
    queryFn: () => warehouseRepo.getFinishedProducts(),
  });
}

export function useCreateFinishedProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewFinishedProduct) => warehouseRepo.createFinishedProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finishedProducts'] });
    },
  });
}

export function useUpdateFinishedProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<NewFinishedProduct> }) =>
      warehouseRepo.updateFinishedProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finishedProducts'] });
    },
  });
}

export function useDeleteFinishedProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => warehouseRepo.deleteFinishedProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finishedProducts'] });
    },
  });
}
