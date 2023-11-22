import { useState } from "react";

interface TRgeolocation {
  getPosition: void,
  position: {lat: string, lng: string},
  isLoading: boolean,
  error: null | string
}

export function useGeolocation(): TRgeolocation {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function getPosition(): void {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { getPosition, position, isLoading, error };
}
