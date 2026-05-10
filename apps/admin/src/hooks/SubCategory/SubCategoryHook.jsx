import { useCallback, useEffect, useState } from 'react';
import api from '../api';

// Full-list fetch — used by dropdown filters in modals.
// Pass `{ enabled: false }` to defer until the consumer is ready (e.g. only
// fetch once the Add Product modal opens).
export const useGetAllSubCategories = ({ enabled = true } = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(enabled);
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
    if (enabled) fetchData();
  }, [enabled, fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Lean hook for the admin SubCategory (Type) page — fetches ONLY the paginated
// subcategory list. The categories list (for filter dropdown / add modal) is
// fetched lazily by the page via useGetAllCategories.
export const useGetSubCategoryPageData = ({ page = 1, limit = 8, category, q } = {}) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit };
      if (category) params.category = category;
      if (q) params.q = q;
      const response = await api.get('/subcategory/page-data', { params });
      setData(response.data?.data ?? []);
      setTotal(response.data?.total ?? 0);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, category, q]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, total, loading, error, refetch: fetchData };
};

export const useAddSubCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/subcategory/addSubCategory', formData, {
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

export const useEditSubCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/subcategory/editSubCategory/${id}`, formData, {
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

export const useDeleteSubCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/subcategory/deleteSubCategory/${id}`);
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
