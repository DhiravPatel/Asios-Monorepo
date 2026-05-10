import { useCallback, useEffect, useState } from 'react';
import api from '../api';

// Returns full product list (legacy — used by Dashboard for the count card)
export const useGetAllProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Use the lean projection — Dashboard only needs the count, not full docs.
      const response = await api.get('/product/getAllProducts', {
        params: { fields: '_id' },
      });
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

// Lean hook for the admin Product page — fetches ONLY the paginated product
// list. Reference data for filter/modal dropdowns (categories + subcategories)
// is fetched lazily by the page on demand via useGetAllCategories /
// useGetAllSubCategories.
export const useGetProductPageData = ({ page = 1, limit = 8, category, subcategory, q } = {}) => {
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
      if (subcategory) params.subcategory = subcategory;
      if (q) params.q = q;
      const response = await api.get('/product/page-data', { params });
      setData(response.data?.data ?? []);
      setTotal(response.data?.total ?? 0);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, category, subcategory, q]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    total,
    loading,
    error,
    refetch: fetchData,
  };
};

export const useAddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/product/addProduct', formData, {
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

export const useEditProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/product/editProduct/${id}`, formData, {
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

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/product/deleteProduct/${id}`);
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
