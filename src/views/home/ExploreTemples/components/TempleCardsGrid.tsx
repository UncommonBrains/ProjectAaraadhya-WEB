/// <reference types="react" />

import { NavLink } from 'react-router-dom';
import {  Clock, Camera, Heart } from 'lucide-react';
import TempleImage from '../../../../assets/images/temple.jpg';

interface Temple {
  id: number | string;
  name: string;
  location: string;
  morhours: string;
  evehours: string;
  category: string;
  rating: number;
  reviews: number;
  distance: string;
  amenities: string[];
  favorite: boolean;
  specialEvent?: boolean | string;
}

interface TempleCardsGridProps {
  temples: Temple[];
  renderRating: (rating: number) => React.ReactNode;
}

const TempleCardsGrid = ({ temples, renderRating }: TempleCardsGridProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {temples.map((temple) => (
        <div
          key={temple.id}
          className="overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm"
        >
          <NavLink to={`/temple-details`} className="block">
            <div
              className="relative h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${TempleImage})` }}
            >
              {temple.specialEvent && (
                <div className="absolute top-2 left-2">
                  <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">
                    Special Event
                  </span>
                </div>
              )}
              <div className="absolute top-2 right-2">
                {!temple.favorite ? (
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
                <h3 className="font-medium text-white">{temple.name}</h3>
                <p className="text-xs text-amber-50">{temple.location}</p>
              </div>
            </div>

            <div className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-600">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>Morning: {temple.morhours}</span>
                </div>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                  {temple.category}
                </span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-600">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>Evening: {temple.evehours}</span>
                </div>
              </div>

              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center">
                  {renderRating(temple.rating)}
                  <span className="ml-1 text-xs text-gray-600">({temple.reviews})</span>
                </div>
                <span className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                  {temple.distance}
                </span>
              </div>

              {/* Amenities */}
              <div className="mb-3 flex flex-wrap gap-1">
                {temple.amenities &&
                  temple.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                    >
                      {amenity}
                    </span>
                  ))}
                {temple.amenities && temple.amenities.length > 3 && (
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    +{temple.amenities.length - 3}
                  </span>
                )}
              </div>

              <div className="flex justify-between">
                <NavLink
                  to={`/temple/${temple.id}`}
                  className="flex items-center rounded bg-amber-100 px-3 py-1 text-xs text-amber-900"
                >
                  <Camera className="mr-1 h-3 w-3" />
                  Virtual Tour
                </NavLink>
                <NavLink
                  to={`/temple/${temple.id}`}
                  className="rounded bg-orange-100 px-3 py-1 text-xs text-orange-500"
                >
                  View Details
                </NavLink>
              </div>
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default TempleCardsGrid;