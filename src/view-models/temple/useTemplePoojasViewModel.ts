import { useCallback, useEffect, useState } from 'react';
import { Pooja } from '../../models/entities/Pooja';
import { useParams } from 'react-router-dom';
import { templePoojaService } from '../../services/templePoojaSerivice';
import { poojaService } from '../../services/poojaService';

export const useTemplePoojasViewModel = () => {
  const { id } = useParams();
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPoojas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const templePoojas = await templePoojaService.query([
        {
          field: 'templeId',
          operator: '==',
          value: id,
        },
      ]);

      const poojasList = await Promise.all(
        templePoojas.map(async (doc) => {
          const poojaDetails = await poojaService.getById(doc.poojaId);
          return { ...doc, poojaDetails };
        }),
      );

      setPoojas(poojasList as Array<Pooja>);
    } catch (err) {
      setError('Failed to fetch temple data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPoojas();
  }, [fetchPoojas]);

  return {
    poojas,
    loading,
    error,
    fetchPoojas,
  };
};
