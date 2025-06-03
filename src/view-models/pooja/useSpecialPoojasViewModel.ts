import { useCallback, useEffect, useState } from 'react';
import { DocumentSnapshot } from 'firebase/firestore';
import { Pooja } from '../../models/entities/Pooja';
import { templePoojaService } from '../../services/templePoojaSerivice';
import { poojaService } from '../../services/poojaService';
import { templeService } from '../../services/templeService';
import { ScheduleMode } from '../../models/entities/Pooja';

export const useSpecialPoojasViewModel = () => {
  const [specialPoojas, setSpecialPoojas] = useState<Pooja[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [isSearchResult, setIsSearchResult] = useState<boolean>(false);

  const PAGE_SIZE = 10;

  // Load initial Poojas
  const loadSpecialPoojas = useCallback(async () => {
    try {
      setLoading(true);
      setSpecialPoojas([]);
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
          value: ScheduleMode.once,
        },
        {
          field: 'poojaDateAndTime',
          operator: '>=',
          value: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
        },
      ]);

      const poojasList = await Promise.all(
        result.data.map(async (doc) => {
          const poojaDetails = await poojaService.getById(doc.poojaId);
          const templeDetails = await templeService.getById(doc.templeId);
          return { ...doc, poojaDetails, templeDetails };
        }),
      );

      setSpecialPoojas(poojasList as Array<Pooja>);
      setLastVisible(result.lastVisible);
      setHasMore(result.hasMore);
      setIsSearchResult(false);
      setError(null);
    } catch (err) {
      setError('Failed to load specialPoojas');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load more Poojas (next page)
  const loadMoreSpecialPoojas = async () => {
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
          value: ScheduleMode.once,
        },
        {
          field: 'poojaDateAndTime',
          operator: '>=',
          value: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
        },
      ]);

      const poojasList = await Promise.all(
        result.data.map(async (doc) => {
          const poojaDetails = await poojaService.getById(doc.poojaId);
          const templeDetails = await templeService.getById(doc.templeId);
          return { ...doc, poojaDetails, templeDetails };
        }),
      );

      setSpecialPoojas((prevPoojas) => [...prevPoojas, ...(poojasList as Array<Pooja>)]);
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

  const searchSpecialPoojas = async (searchTerm: string) => {
    try {
      setSearchTerm(searchTerm);
      setLoading(true);
      setSpecialPoojas([]);
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
          value: ScheduleMode.once,
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

      setSpecialPoojas(poojasList as Array<Pooja>);
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

  const loadMoreSpecialPoojasSeachResults = async () => {
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
          value: ScheduleMode.once,
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

      setSpecialPoojas((prevPoojas) => [...prevPoojas, ...(poojasList as Array<Pooja>)]);
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
    loadSpecialPoojas();
  }, [loadSpecialPoojas]);

  return {
    specialPoojas,
    loading,
    loadingMore,
    hasMore,
    isSearchResult,
    error,
    loadSpecialPoojas,
    loadMoreSpecialPoojas,
    searchSpecialPoojas,
    loadMoreSpecialPoojasSeachResults,
  };
};
