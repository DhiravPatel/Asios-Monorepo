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

export const useGetProductBySubCategory = (subcategory) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!subcategory) {
      setData([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    const encoded = encodeURIComponent(subcategory);
    api
      .get(`/product/getProductBySubCategory/${encoded}`)
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
  }, [subcategory]);

  return { data, loading, error };
};
