import { useState, useRef, useEffect } from 'react';
import { Star, Filter, Map, Clock, ArrowUpDown, X, Heart } from 'lucide-react';
import FloatingActionButton from '../../../components/common/Button/FloatingActionButton';
import { NavLink } from 'react-router-dom';
import { useTemplesListViewModel } from '../../../view-models/temple/useTemplesListViewModel';
import { formatTimeString } from '../../../utils/dateFormatters';
import { getManagingAuthorityLabel } from '../../../models/entities/Temple';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { useAuthContext } from '../../../context/common/AuthContext/AuthContext';

const ExploreTemples = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeSortBy, setActiveSortBy] = useState<string>('Popular');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthContext();


  const { temples, loading, hasMore, loadingMore, loadMoreTemples } = useTemplesListViewModel();

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If the sidebar is open and the click is outside the sidebar element
      if (
        mobileFiltersOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setMobileFiltersOpen(false);
      }
    }

    // Add event listener when the sidebar is open
    if (mobileFiltersOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileFiltersOpen]);

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  // Render stars based on rating
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-3 w-3 fill-current text-amber-500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="h-3 w-3 fill-current text-amber-300" />);
      } else {
        stars.push(<Star key={i} className="h-3 w-3 fill-current text-amber-200" />);
      }
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      {/* Main Content */}
      <main className="relative container mx-auto grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
        {/* Left Column - Filters - Hidden on mobile by default */}

        <div
          className={`${
            mobileFiltersOpen
              ? 'fixed inset-0 z-40 bg-amber-900/70 md:static md:z-auto md:bg-transparent'
              : 'hidden md:!block'
          }`}
          onClick={(e) => {
            // Close sidebar if clicking on the overlay (not the sidebar itself)
            if (e.target === e.currentTarget) {
              setMobileFiltersOpen(false);
            }
          }}
        >
          <div
            ref={sidebarRef}
            className={`${
              mobileFiltersOpen
                ? 'absolute top-0 right-0 h-full w-4/5 max-w-sm transform overflow-y-auto bg-amber-50 p-4 shadow-xl transition-all'
                : 'space-y-6'
            }`}
          >
            {mobileFiltersOpen && (
              <div className="sticky top-0 mb-4 flex items-center justify-between border-b border-amber-200 bg-amber-50 p-2">
                <h3 className="font-serif text-amber-900">Filters</h3>
                <button onClick={toggleMobileFilters} className="p-2 text-amber-900">
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Welcome Section */}
            <div className="hidden md:!block">
              <h2 className="font-serif text-xl text-amber-900">Namaste, {user?.displayName?.split(' ')[0]}!</h2>
              <p className="text-sm text-gray-600">Wishing you spiritual blessings today</p>
            </div>

            {/* Filters Section */}
            {/* <div className="mb-6 rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-serif text-amber-900">Filters</h3>
                <button className="text-xs text-orange-500">Reset All</button>
              </div>

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

              {mobileFiltersOpen && (
                <button
                  onClick={toggleMobileFilters}
                  className="mt-4 w-full rounded-lg bg-orange-500 py-2 text-sm font-medium text-white"
                >
                  Apply Filters
                </button>
              )}
            </div> */}

            {/* Featured Temples */}
            <div className="hidden rounded-lg border border-amber-100 bg-white p-4 shadow-sm md:!block">
              <h3 className="mb-3 font-serif text-amber-900">Featured Temples</h3>
              <div className="space-y-3">
                {temples
                  .filter(
                    (temple) =>
                      temple.basicDetails?.templeName &&
                      temple.basicDetails?.profilePictureUrl &&
                      temple.contactDetails?.address &&
                      temple.contactDetails?.chiefPriest?.name,
                  )
                  .slice(0, 3) // show only top 3 valid temples
                  .map((temple) => (
                    <div key={temple.id} className="flex items-center rounded bg-amber-50 p-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-amber-200/50 text-orange-500">
                        <Star className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-amber-900">
                          {temple.basicDetails?.templeName}
                        </h4>
                        <p className="text-xs text-gray-600">{temple.contactDetails?.address}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center & Right Columns (Temple Content) */}
        <div className="space-y-3 md:col-span-3">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <LoadingSpinner message="Loading temples..." />
            </div>
          ) : (
            <>
              {/* Page Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl text-amber-900">Explore Temples</h2>
                  <p className="text-sm text-gray-600">Discover sacred places across India</p>
                </div>
                <div className="flex space-x-3">
                  {/* Filter button - Visible only on small screens */}
                  <button
                    className="rounded border border-amber-200 bg-white p-2 text-gray-600 md:hidden"
                    onClick={toggleMobileFilters}
                  >
                    <Filter className="h-4 w-4" />
                  </button>
                  <button className="rounded border border-amber-200 bg-white p-2 text-gray-600">
                    <Map className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Category Filters - Touch scroll with no visible scrollbar */}
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

              {/* Sort Options and Results Count */}
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-medium">{temples.length}</span> temples
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

              {/* Temple Cards - Grid Layout */}
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {temples.map((temple) => (
                  <div
                    key={temple.id}
                    className="overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm"
                  >
                    <NavLink to={`/temple-details/${temple.id}`} className="block">
                      <div
                        className="relative h-40 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${temple.basicDetails?.profilePictureUrl})`,
                        }}
                      >
                        {false && (
                          <div className="absolute top-2 left-2">
                            <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">
                              Special Event
                            </span>
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          {false ? (
                            <button className="flex items-center space-x-1 rounded px-4 py-1 text-white">
                              <Heart className="h-4 w-4 fill-current text-red-500" />
                            </button>
                          ) : (
                            <button className="flex items-center space-x-1 rounded px-4 py-1 text-gray-400">
                              <Heart className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-amber-950/100 to-transparent p-3">
                          <h3 className="font-medium text-white">
                            {temple.basicDetails?.templeName}
                          </h3>
                          <p className="text-xs text-amber-50">{temple.contactDetails?.address}</p>
                        </div>
                      </div>

                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-600">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>
                              Morning:{' '}
                              {formatTimeString(temple.basicDetails?.morningSchedule?.startTime)}
                              {' - '}
                              {formatTimeString(temple.basicDetails?.morningSchedule?.endTime)}
                            </span>
                          </div>
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                            {getManagingAuthorityLabel(temple.basicDetails?.managingAuthority)}
                          </span>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-600">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>
                              Evening:{' '}
                              {formatTimeString(temple.basicDetails?.eveningSchedule?.startTime)}
                              {' - '}
                              {formatTimeString(temple.basicDetails?.eveningSchedule?.endTime)}
                            </span>
                          </div>
                        </div>

                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center">
                            {renderRating(0)}
                            <span className="ml-1 text-xs text-gray-600">({0})</span>
                          </div>
                          <span className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                            {temple.basicDetails?.mainDeityName}
                          </span>
                        </div>

                        {/* Amenities */}
                        <div className="mb-3 flex flex-wrap gap-1">
                          {temple.basicDetails?.amenities &&
                            temple.basicDetails?.amenities.slice(0, 3).map((amenity, index) => (
                              <span
                                key={index}
                                className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                              >
                                {amenity}
                              </span>
                            ))}
                          {temple.basicDetails?.amenities &&
                            temple.basicDetails?.amenities.length > 3 && (
                              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                +{temple.basicDetails?.amenities.length - 3}
                              </span>
                            )}
                        </div>
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <>
                  {loadingMore ? (
                    <div className="mt-6 flex justify-center">
                      <LoadingSpinner message="Loading more temples..." />
                    </div>
                  ) : (
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={loadMoreTemples}
                        className="rounded-lg border border-amber-200 bg-white px-6 py-2 text-sm font-medium text-amber-900 hover:bg-amber-50"
                      >
                        Load More Temples
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>

      {/* Floating Action Button - Adjusted position for mobile */}
      <FloatingActionButton />
    </div>
  );
};

export default ExploreTemples;
