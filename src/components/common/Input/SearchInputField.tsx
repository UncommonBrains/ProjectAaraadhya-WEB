import { Search } from 'lucide-react';

const SearchInputField = () => {
  return (
    <div className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto p-4">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-amber-100 bg-amber-50 p-2.5 pl-10 text-sm text-gray-700"
              placeholder="Search for temples, deities, or locations..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInputField;
