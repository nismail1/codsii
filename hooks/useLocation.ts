import { useCallback, useEffect, useState } from 'react';
import {
  getCurrentCoordinates,
  getLocationPermissionStatus,
  requestLocationPermission,
  type LocationPermissionStatus,
} from '../services/location';
import { useEmergencyStore } from '../store/useEmergencyStore';
import type { Coordinates } from '../types';

export function useLocation() {
  const [permission, setPermission] = useState<LocationPermissionStatus>('undetermined');
  const [loading, setLoading] = useState(false);
  const setGpsStatus = useEmergencyStore((s) => s.setGpsStatus);
  const setLastKnownLocation = useEmergencyStore((s) => s.setLastKnownLocation);
  const lastKnownLocation = useEmergencyStore((s) => s.lastKnownLocation);

  const refreshPermission = useCallback(async () => {
    const status = await getLocationPermissionStatus();
    setPermission(status);
    setGpsStatus(status === 'granted' ? 'active' : 'unavailable');
    return status;
  }, [setGpsStatus]);

  const requestPermission = useCallback(async () => {
    const status = await requestLocationPermission();
    setPermission(status);
    setGpsStatus(status === 'granted' ? 'active' : 'unavailable');
    return status;
  }, [setGpsStatus]);

  const refreshLocation = useCallback(async (): Promise<Coordinates | null> => {
    setLoading(true);
    try {
      const coords = await getCurrentCoordinates();
      if (coords) {
        setLastKnownLocation(coords);
        setGpsStatus('active');
        setPermission('granted');
      } else {
        setGpsStatus('unavailable');
      }
      return coords;
    } finally {
      setLoading(false);
    }
  }, [setGpsStatus, setLastKnownLocation]);

  useEffect(() => {
    void refreshPermission().then((status) => {
      if (status === 'granted') {
        void refreshLocation();
      }
    });
  }, [refreshPermission, refreshLocation]);

  return {
    permission,
    loading,
    location: lastKnownLocation,
    refreshPermission,
    requestPermission,
    refreshLocation,
  };
}
