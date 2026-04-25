import { useCallback, useEffect, useState } from 'react';
import api from '../api';

export const useGetAllSubCategories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/subcategory/getAllSubCategories');
      setData(response.data?.data ?? []);
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

export const useGetSubCategoriesByCategoryId = (categoryId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) {
      setData([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .get('/subcategory/getAllSubCategories', { params: { category: categoryId } })
      .then((res) => {
        if (!cancelled) setData(res.data?.data ?? []);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  return { data, loading, error };
};
