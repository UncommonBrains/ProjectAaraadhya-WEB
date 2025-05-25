import { useCallback, useEffect, useState } from 'react';
import { DocumentSnapshot } from 'firebase/firestore';
import { Pooja } from '../../models/entities/Pooja';
import { templePoojaService } from '../../services/templePoojaSerivice';
import { poojaService } from '../../services/poojaService';

export const usePoojasViewModel = () => {
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const PAGE_SIZE = 10;

  // Load initial Poojas
  const loadPoojas = useCallback(async () => {
    try {
      setLoading(true);
      setPoojas([]);
      setLastVisible(null);
      setHasMore(true);

      const result = await templePoojaService.queryPaginated(PAGE_SIZE, null, [
        {
          field: 'isActive',
          operator: '==',
          value: true,
        },
      ]);

      const poojasList = await Promise.all(
        result.data.map(async (doc) => {
          const poojaDetails = await poojaService.getById(doc.poojaId);
          return { ...doc, poojaDetails };
        }),
      );

      setPoojas(poojasList as Array<Pooja>);
      setLastVisible(result.lastVisible);
      setHasMore(result.hasMore);
      setError(null);
    } catch (err) {
      setError('Failed to load poojas');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load more Poojas (next page)
  const loadMorePoojas = async () => {
    if (!hasMore || !lastVisible || loadingMore) return;

    try {
      setLoadingMore(true);

      const result = await templePoojaService.queryPaginated(PAGE_SIZE, lastVisible, [
        {
          field: 'isActive',
          operator: '==',
          value: true,
        },
      ]);

      setPoojas((prevPoojas) => [...prevPoojas, ...result.data]);
      setLastVisible(result.lastVisible);
      setHasMore(result.hasMore);
    } catch (err) {
      setError('Failed to load more posts');
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadPoojas();
  }, [loadPoojas]);

  return {
    poojas,
    loading,
    loadingMore,
    hasMore,
    error,
    loadPoojas,
    loadMorePoojas,
  };
};
