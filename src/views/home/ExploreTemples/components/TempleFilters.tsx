import { RefObject } from 'react';

interface TempleFiltersProps {
  mobileFiltersOpen: boolean;
  toggleMobileFilters: () => void;
  sidebarRef: RefObject<HTMLDivElement | null>;
}

const TempleFilters: React.FC<TempleFiltersProps> = ({
  mobileFiltersOpen,
  toggleMobileFilters,
  sidebarRef,
}) => {
  return (
    <div className="mb-6 rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-serif text-amber-900">Filters</h3>
                <button className="text-xs text-orange-500">Reset All</button>
              </div>

              {/* Region Filter */}
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">Region</h4>
                <div className="space-y-1">
                  {['North Indian', 'South Indian', 'East Indian', 'West Indian'].map((region) => (
                    <div key={region} className="flex items-center">
                      <input type="checkbox" id={region} className="h-4 w-4 accent-orange-500" />
                      <label htmlFor={region} className="ml-2 text-sm text-gray-600">
                        {region}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deity Filter */}
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">Deity</h4>
                <div className="space-y-1">
                  {['Vishnu', 'Shiva', 'Shakti', 'Ganesh', 'Hanuman'].map((deity) => (
                    <div key={deity} className="flex items-center">
                      <input type="checkbox" id={deity} className="h-4 w-4 accent-orange-500" />
                      <label htmlFor={deity} className="ml-2 text-sm text-gray-600">
                        {deity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Filter */}
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">Amenities</h4>
                <div className="space-y-1">
                  {['Parking', 'Food', 'Accommodation', 'Guides'].map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <input type="checkbox" id={amenity} className="h-4 w-4 accent-orange-500" />
                      <label htmlFor={amenity} className="ml-2 text-sm text-gray-600">
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distance Slider */}
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-700">Distance</h4>
                <input type="range" min="0" max="1000" className="w-full accent-orange-500" />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>0 km</span>
                  <span>500 km</span>
                  <span>1000+ km</span>
                </div>
              </div>

              {mobileFiltersOpen && (
                <button
                  onClick={toggleMobileFilters}
                  className="mt-4 w-full rounded-lg bg-orange-500 py-2 text-sm font-medium text-white"
                >
                  Apply Filters
                </button>
              )}
            </div>
  );
};

export default TempleFilters;
