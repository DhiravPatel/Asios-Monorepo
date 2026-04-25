import { useCallback, useEffect, useState } from 'react';
import api from '../api';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/user/login', { email, password });
      setData(response.data);
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { mutate, loading, error, data };
};

export const useValidateToken = () => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsValid(false);
      return;
    }
    let cancelled = false;
    api
      .get('/protected')
      .then((res) => {
        if (cancelled) return;
        if (Object.prototype.hasOwnProperty.call(res.data || {}, 'sucess')) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setIsValid(false);
        localStorage.removeItem('token');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { isValid };
};
