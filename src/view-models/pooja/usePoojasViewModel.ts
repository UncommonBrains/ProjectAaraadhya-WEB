import { useCallback, useEffect, useState } from 'react';
import { DocumentSnapshot } from 'firebase/firestore';
import { Pooja } from '../../models/entities/Pooja';
import { templePoojaService } from '../../services/templePoojaSerivice';
import { poojaService } from '../../services/poojaService';
import { templeService } from '../../services/templeService';
import { ScheduleMode } from '../../models/entities/Pooja';

export const usePoojasViewModel = () => {
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [isSearchResult, setIsSearchResult] = useState<boolean>(false);

  const PAGE_SIZE = 12;

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
        {
          field: 'scheduleMode',
          operator: '==',
          value: ScheduleMode.repeat,
        },
      ]);

      const poojasList = await Promise.all(
        result.data.map(async (doc) => {
          const poojaDetails = await poojaService.getById(doc.poojaId);
          const templeDetails = await templeService.getById(doc.templeId);
          return { ...doc, poojaDetails, templeDetails };
        }),
      );

      setPoojas(poojasList as Array<Pooja>);
      setLastVisible(result.lastVisible);
      setHasMore(result.hasMore);
      setIsSearchResult(false);
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
        {
          field: 'scheduleMode',
          operator: '==',
          value: ScheduleMode.repeat,
        },
      ]);

      const poojasList = await Promise.all(
        result.data.map(async (doc) => {
          const poojaDetails = await poojaService.getById(doc.poojaId);
          const templeDetails = await templeService.getById(doc.templeId);
          return { ...doc, poojaDetails, templeDetails };
        }),
      );

      setPoojas((prevPoojas) => [...prevPoojas, ...(poojasList as Array<Pooja>)]);
      setLastVisible(result.lastVisible);
      setHasMore(result.hasMore);
      setIsSearchResult(false);
      setError(null);
    } catch (err) {
      setError('Failed to load more posts');
    } finally {
      setLoadingMore(false);
    }
  };

  const searchPoojas = async (searchTerm: string) => {
    try {
      setSearchTerm(searchTerm);
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
        {
          field: 'scheduleMode',
          operator: '==',
          value: ScheduleMode.repeat,
        },
        {
          field: 'keywords',
          operator: 'array-contains',
          value: searchTerm,
        },
      ]);

      const poojasList = await Promise.all(
        result.data.map(async (doc) => {
          const poojaDetails = await poojaService.getById(doc.poojaId);
          const templeDetails = await templeService.getById(doc.templeId);
          return { ...doc, poojaDetails, templeDetails };
        }),
      );

      setPoojas(poojasList as Array<Pooja>);
      setLastVisible(result.lastVisible);
      setHasMore(result.hasMore);
      setIsSearchResult(true);
      setError(null);
    } catch (err) {
      setError('Failed to load poojas');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreSeachResults = async () => {
    if (!hasMore || !lastVisible || loadingMore) return;

    try {
      setLoadingMore(true);

      const result = await templePoojaService.queryPaginated(PAGE_SIZE, lastVisible, [
        {
          field: 'isActive',
          operator: '==',
          value: true,
        },
        {
          field: 'scheduleMode',
          operator: '==',
          value: ScheduleMode.repeat,
        },
        {
          field: 'keywords',
          operator: 'array-contains',
          value: searchTerm,
        },
      ]);

      const poojasList = await Promise.all(
        result.data.map(async (doc) => {
          const poojaDetails = await poojaService.getById(doc.poojaId);
          const templeDetails = await templeService.getById(doc.templeId);
          return { ...doc, poojaDetails, templeDetails };
        }),
      );

      setPoojas((prevPoojas) => [...prevPoojas, ...(poojasList as Array<Pooja>)]);
      setLastVisible(result.lastVisible);
      setHasMore(result.hasMore);
      setIsSearchResult(true);
      setError(null);
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
    isSearchResult,
    error,
    loadPoojas,
    loadMorePoojas,
    searchPoojas,
    loadMoreSeachResults,
  };
};
