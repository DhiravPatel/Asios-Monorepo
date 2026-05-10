import { useCallback, useEffect, useState } from 'react';
import api from '../api';

// Full-list fetch (used by dropdowns inside add/edit modals + filter selects).
// Pass `{ enabled: false }` to defer the request until the consumer is ready
// (e.g. only fetch when an Add modal opens or a filter dropdown is engaged).
export const useGetAllCategories = ({ enabled = true } = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/category/getAllCategories');
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

// Server-paginated category list — used by the admin Category table.
export const useGetCategories = ({ page = 1, limit = 8, q } = {}) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit };
      if (q) params.q = q;
      const response = await api.get('/category/getAllCategories', { params });
      setData(response.data?.data ?? []);
      setTotal(response.data?.total ?? 0);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, q]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, total, loading, error, refetch: fetchData };
};

export const useAddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/category/addCategory', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
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

export const useEditCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/category/editCategory/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
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

export const useDeleteCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/category/deleteCategory/${id}`);
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
