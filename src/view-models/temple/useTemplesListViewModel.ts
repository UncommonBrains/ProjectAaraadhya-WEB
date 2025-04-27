import { useCallback, useEffect, useState } from 'react';
import { Temple } from '../../models/entities/Temple';
import { DocumentSnapshot } from 'firebase/firestore';
import { templeService } from '../../services/templeService';

export const useTemplesListViewModel = () => {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const PAGE_SIZE = 10;

  // Load initial temples
  const loadTemples = useCallback(async () => {
    try {
      setLoading(true);
      setTemples([]);
      setLastVisible(null);
      setHasMore(true);

      const result = await templeService.queryPaginated(PAGE_SIZE);

      setTemples(result.data);
      setLastVisible(result.lastVisible);
      setHasMore(result.hasMore);
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load more temples (next page)
  const loadMoreTemples = async () => {
    if (!hasMore || !lastVisible || loadingMore) return;

    try {
      setLoadingMore(true);

      const result = await templeService.queryPaginated(PAGE_SIZE, lastVisible);

      setTemples((prevPosts) => [...prevPosts, ...result.data]);
      setLastVisible(result.lastVisible);
      setHasMore(result.hasMore);
    } catch (err) {
      console.error('Error fetching more posts:', err);
      setError('Failed to load more posts');
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadTemples();
  }, [loadTemples]);

  return {
    temples,
    loading,
    loadingMore,
    hasMore,
    error,
    loadTemples,
    loadMoreTemples,
  };
};
