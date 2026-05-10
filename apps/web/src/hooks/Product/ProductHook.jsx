import { useEffect, useState } from 'react';
import api from '../api';
import { dedupedFetch } from '../requestCache';

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
    dedupedFetch(`product:${id}`, () =>
      api.get(`/product/getProductById/${id}`).then((res) => res.data?.data ?? null)
    )
      .then((v) => { if (!cancelled) setData(v); })
      .catch((err) => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
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
    dedupedFetch(`products:sub:${subcategoryId}`, () =>
      api
        .get('/product/getAllProducts', {
          // Trim payload — list view doesn't need the heavy `details` JSON.
          params: {
            subcategory: subcategoryId,
            fields: 'productName,image,category,subcategory,createdAt',
          },
        })
        .then((res) => res.data?.data ?? [])
    )
      .then((v) => { if (!cancelled) setData(v); })
      .catch((err) => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [subcategoryId]);

  return { data, loading, error };
};
