import { useState, useRef, useEffect } from 'react';
import { Star, Filter, Map,  X,  } from 'lucide-react';
import temples from '../../../mock/data/temples';
import SearchInputField from '../../../components/common/Input/SearchInputField';
import FloatingActionButton from '../../../components/common/Button/FloatingActionButton';
// import TempleImage from '../../../assets/images/temple.jpg';
// import { NavLink } from 'react-router-dom';
import TempleFilters from './components/TempleFilters';
import CategoryFilters from './components/CategoryFilters';
import SortOptionsAndResultsCount from './components/SortOptionsAndResultsCount';
import FeaturedTemples from './components/FeaturedTemples';
import TempleCardsGrid from './components/TempleCardsGrid.tsx';

const ExploreTemples = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeSortBy, setActiveSortBy] = useState<string>('Popular');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

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

  // Filter temples based on active filter
  const filteredTemples =
    activeFilter === 'All'
      ? temples
      : temples.filter(
          (temple) =>
            temple.category === activeFilter || (activeFilter === 'Favorites' && temple.favorite),
        );

  // Get sorted temples based on active sort
  const getSortedTemples = () => {
    switch (activeSortBy) {
      case 'Popular':
        return [...filteredTemples].sort((a, b) => b.rating - a.rating);
      case 'Distance':
        return [...filteredTemples].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      case 'Rating':
        return [...filteredTemples].sort((a, b) => b.rating - a.rating);
      default:
        return filteredTemples;
    }
  };

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
      <SearchInputField />

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
              <h2 className="font-serif text-xl text-amber-900">Namaste, Rahul!</h2>
              <p className="text-sm text-gray-600">Wishing you spiritual blessings today</p>
            </div>

            {/* Filters Section */}
            <TempleFilters
              mobileFiltersOpen={mobileFiltersOpen}
              toggleMobileFilters={toggleMobileFilters}
              sidebarRef={sidebarRef}
            />

            {/* Featured Temples */}
            <FeaturedTemples />
          </div>
        </div>

        {/* Center & Right Columns (Temple Content) */}
        <div className="space-y-3 md:col-span-3">
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

          {/* Category Filters  */}
          <CategoryFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

          {/* Sort Options and Results Count */}
          <SortOptionsAndResultsCount
            filteredTemplesCount={filteredTemples.length}
            activeSortBy={activeSortBy}
            setActiveSortBy={setActiveSortBy}
          />

          {/* Temple Cards - Grid Layout */}
          <TempleCardsGrid
            temples={getSortedTemples().map((temple) => ({
              ...temple,
              id: temple.id.toString(),
            }))}
            renderRating={renderRating}
          />
          {/* Load More Button */}
          <div className="mt-6 flex justify-center">
            <button className="rounded-lg border border-amber-200 bg-white px-6 py-2 text-sm font-medium text-amber-900 hover:bg-amber-50">
              Load More Temples
            </button>
          </div>
        </div>
      </main>

      {/* Floating Action Button - Adjusted position for mobile */}
      <FloatingActionButton />
    </div>
  );
};

export default ExploreTemples;
