import { useCallback, useEffect, useState } from 'react';
import api from '../api';

// Pass `{ enabled: false }` to defer fetching until a consumer opens
// (e.g. only fetch once the Add Catalogue / Add Sub-Category modal opens).
export const useGetAllCatalogueCategory = ({ enabled = true } = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/catalogue-category/getAllCatalogueCategory');
      setData(response.data?.data ?? []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) fetchData();
  }, [enabled, fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export const useAddCatalogueCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/catalogue-category/AddCatalogueCategory', payload);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { mutate, loading, error };
};
