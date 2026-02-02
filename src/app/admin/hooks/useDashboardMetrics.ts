import { useMemo } from "react";
import { useProperties, useTours, useInquiries } from "./useAdminData";

export const useDashboardMetrics = () => {
  const { data: properties, isLoading: loadingProperties } = useProperties();
  const { data: toursData, isLoading: loadingTours } = useTours();
  const { data: inquiries, isLoading: loadingInquiries } = useInquiries();

  const isLoading = loadingProperties || loadingTours || loadingInquiries;

  const metrics = useMemo(() => {
    const totalProperties = properties?.length ?? 0;

    const availableUnits =
      properties?.filter((p) => p.sold !== true).length ?? 0;

    const now = new Date();

    const upcomingTours =
      toursData?.data.filter((t) => new Date(t.tourTime) > now).length ?? 0;

    // Dummy for now (as requested)
    const newRequests = 0;

    return {
      totalProperties,
      availableUnits,
      upcomingTours,
      newRequests,
    };
  }, [properties, toursData]);

  return {
    metrics,
    isLoading,
  };
};