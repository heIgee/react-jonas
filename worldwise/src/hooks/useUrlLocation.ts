import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useUrlLocation = () => {
  const [searchParams] = useSearchParams();

  const lat = useMemo(
    () => Number(searchParams.get('lat')) || null,
    [searchParams],
  );
  const lng = useMemo(
    () => Number(searchParams.get('lng')) || null,
    [searchParams],
  );

  return lat && lng ? { lat, lng } : null;
};
