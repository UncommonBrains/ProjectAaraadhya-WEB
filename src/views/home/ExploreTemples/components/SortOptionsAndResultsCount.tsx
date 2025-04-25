import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface SortOptionsAndResultsCountProps {
  filteredTemplesCount: number;
  activeSortBy: string;
  setActiveSortBy: (value: string) => void;
}

const SortOptionsAndResultsCount: React.FC<SortOptionsAndResultsCountProps> = ({
  filteredTemplesCount,
  activeSortBy,
  setActiveSortBy,
}) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <p className="text-sm text-gray-600">
        Showing <span className="font-medium">{filteredTemplesCount}</span> temples
      </p>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <div className="relative">
          <select
            className="appearance-none rounded-lg border border-amber-200 bg-white p-2 pr-8 text-sm text-gray-700"
            value={activeSortBy}
            onChange={(e) => setActiveSortBy(e.target.value)}
          >
            <option value="Popular">Popular</option>
            <option value="Distance">Distance</option>
            <option value="Rating">Rating</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ArrowUpDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortOptionsAndResultsCount;