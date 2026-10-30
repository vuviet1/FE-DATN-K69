/**
 * @file hooks/index.ts
 * @description Hook quản lý dữ liệu Dashboard theo chuẩn Mes-Client-ES
 */

import type {
  IDashboardOverview,
  IStudentAlertItem,
  ITeachingActivity,
} from '@domain/models';
import api from '@infra/api';
import { useCallback, useState } from 'react';

export const useDashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [overview, setOverview] = useState<IDashboardOverview | null>(null);
  const [activities, setActivities] = useState<ITeachingActivity[]>([]);
  const [alerts, setAlerts] = useState<IStudentAlertItem[]>([]);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [ovData, actData, alertData] = await Promise.allSettled([
        api.dashboardApi.getOverviewApi(),
        api.dashboardApi.getActivitiesApi(),
        api.dashboardApi.getAlertsApi(),
      ]);

      if (ovData.status === 'fulfilled') setOverview(ovData.value);
      if (actData.status === 'fulfilled') setActivities(actData.value);
      if (alertData.status === 'fulfilled') setAlerts(alertData.value);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    overview,
    activities,
    alerts,
    fetchDashboardData,
  };
};

export default useDashboard;
