import { useCallback, useEffect, useState } from 'react';
import api from '../api';

// Full-list fetch (used by web + dropdowns).
export const useGetAllCatalogue = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/catalogue/getAllCatalogue');
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

// Lean hook for the admin Catalogue page — fetches ONLY the paginated
// catalogue list. Catalogue-category and catalogue-subcategory lists used by
// the modals are fetched lazily via useGetAllCatalogueCategory /
// useGetAllCatalogueSubCategory.
export const useGetCataloguePageData = ({
  page = 1,
  limit = 8,
  cataloguecategory,
  cataloguesubcategory,
  q,
} = {}) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit };
      if (cataloguecategory) params.cataloguecategory = cataloguecategory;
      if (cataloguesubcategory) params.cataloguesubcategory = cataloguesubcategory;
      if (q) params.q = q;
      const response = await api.get('/catalogue/page-data', { params });
      setData(response.data?.data ?? []);
      setTotal(response.data?.total ?? 0);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, cataloguecategory, cataloguesubcategory, q]);

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

export const useAddCatalogue = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/catalogue/addCatalogue', formData, {
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

export const useEditCatalogue = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/catalogue/editCatalogue/${id}`, formData, {
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

export const useDeleteCatalogue = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/catalogue/deleteCatalogue/${id}`);
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
