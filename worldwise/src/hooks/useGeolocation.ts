import { useState } from 'react';

export const useGeolocation = (
  defaultPosition: { lat: number; lng: number } | null = null,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getLocation() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation');

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }

  return { isLoading, location, error, getLocation };
};
