import { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reviewData: {
    rating: number;
    title: string;
    review: string;
  }) => void;
}

const ReviewModal = ({ isOpen, onClose, onSubmit }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  // Control body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save the current overflow value
      const originalStyle = window.getComputedStyle(document.body).overflow;
      // Prevent scrolling on the background
      document.body.style.overflow = 'hidden';
      
      // Restore scrolling when component unmounts or modal closes
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, title, review });
    setRating(0);
    setTitle('');
    setReview('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative mx-4 max-h-[90vh] w-full max-w-md overflow-auto rounded-lg bg-white p-6 shadow-xl">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="mb-6 font-serif text-xl text-amber-900">Write a Review</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Your Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star 
                    className={`h-8 w-8 ${
                      (hoveredRating || rating) >= star 
                        ? 'fill-amber-500 text-amber-500' 
                        : 'fill-amber-100 text-amber-200'
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Review Title */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
              Review Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              className="w-full rounded-lg border border-amber-200 p-3 text-sm focus:border-orange-500 focus:outline-none"
              required
            />
          </div>
          
          {/* Review Content */}
          <div className="mb-6">
            <label htmlFor="review" className="mb-2 block text-sm font-medium text-gray-700">
              Your Review
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with other visitors"
              className="h-32 w-full rounded-lg border border-amber-200 p-3 text-sm focus:border-orange-500 focus:outline-none"
              required
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-amber-200 bg-white py-3 text-sm font-medium text-amber-900 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className="flex-1 rounded-lg bg-orange-500 py-3 text-sm font-medium text-white disabled:bg-orange-300 cursor-pointer"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;