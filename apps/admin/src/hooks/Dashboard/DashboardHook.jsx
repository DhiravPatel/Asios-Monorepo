import { useCallback, useEffect, useState } from 'react';
import api from '../api';

// Single endpoint that returns counts + recent inquiries.
// Replaces 7 separate list calls the old Dashboard was making.
export const useGetDashboardStats = () => {
  const [data, setData] = useState({
    counts: {
      products: 0,
      categories: 0,
      subcategories: 0,
      catalogues: 0,
      inquiries: 0,
      productInquiries: 0,
    },
    recentInquiries: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/dashboard/stats');
      if (response.data?.data) setData(response.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
