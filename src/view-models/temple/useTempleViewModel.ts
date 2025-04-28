import { useCallback, useEffect, useState } from 'react';
import { Temple } from '../../models/entities/Temple';
import { templeService } from '../../services/templeService';
import { useNavigate, useParams } from 'react-router-dom';

export const useTempleViewModel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [temple, setTemple] = useState<Temple | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTemple = useCallback(async (templeId: string) => {
    setLoading(true);
    setError(null);
    try {
      const templeData = await templeService.getById(templeId);
      setTemple(templeData);
    } catch (err) {
      setError('Failed to fetch temple data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    id ? fetchTemple(id) : navigate(-1);
  }, [fetchTemple, id]);

  return {
    temple,
    loading,
    error,
    fetchTemple,
  };
};
