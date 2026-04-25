import { useEffect, useState } from 'react';
import api from '../api';

export const useGetSubCategoriesByCategory = (category) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) {
      setData([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .get(`/subcategory/getAllSubCategoriesByCategory/${category}`)
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
  }, [category]);

  return { data, loading, error };
};
