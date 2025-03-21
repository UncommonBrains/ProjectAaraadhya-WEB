import {
  Bell,
  Search,
} from "lucide-react";


const Header = () => {
  return (
    <header className="bg-amber-50/80 border-b border-amber-100 p-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <div className="bg-orange-400 rounded-full w-8 h-8"></div>
        <h1 className="ml-3 text-xl font-serif text-amber-900 font-bold">
          Aaradhya
        </h1>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-6 text-sm">
        <a href="/" className="text-amber-900 font-medium">
          Home
        </a>
        <a href="" className="text-gray-600 hover:text-amber-900">
          My Temples
        </a>
        <a href="#" className="text-gray-600 hover:text-amber-900">
          Upcoming Poojas
        </a>
        <a href="#" className="text-gray-600 hover:text-amber-900">
          Donations
        </a>
        <a href="#" className="text-gray-600 hover:text-amber-900">
          Eco
        </a>
        <a href="#" className="text-gray-600 hover:text-amber-900">
          Community
        </a>
      </nav>

      {/* Search and Profile */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search temples, poojas..."
            className="pl-8 pr-4 py-1 rounded-full border border-amber-200 bg-white text-sm w-48 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
          <Search className="absolute left-2 top-1.5 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 bg-orange-400 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
              3
            </span>
          </div>
          <div className="bg-amber-600 rounded-full w-9 h-9 flex items-center justify-center text-white font-medium">
            R
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
