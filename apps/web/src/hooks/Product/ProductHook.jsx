import { useEffect, useState } from 'react';
import api from '../api';

export const useGetProductById = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setData(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .get(`/product/getProductById/${id}`)
      .then((res) => {
        if (!cancelled) setData(res.data?.data ?? null);
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
  }, [id]);

  return { data, loading, error };
};

export const useGetProductsBySubCategoryId = (subcategoryId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!subcategoryId) {
      setData([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .get('/product/getAllProducts', { params: { subcategory: subcategoryId } })
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
  }, [subcategoryId]);

  return { data, loading, error };
};
