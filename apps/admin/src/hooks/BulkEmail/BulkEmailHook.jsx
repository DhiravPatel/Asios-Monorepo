import axios from 'axios';
import { useCallback, useState } from 'react';

export const useSendBulkEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async ({ subject, emails, message }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(process.env.REACT_APP_EMAIL_SERVER, {
        subject,
        emails,
        message,
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
