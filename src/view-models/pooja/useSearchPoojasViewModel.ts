import { useCallback, useEffect, useState } from 'react';
import { DocumentSnapshot } from 'firebase/firestore';
import { Pooja } from '../../models/entities/Pooja';
import { templePoojaService } from '../../services/templePoojaSerivice';
import { poojaService } from '../../services/poojaService';
import { templeService } from '../../services/templeService';

export const useSearchPoojasViewModel = () => {
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const PAGE_SIZE = 12;

  // Load initial Poojas based on search term
  const loadPoojas = useCallback(async (searchQuery: string = '') => {
    try {
      setLoading(true);
      setPoojas([]);
      setLastVisible(null);
      setHasMore(true);

      const filters: Array<{ field: string; operator: '==' | 'array-contains'; value: any }> = [
        {
          field: 'isActive',
          operator: '==',
          value: true,
        }
      ];

      // Add search filter only if search term exists
      if (searchQuery.trim()) {
        filters.push({
          field: 'keywords',
          operator: 'array-contains',
          value: searchQuery.trim() ? searchQuery.toLowerCase().trim() !== '' : false,
        });
      }

      const result = await templePoojaService.queryPaginated(PAGE_SIZE, null, filters);

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
      setError(null);
    } catch (err) {
      setError('Failed to load poojas');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load more Poojas (next page) with current search term
  const loadMorePoojas = async () => {
    if (!hasMore || !lastVisible || loadingMore) return;

    try {
      setLoadingMore(true);

      const filters = [
        {
          field: 'isActive',
          operator: '==',
          value: true,
        }
      ];

      // Add search filter only if search term exists
      if (searchTerm.trim()) {
        filters.push({
          field: 'keywords',
          operator: 'array-contains',
          value: searchTerm.trim() !== '',
        });
      }

      const result = await templePoojaService.queryPaginated(PAGE_SIZE, lastVisible, filters as Array<{ field: string; operator: '==' | 'array-contains'; value: any }>);

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
    } catch (err) {
      setError('Failed to load more poojas');
      console.error('Load more error:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Handle search term change
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    loadPoojas(term);
  }, [loadPoojas]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    loadPoojas('');
  }, [loadPoojas]);

  // Initial load
  useEffect(() => {
    loadPoojas();
  }, [loadPoojas]);

  return {
    poojas,
    searchTerm,
    loading,
    loadingMore,
    hasMore,
    error,
    loadPoojas,
    loadMorePoojas,
    handleSearch,
    clearSearch,
    setSearchTerm
  };
};