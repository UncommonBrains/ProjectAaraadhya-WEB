import { Gift } from 'lucide-react';
import React from 'react';
import { useTemplePoojasViewModel } from '../../../view-models/temple/useTemplePoojasViewModel';
import { useNavigate } from 'react-router-dom';

const TemplePoojas: React.FC<{ templeId?: string }> = ({ templeId }) => {
  const { poojas, loading } = useTemplePoojasViewModel();
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm md:p-6">
      {loading ? (
        <>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-serif text-lg text-amber-900 md:text-xl">
              Available Pooja Services
            </h3>
            <button className="text-sm font-medium text-orange-500">View All</button>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex animate-pulse rounded bg-amber-50 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-orange-500" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-serif text-lg text-amber-900 md:text-xl">
              Available Pooja Services
            </h3>
            <button
              onClick={() => navigate(`/temple-details/pooja-booking/${templeId}`)}
              className="text-sm font-medium text-orange-500"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {poojas.map((pooja, index) => (
              <div key={index} className="flex rounded bg-amber-50 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-orange-500">
                  <Gift className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-amber-900">{pooja.poojaDetails.name}</h4>
                  <p className="text-xs text-gray-600">From ₹{pooja.price}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate(`/temple-details/pooja-booking/${templeId}`)}
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-amber-600 px-4 py-3 text-sm font-medium text-white md:text-base"
          >
            <Gift className="mr-2 h-4 w-4" />
            Book Pooja Service
          </button>
        </>
      )}
    </div>
  );
};

export default TemplePoojas;
