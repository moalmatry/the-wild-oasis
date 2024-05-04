import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

export const useSettings = () => {
  const {
    isPending,
    errors,
    data: settings,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  return { isPending, errors, settings };
};
