import React, { createContext, useEffect, useMemo, useState } from 'react';
import api from './hooks/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    const cached = typeof window !== 'undefined' && localStorage.getItem('asios_categories');
    return cached ? JSON.parse(cached) : [];
  });
  const [subcategories, setSubcategories] = useState(() => {
    const cached = typeof window !== 'undefined' && localStorage.getItem('asios_subcategories');
    return cached ? JSON.parse(cached) : [];
  });
  const [footerData, setFooterData] = useState(() => {
    const cached = typeof window !== 'undefined' && localStorage.getItem('footerData');
    return cached ? JSON.parse(cached) : [];
  });

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      api.get('/category/getAllCategories'),
      api.get('/subcategory/getAllSubCategories'),
    ])
      .then(([catRes, subRes]) => {
        if (cancelled) return;
        const cats = catRes.data?.data ?? [];
        const subs = subRes.data?.data ?? [];
        setCategories(cats);
        setSubcategories(subs);
        setFooterData(cats);
        try {
          localStorage.setItem('asios_categories', JSON.stringify(cats));
          localStorage.setItem('asios_subcategories', JSON.stringify(subs));
          localStorage.setItem('footerData', JSON.stringify(cats));
        } catch {
          // ignore quota errors
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const categoryById = useMemo(() => {
    const map = new Map();
    for (const c of categories) map.set(c._id, c);
    return map;
  }, [categories]);

  const subcategoryById = useMemo(() => {
    const map = new Map();
    for (const s of subcategories) map.set(s._id, s);
    return map;
  }, [subcategories]);

  const value = useMemo(
    () => ({
      categories,
      subcategories,
      categoryById,
      subcategoryById,
      footerData,
      setFooterData,
    }),
    [categories, subcategories, categoryById, subcategoryById, footerData]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
