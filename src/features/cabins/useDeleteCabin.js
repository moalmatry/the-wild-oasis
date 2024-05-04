import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { isPending, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      toast.success('cabin successfully deleted');
    },
    onError: (err) => toast.error(err.message),
  });

  return { isPending, deleteCabin };
};
