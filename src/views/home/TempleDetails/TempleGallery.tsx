import React, { useState } from 'react';
import { Image } from 'lucide-react';
import { useTempleGalleryViewModel } from '../../../view-models/temple/useTempleGalleryViewModel';
import { GrClose, GrNext, GrPrevious } from 'react-icons/gr';

const TempleGallery: React.FC = () => {
  const { gallery, loading, loadingMore, hasMore, loadMore } = useTempleGalleryViewModel();

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? gallery.length - 1 : prevIndex - 1));
  };

  return (
    <div className="space-y-4">
      <h3 className="mb-2 font-serif text-lg text-amber-900 md:text-xl">Temple Gallery</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {!loading &&
          gallery.map((image, index) => (
            <div
              key={index}
              className="relative flex h-40 items-center justify-center rounded-lg bg-amber-100 bg-cover bg-center md:h-52"
              style={{ backgroundImage: `url(${image.url})` }}
              onClick={() => openModal(index)}
            />
          ))}
        {loading ||
          (loadingMore &&
            Array.from({ length: loading ? 3 : 1 }).map((_, index) => (
              <div
                key={index}
                className="relative flex h-40 animate-pulse rounded-lg bg-amber-100"
              />
            )))}
      </div>
      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-3 flex w-full items-center justify-center rounded-lg bg-amber-100 px-4 py-3 text-sm font-medium text-amber-900 md:text-base"
        >
          <Image className="mr-2 h-4 w-4" />
          View All Photos
        </button>
      )}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <button className="absolute top-4 right-4 text-3xl text-white" onClick={closeModal}>
            <GrClose />
          </button>

          <button className="absolute left-4 text-4xl text-white" onClick={prevImage}>
            <GrPrevious />
          </button>

          <img
            src={gallery[currentIndex].url}
            alt={`Image ${currentIndex + 1}`}
            className="max-h-[80vh] max-w-[90vw] rounded-lg"
          />

          <button className="absolute right-4 text-4xl text-white" onClick={nextImage}>
            <GrNext />
          </button>
        </div>
      )}
    </div>
  );
};

export default TempleGallery;
