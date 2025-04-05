import React, { useState } from "react";
import {
  ChevronLeft,
  MapPin,
  Clock,
  Star,
  Heart,
  Share,
  Calendar,
  Info,
  Image,
  MessageSquare,
  Phone,
  Globe,
  Check,
  Gift,
} from "lucide-react";

import temples from "../datas/temples";
import ActionButton from "../components/ActionButton";

const TempleDetails = () => {
  // In a real app, you would get the temple ID from URL params
  // Here we'll just use the first temple from the data for demonstration
  const temple = temples[0];

  const [activeTab, setActiveTab] = useState("about");
  const [isFavorite, setIsFavorite] = useState(temple.favorite || false);

  // Render stars based on rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 text-amber-500 fill-current" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="h-4 w-4 text-amber-300 fill-current" />
        );
      } else {
        stars.push(
          <Star key={i} className="h-4 w-4 text-amber-200 fill-current" />
        );
      }
    }

    return stars;
  };

  // Handle navigation to pooja booking page
  const navigateToBooking = () => {
    // In a real app, this would use router navigation
    // For now we'll just log the action
    console.log("Navigating to pooja booking page");
    alert("Navigating to pooja booking page");
    // Example: router.push(`/temples/${temple.id}/book-pooja`);
  };

  return (
    <div className="bg-amber-50 min-h-screen font-sans">
      {/* Header with back button */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center text-amber-900">
            <ChevronLeft className="h-5 w-5 mr-2" />
            <span>Back</span>
          </a>
          <div className="flex space-x-3">
            <button
              className="bg-amber-100 p-2 rounded-full text-amber-900"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </button>
            <button className="bg-amber-100 p-2 rounded-full text-amber-900">
              <Share className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content wrapper with max-width for larger screens */}
      <div className="max-w-4xl mx-auto">
        {/* Hero Image Section */}
        <div
          className="relative h-80 md:h-80 bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: "url('/temple-images/2.jpg')" }}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-950/90 to-transparent p-6">
            <div className="container mx-auto">
              <div className="flex flex-col text-white">
                <h1 className="text-2xl md:text-3xl font-serif mb-1">
                  {temple.name}
                </h1>
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm md:text-base">
                    {temple.location}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex mr-3">{renderRating(temple.rating)}</div>
                  <span className="text-sm md:text-base">
                    {temple.rating} ({temple.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Section */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-3 bg-amber-50 rounded">
                <Clock className="h-5 w-5 text-orange-500 mb-1" />
                <span className="text-xs md:text-sm text-gray-600">
                  Morning Hours:
                </span>
                <span className="text-sm md:text-base font-medium text-amber-900">
                  {temple.morhours}
                </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-amber-50 rounded">
                <Calendar className="h-5 w-5 text-orange-500 mb-1" />
                <span className="text-xs md:text-sm text-gray-600">
                  Evening Hours:{" "}
                </span>

                <span className="text-sm md:text-base font-medium text-amber-900">
                  {temple.evehours}
                </span>
              </div>
              <div className="flex flex-col items-center p-3 bg-amber-50 rounded">
                <Globe className="h-5 w-5 text-orange-500 mb-1" />
                <span className="text-xs md:text-sm text-gray-600">
                  Main Deity
                </span>
                <span className="text-sm md:text-base font-medium text-amber-900">
                  {temple.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {/* <button className="bg-orange-500 text-white rounded-lg py-3 flex items-center justify-center font-medium text-xs md:text-sm">
              <Camera className="h-5 w-5 mr-1" />
              Virtual Tour
            </button> */}
            <button
              className="bg-amber-600 text-white rounded-lg py-3 flex items-center justify-center font-medium text-md md:text-md"
              onClick={() =>
                (window.location.href = "/temple-details/pooja-booking")
              }
            >
              <Gift className="h-5 w-5 mr-1" />
              Book Pooja
            </button>

            <button className="bg-amber-100 text-amber-900 rounded-lg py-3 flex items-center justify-center font-medium text-md md:text-md">
              <Phone className="h-5 w-5 mr-1" />
              Contact
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="container mx-auto px-4">
          <div className="border-b border-amber-200 flex overflow-x-auto md:overflow-visible md:justify-center">
            {["about", "photos", "events", "reviews", "nearby"].map((tab) => (
              <button
                key={tab}
                className={`py-3 px-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="container mx-auto p-4">
          {activeTab === "about" && (
            <div className="space-y-6">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 md:p-6">
                <h3 className="font-serif text-lg md:text-xl text-amber-900 mb-3">
                  About the Temple
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {temple.description ||
                    `This magnificent temple dedicated to ${temple.category} is one of the most revered shrines in ${temple.location}. The temple showcases remarkable architecture with intricate carvings and sculptures that depict various mythological stories and deities.`}
                </p>
                <div className="mt-4 text-orange-500 text-sm font-medium cursor-pointer">
                  Read More
                </div>
              </div>

              {/* Pooja Services */}
              <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 md:p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-serif text-lg md:text-xl text-amber-900">
                    Available Pooja Services
                  </h3>
                  <button
                    onClick={navigateToBooking}
                    className="text-orange-500 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {[
                    "Daily Archana",
                    "Abhishekam",
                    "Special Festival Poojas",
                    "Family Blessing",
                  ].map((pooja, index) => (
                    <div key={index} className="flex p-3 bg-amber-50 rounded">
                      <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-orange-500">
                        <Gift className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-amber-900">
                          {pooja}
                        </h4>
                        <p className="text-xs text-gray-600">
                          From ₹{[101, 501, 1001, 2001][index]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full mt-4 bg-amber-600 text-white rounded-lg px-4 py-3 text-sm md:text-base font-medium flex items-center justify-center"
                  onClick={navigateToBooking}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Book Pooja Service
                </button>
              </div>

              {/* Features & Amenities */}
              <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 md:p-6">
                <h3 className="font-serif text-lg md:text-xl text-amber-900 mb-3">
                  Features & Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {temple.amenities &&
                    temple.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 bg-amber-50 rounded"
                      >
                        <div className="bg-amber-100 w-8 h-8 rounded-full flex items-center justify-center text-orange-500">
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="ml-2 text-sm text-gray-700">
                          {amenity}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* History & Significance */}
              <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 md:p-6">
                <h3 className="font-serif text-lg md:text-xl text-amber-900 mb-3">
                  History & Significance
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  The temple has a rich history dating back to ancient times. It
                  was built during the reign of a prominent dynasty and has
                  withstood the test of time. The temple holds immense religious
                  and cultural significance for devotees who visit from all
                  parts of the country.
                </p>
                <div className="mt-4 text-orange-500 text-sm font-medium cursor-pointer">
                  Read More
                </div>
              </div>

              {/* Location & How to Reach */}
              <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 md:p-6">
                <h3 className="font-serif text-lg md:text-xl text-amber-900 mb-3">
                  Location & How to Reach
                </h3>
                <div className="bg-amber-100 h-48 md:h-64 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-amber-200/30"></div>
                  <MapPin className="h-8 w-8 text-orange-500" />
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  The temple is located in {temple.location}. It is easily
                  accessible by road and is about {temple.distance} from the
                  city center. Local transport options include buses, taxis, and
                  auto-rickshaws.
                </p>
                <button className="w-full mt-3 bg-amber-100 text-amber-900 rounded px-4 py-2 text-sm md:text-base font-medium">
                  Get Directions
                </button>
              </div>

              {/* Visiting Tips */}
              <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 md:p-6">
                <h3 className="font-serif text-lg md:text-xl text-amber-900 mb-3">
                  Visiting Tips
                </h3>
                <ul className="text-sm md:text-base text-gray-700 space-y-2 md:space-y-3">
                  <li className="flex items-start">
                    <Info className="h-4 w-4 text-orange-500 mr-2 mt-0.5" />
                    <span>
                      Best time to visit is early morning or evening for
                      peaceful darshan.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Info className="h-4 w-4 text-orange-500 mr-2 mt-0.5" />
                    <span>
                      Dress modestly and follow temple customs and traditions.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Info className="h-4 w-4 text-orange-500 mr-2 mt-0.5" />
                    <span>
                      Photography might be restricted in certain areas of the
                      temple.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Info className="h-4 w-4 text-orange-500 mr-2 mt-0.5" />
                    <span>
                      Special prayers and rituals can be arranged by contacting
                      the temple office.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "photos" && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg md:text-xl text-amber-900 mb-2">
                Temple Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-amber-100 h-40 md:h-52 rounded-lg flex items-center justify-center relative"
                  >
                    <Image className="h-8 w-8 text-orange-500" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 bg-amber-100 text-amber-900 rounded-lg px-4 py-3 text-sm md:text-base font-medium flex items-center justify-center">
                <Image className="h-4 w-4 mr-2" />
                View All Photos
              </button>
            </div>
          )}

          {activeTab === "events" && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg md:text-xl text-amber-900 mb-2">
                Upcoming Events & Festivals
              </h3>
              <div className="space-y-3 md:space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm border border-amber-100 p-3 md:p-4"
                  >
                    <div className="flex">
                      <div className="bg-orange-100 text-orange-500 rounded-lg p-3 flex flex-col items-center justify-center min-w-16 md:min-w-20">
                        <span className="text-sm md:text-base font-bold">
                          {["APR", "MAY", "JUN"][index]}
                        </span>
                        <span className="text-lg md:text-xl font-bold">
                          {[15, 24, 8][index]}
                        </span>
                      </div>
                      <div className="ml-3 md:ml-4">
                        <h4 className="font-medium text-sm md:text-base text-amber-900">
                          {
                            [
                              "Annual Temple Festival",
                              "Chariot Procession",
                              "Special Puja Ceremony",
                            ][index]
                          }
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600 mt-1">
                          {
                            [
                              "A week-long celebration with cultural programs and special rituals.",
                              "The grand chariot procession around the temple complex.",
                              "Special prayers conducted by the head priest.",
                            ][index]
                          }
                        </p>
                        <div className="mt-2 flex items-center text-xs md:text-sm text-gray-600">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {
                              [
                                "5:00 AM - 10:00 PM",
                                "6:00 AM - 9:00 PM",
                                "7:00 AM - 8:00 PM",
                              ][index]
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 bg-amber-100 text-amber-900 rounded-lg px-4 py-3 text-sm md:text-base font-medium flex items-center justify-center">
                <Calendar className="h-4 w-4 mr-2" />
                View All Events
              </button>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-lg md:text-xl text-amber-900">
                  Reviews & Ratings
                </h3>
                <button className="text-orange-500 text-sm md:text-base font-medium">
                  Write a Review
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="flex items-center">
                      <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-orange-500">
                        <span className="font-medium">D</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm md:text-base font-medium text-amber-900">
                          Devesh Singh
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600">
                          Visited 2 months ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">{renderRating(4.5)}</div>
                </div>
                <p className="text-sm md:text-base text-gray-700 mb-3">
                  This temple is a must-visit for anyone interested in spiritual
                  heritage. The architecture is breathtaking and the ambience is
                  so peaceful. I spent hours here just taking in the beauty and
                  serenity.
                </p>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <div className="flex items-center text-gray-600">
                    <Heart className="h-3 w-3 mr-1" />
                    <span>24 Helpful</span>
                  </div>
                  <button className="text-orange-500">Reply</button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-amber-100 p-4 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="flex items-center">
                      <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-orange-500">
                        <span className="font-medium">R</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm md:text-base font-medium text-amber-900">
                          Radha Kumari
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600">
                          Visited 3 weeks ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">{renderRating(5)}</div>
                </div>
                <p className="text-sm md:text-base text-gray-700 mb-3">
                  The experience was divine! The temple is well-maintained and
                  the priests were very helpful. I participated in the evening
                  aarti which was a soul-stirring experience. Highly recommend
                  visiting during festival time.
                </p>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <div className="flex items-center text-gray-600">
                    <Heart className="h-3 w-3 mr-1" />
                    <span>18 Helpful</span>
                  </div>
                  <button className="text-orange-500">Reply</button>
                </div>
              </div>

              <button className="w-full mt-3 bg-amber-100 text-amber-900 rounded-lg px-4 py-3 text-sm md:text-base font-medium flex items-center justify-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Read All Reviews
              </button>
            </div>
          )}

          {activeTab === "nearby" && (
            <div className="space-y-4">
              <h3 className="font-serif text-lg md:text-xl text-amber-900 mb-2">
                Nearby Attractions
              </h3>
              <div className="space-y-3 md:space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden flex"
                  >
                    <div className="bg-amber-100 w-20 md:w-32 flex items-center justify-center">
                      <Image className="h-8 w-8 text-orange-500" />
                    </div>
                    <div className="p-3 md:p-4 flex-1">
                      <h4 className="font-medium text-sm md:text-base text-amber-900">
                        {
                          ["Sacred Lake", "Ancient Fort", "Heritage Museum"][
                            index
                          ]
                        }
                      </h4>
                      <div className="flex items-center text-xs md:text-sm text-gray-600 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{[2, 5, 3.5][index]} km away</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-xs md:text-sm bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          {["Natural", "Historical", "Cultural"][index]}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 bg-amber-100 text-amber-900 rounded-lg px-4 py-3 text-sm md:text-base font-medium flex items-center justify-center">
                <MapPin className="h-4 w-4 mr-2" />
                View All Nearby Places
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Button - Adjusted position for mobile */}
      <ActionButton />
    </div>
  );
};

export default TempleDetails;
