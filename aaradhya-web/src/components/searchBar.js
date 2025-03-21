import { NavLink } from "react-router-dom";
import {  Search } from "lucide-react";


const SearchBar = () => {
  return (
    <div className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto p-4">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-amber-50 border border-amber-100 text-gray-700 text-sm rounded-lg block w-full pl-10 p-2.5"
              placeholder="Search for temples, deities, or locations..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default SearchBar;