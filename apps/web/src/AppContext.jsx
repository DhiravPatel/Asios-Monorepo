import React, { createContext, useEffect, useMemo, useState } from 'react';
import api from './hooks/api';
import { dedupedFetch } from './hooks/requestCache';

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
  const [categoriesReady, setCategoriesReady] = useState(
    () => typeof window !== 'undefined' && !!localStorage.getItem('asios_categories')
  );
  const [subcategoriesReady, setSubcategoriesReady] = useState(
    () => typeof window !== 'undefined' && !!localStorage.getItem('asios_subcategories')
  );

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      dedupedFetch('categories:all', () =>
        api.get('/category/getAllCategories').then((r) => r.data?.data ?? [])
      ),
      dedupedFetch('subcategories:all', () =>
        api.get('/subcategory/getAllSubCategories').then((r) => r.data?.data ?? [])
      ),
    ])
      .then(([cats, subs]) => {
        if (cancelled) return;
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
      .catch(() => {})
      .finally(() => {
        if (cancelled) return;
        setCategoriesReady(true);
        setSubcategoriesReady(true);
      });
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
      categoriesReady,
      subcategoriesReady,
    }),
    [categories, subcategories, categoryById, subcategoryById, footerData, categoriesReady, subcategoriesReady]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
