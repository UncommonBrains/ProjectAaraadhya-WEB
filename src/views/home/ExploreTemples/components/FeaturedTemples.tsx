import { Star } from 'lucide-react';
import temples from '../../../../mock/data/temples';

const FeaturedTemples = () => {
  return (
    <div className="hidden rounded-lg border border-amber-100 bg-white p-4 shadow-sm md:!block">
      <h3 className="mb-3 font-serif text-amber-900">Featured Temples</h3>
      <div className="space-y-3">
        {temples
          .filter((temple) => temple.featured)
          .slice(0, 3)
          .map((temple) => (
            <div key={temple.id} className="flex items-center rounded bg-amber-50 p-2">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-amber-200/50 text-orange-500">
                <Star className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-amber-900">{temple.name}</h4>
                <p className="text-xs text-gray-600">{temple.location}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedTemples;