import React from "react";
import { Heart, Clock, Star } from "lucide-react";

// Temple data array
const templesData = [
  {
    id: 1,
    name: "ISKCON Temple",
    location: "New Delhi, India",
    morhours: "5:00 - 9:00",
    evehours: "5:00 - 9:00",
    rating: 4,
    reviews: 124,
    favorite: true,
    imagePath: "/temple-images/Neendoor.jpeg",
    lastVisit: {
      type: "last",
      text: "2 days ago",
      status: "recent", // recent, upcoming, old
    },
  },
  {
    id: 2,
    name: "Meenakshi Temple",
    location: "Madurai, Tamil Nadu",
    morhours: "5:00 - 9:00",
    evehours: "5:00 - 9:00",
    rating: 5,
    reviews: 203,
    favorite: true,
    imagePath: "/temple-images/Neendoor.jpeg",

    lastVisit: {
      type: "last",
      text: "1 week ago",
      status: "recent",
    },
  },
  {
    id: 3,
    name: "Kashi Vishwanath",
    location: "Varanasi, Uttar Pradesh",
    morhours: "5:00 - 9:00",
    evehours: "5:00 - 9:00",
    rating: 4,
    reviews: 156,
    favorite: true,
    imagePath: "/temple-images/Neendoor.jpeg",

    lastVisit: {
      type: "last",
      text: "3 days ago",
      status: "recent",
    },
  },
  {
    id: 4,
    name: "Tirupati Balaji",
    location: "Tirupati, Andhra Pradesh",
    morhours: "5:00 - 9:00",
    evehours: "5:00 - 9:00",
    rating: 5,
    reviews: 297,
    favorite: true,
    imagePath: "/temple-images/Neendoor.jpeg",

    lastVisit: {
      type: "upcoming",
      text: "Mar 18",
      status: "upcoming",
    },
  },
  {
    id: 5,
    name: "Somnath Temple",
    location: "Somnath, Gujarat",
    morhours: "5:00 - 9:00",
    evehours: "5:00 - 9:00",
    rating: 4,
    reviews: 98,
    favorite: false,
    imagePath: "/temple-images/Neendoor.jpeg",

    lastVisit: {
      type: "last",
      text: "2 months ago",
      status: "old",
    },
  },
  {
    id: 6,
    name: "Golden Temple",
    location: "Amritsar, Punjab",
    morhours: "5:00 - 9:00",
    evehours: "5:00 - 9:00",
    rating: 5,
    reviews: 248,
    favorite: false,
    imagePath: "/temple-images/Neendoor.jpeg",

    lastVisit: {
      type: "last",
      text: "1 month ago",
      status: "old",
    },
  },
  {
    id: 7,
    name: "Badrinath Temple",
    location: "Badrinath, Uttarakhand",
    morhours: "5:00 - 9:00",
    evehours: "5:00 - 9:00",
    rating: 5,
    reviews: 189,
    favorite: false,
    imagePath: "/temple-images/Neendoor.jpeg",

    lastVisit: {
      type: "last",
      text: "3 months ago",
      status: "old",
    },
  },
  {
    id: 8,
    name: "Rameshwaram Temple",
    location: "Rameshwaram, Tamil Nadu",
    morhours: "5:00 - 9:00",
    evehours: "5:00 - 9:00",
    rating: 5,
    reviews: 212,
    favorite: true,
    imagePath: "/temple-images/Neendoor.jpeg",

    lastVisit: {
      type: "last",
      text: "1 week ago",
      status: "recent",
    },
  },
  {
    id: 9,
    name: "Jagannath Temple",
    location: "Puri, Odisha",
    morhours: "5:00 - 9:00",
    evehours: "5:00 - 9:00",
    rating: 4,
    reviews: 176,
    favorite: false,
    imagePath: "/temple-images/Neendoor.jpeg",

    lastVisit: {
      type: "last",
      text: "5 months ago",
      status: "old",
    },
  },
  {
    id: 10,
    name: "Vaishno Devi Temple",
    location: "Katra, Jammu and Kashmir",
    morhours: "5:00 - 9:00",
    evehours: "5:00 - 9:00",
    rating: 5,
    reviews: 324,
    favorite: true,
    imagePath: "/temple-images/Neendoor.jpeg",

    lastVisit: {
      type: "last",
      text: "2 weeks ago",
      status: "recent",
    },
  },
  {
    id: 11,
    name: "Kedarnath Temple",
    location: "Kedarnath, Uttarakhand",
    morhours: "5:00 - 9:00",
    evehours: "5:00 - 9:00",
    rating: 5,
    reviews: 198,
    favorite: false,
    imagePath: "/temple-images/Neendoor.jpeg",

    lastVisit: {
      type: "last",
      text: "6 months ago",
      status: "old",
    },
  },
  {
    id: 12,
    name: "Mahakaleshwar Temple",
    location: "Ujjain, Madhya Pradesh",
    morhours: "5:00 - 9:00",
    evehours: "5:00 - 9:00",
    rating: 4,
    reviews: 145,
    favorite: false,
    imagePath: "/temple-images/Neendoor.jpeg",

    lastVisit: {
      type: "last",
      text: "4 months ago",
      status: "old",
    },
  },
];

const TempleGrid = () => {
  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-3 w-3 ${
            i <= rating ? "text-amber-500" : "text-amber-200"
          } fill-current`}
        />
      );
    }
    return stars;
  };

  // Function to render visit status with appropriate styling
  const renderVisitStatus = (visit) => {
    let bgColor = "bg-gray-100";
    let textColor = "text-gray-600";

    if (visit.status === "recent") {
      bgColor = "bg-green-100";
      textColor = "text-green-700";
    } else if (visit.status === "upcoming") {
      bgColor = "bg-amber-100";
      textColor = "text-amber-700";
    }

    return (
      <span className={`text-xs ${bgColor} ${textColor} px-2 py-0.5 rounded`}>
        {visit.type === "upcoming" ? "Upcoming visit: " : "Last visit: "}
        {visit.text}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templesData.map((temple) => (
        <div
          key={temple.id}
          className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-hidden"
        >
          <div
            className="h-48 relative bg-cover bg-center"
            style={{ backgroundImage: `url(${temple.imagePath})` }}
          >
            <div>
              <div className="absolute top-2 right-2">
                <span className="bg-amber-100/80 rounded-full p-1">
                  <Heart
                    className={`h-4 w-4 ${
                      temple.favorite
                        ? "text-red-500 fill-current"
                        : "text-gray-400"
                    }`}
                  />
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t  from-amber-950/100 to-transparent p-3">
                <h3 className="text-white font-medium">{temple.name}</h3>
                <p className="text-amber-50 text-xs">{temple.location}</p>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="flex items-center text-xs text-gray-600 mb-2">
              <Clock className="h-3 w-3 mr-1" />
              <span>Open: {temple.hours}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                {renderStars(temple.rating)}
                <span className="text-xs text-gray-600 ml-1">
                  ({temple.reviews})
                </span>
              </div>
              {renderVisitStatus(temple.lastVisit)}
            </div>
            <div className="flex justify-between">
              <button className="text-amber-900 bg-amber-100 text-xs px-3 py-1 rounded">
                Virtual Darshan
              </button>
              <button className="text-orange-500 bg-orange-100 text-xs px-3 py-1 rounded">
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
