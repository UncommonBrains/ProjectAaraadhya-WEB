import { Heart, Clock, Star } from 'lucide-react';
import { myTemples } from '../../../mock/data/myTemples';
import { Visit } from './types';

const TempleGrid = () => {
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-3 w-3 ${i <= rating ? 'text-amber-500' : 'text-amber-200'} fill-current`}
        />,
      );
    }
    return stars;
  };

  // Function to render visit status with appropriate styling
  const renderVisitStatus = (visit: Visit) => {
    let bgColor = 'bg-gray-100';
    let textColor = 'text-gray-600';

    if (visit.status === 'recent') {
      bgColor = 'bg-green-100';
      textColor = 'text-green-700';
    } else if (visit.status === 'upcoming') {
      bgColor = 'bg-amber-100';
      textColor = 'text-amber-700';
    }

    return (
      <span className={`text-xs ${bgColor} ${textColor} rounded px-2 py-0.5`}>
        {visit.type === 'upcoming' ? 'Upcoming visit: ' : 'Last visit: '}
        {visit.text}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {myTemples.map((temple) => (
        <div
          key={temple.id}
          className="overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm"
        >
          <div
            className="relative h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${temple.imagePath})` }}
          >
            <div>
              <div className="absolute top-2 right-2">
                <span className="rounded-full bg-amber-100/80 p-1">
                  <Heart
                    className={`h-4 w-4 ${
                      temple.favorite ? 'fill-current text-red-500' : 'text-gray-400'
                    }`}
                  />
                </span>
              </div>
              <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-amber-950/100 to-transparent p-3">
                <h3 className="font-medium text-white">{temple.name}</h3>
                <p className="text-xs text-amber-50">{temple.location}</p>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="mb-2 flex items-center text-xs text-gray-600">
              <Clock className="mr-1 h-3 w-3" />
              <span>Open: {temple.morhours}</span>
            </div>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center">
                {renderStars(temple.rating)}
                <span className="ml-1 text-xs text-gray-600">({temple.reviews})</span>
              </div>
              {renderVisitStatus(temple.lastVisit)}
            </div>
            <div className="flex justify-between">
              <button className="rounded bg-amber-100 px-3 py-1 text-xs text-amber-900">
                Virtual Darshan
              </button>
              <button className="rounded bg-orange-100 px-3 py-1 text-xs text-orange-500">
                Book Pooja
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TempleGrid;
