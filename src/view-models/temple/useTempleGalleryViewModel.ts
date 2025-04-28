import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Gallery } from '../../models/entities/Gallery';
import { templeGalleryService } from '../../services/templeGalleryService';
import { DocumentSnapshot } from 'firebase/firestore';

export const useTempleGalleryViewModel = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const PAGE_SIZE = 6;

  const loadGallery = useCallback(async () => {
    try {
      setLoading(true);
      setGallery([]);
      setLastVisible(null);
      setHasMore(true);

      const result = await templeGalleryService(id).queryPaginated(PAGE_SIZE, null, [], {
        field: 'uploadedAt',
        direction: 'desc',
      });

      setGallery(result.data);
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

  // Load more Gallery Items (next page)
  const loadMore = async () => {
    if (!hasMore || !lastVisible || loadingMore) return;

    try {
      setLoadingMore(true);

      const result = await templeGalleryService(id).queryPaginated(PAGE_SIZE, lastVisible, [], {
        field: 'uploadedAt',
        direction: 'desc',
      });

      setGallery((prevPosts) => [...prevPosts, ...result.data]);
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
    id && loadGallery();
  }, [loadGallery, id]);

  return {
    gallery,
    loading,
    loadingMore,
    hasMore,
    error,
    loadGallery,
    loadMore,
  };
};
