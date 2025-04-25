import React from 'react';

interface CategoryFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="scrollbar-hide -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
      <div className="mb-2 flex touch-pan-x space-x-3 text-sm whitespace-nowrap">
        {['All', 'Favorites', 'Vishnu', 'Shiva', 'Shakti'].map((filter) => (
          <button
            key={filter}
            className={`${
              activeFilter === filter
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-600 hover:bg-amber-100'
            } flex-shrink-0 rounded-full px-4 py-2 transition-colors`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;
