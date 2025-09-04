import { useState } from 'react';
import {
  ChevronLeft,
  MapPin,
  Clock,
  Star,
  Heart,
  Share,
  Calendar,
  Image,
  MessageSquare,
  Phone,
  Globe,
  Check,
  Gift,
} from 'lucide-react';
import FloatingActionButton from '../../../components/common/Button/FloatingActionButton';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTempleViewModel } from '../../../view-models/temple/useTempleViewModel';
import { formatTimeString } from '../../../utils/dateFormatters';
import TempleGallery from './TempleGallery';
import TemplePoojas from './TemplePoojas';
import ReviewModal from './ReviewModal';
import ContactModal from './ContactModal';

const TempleDetails = () => {
  const { temple } = useTempleViewModel();

  const [activeTab, setActiveTab] = useState('about');
  const [isFavorite, setIsFavorite] = useState(false);
  const [readMoreDescription, setReadMoreDescription] = useState(false);
  const [readMoreHistory, setReadMoreHistory] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Function to handle review submission
  const handleReviewSubmit = (reviewData: { rating: number; title: string; review: string }) => {
    // In a real app, you would send this data to your backend
    console.log('Review submitted:', reviewData);
    // TODO: Implement API call to save review

    // You might want to show a success message or update the reviews list
  };

  const navigate = useNavigate();

  // Render stars based on rating
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-current text-amber-500" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="h-4 w-4 fill-current text-amber-300" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 fill-current text-amber-200" />);
      }
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      {/* Header with back button */}
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <NavLink to="/" className="flex items-center text-amber-900">
            <ChevronLeft className="mr-2 h-5 w-5" />
            <span>Back</span>
          </NavLink>
          <div className="flex space-x-3">
            <button
              className="rounded-full bg-amber-100 p-2 text-amber-900"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button className="rounded-full bg-amber-100 p-2 text-amber-900">
              <Share className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content wrapper with max-width for larger screens */}
      <div className="mx-auto max-w-4xl">
        {/* Hero Image Section */}
        <div
          className="relative h-80 overflow-hidden bg-cover bg-center md:h-80"
          style={{ backgroundImage: `url(${temple?.basicDetails?.profilePictureUrl})` }}
        >
          <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-amber-950/90 to-transparent p-6">
            <div className="container mx-auto">
              <div className="flex flex-col text-white">
                <h1 className="mb-1 font-serif text-2xl md:text-3xl">
                  {temple?.basicDetails?.templeName}
                </h1>
                <div className="mb-2 flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span className="text-sm md:text-base">{temple?.contactDetails?.address}</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 flex">{renderRating(0)}</div>
                  <span className="text-sm md:text-base">
                    {0} ({0} reviews)
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
              <div className="flex flex-col items-center rounded bg-amber-50 p-3">
                <Clock className="mb-1 h-5 w-5 text-orange-500" />
                <span className="text-xs text-gray-600 md:text-sm">Morning Hours:</span>
                <span className="text-sm font-medium text-amber-900 md:text-base">
                  {formatTimeString(temple?.basicDetails?.morningSchedule?.startTime)}
                  {' - '}
                  {formatTimeString(temple?.basicDetails?.morningSchedule?.endTime)}
                </span>
              </div>
              <div className="flex flex-col items-center rounded bg-amber-50 p-3">
                <Calendar className="mb-1 h-5 w-5 text-orange-500" />
                <span className="text-xs text-gray-600 md:text-sm">Evening Hours: </span>

                <span className="text-sm font-medium text-amber-900 md:text-base">
                  {formatTimeString(temple?.basicDetails?.eveningSchedule?.startTime)}
                  {' - '}
                  {formatTimeString(temple?.basicDetails?.eveningSchedule?.endTime)}
                </span>
              </div>
              <div className="flex flex-col items-center rounded bg-amber-50 p-3">
                <Globe className="mb-1 h-5 w-5 text-orange-500" />
                <span className="text-xs text-gray-600 md:text-sm">Main Deity</span>
                <span className="text-sm font-medium text-amber-900 md:text-base">
                  {temple?.basicDetails?.mainDeityName}
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
              className="text-md md:text-md flex cursor-pointer items-center justify-center rounded-lg bg-amber-600 py-3 font-medium text-white"
              onClick={() => navigate(`/temple-details/pooja-booking/${temple?.id}`)}
            >
              <Gift className="mr-1 h-5 w-5" />
              Book Pooja
            </button>

            <button
              className="text-md md:text-md flex cursor-pointer items-center justify-center rounded-lg bg-amber-100 py-3 font-medium text-amber-900"
              onClick={() => setIsContactModalOpen(true)}
            >
              <Phone className="mr-1 h-5 w-5" />
              Contact
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto border-b border-amber-200 md:justify-center md:overflow-visible">
            {/* {['about', 'photos', 'events', 'reviews', 'nearby'].map((tab) => ( */}
            {['about', 'photos'].map((tab) => (
              <button
                key={tab}
                className={`cursor-pointer px-4 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-orange-500 text-orange-500'
                    : 'text-gray-600'
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
          {activeTab === 'about' && (
            <div className="space-y-6">
              {/* Description */}
              <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm md:p-6">
                <h3 className="mb-3 font-serif text-lg text-amber-900 md:text-xl">
                  About the Temple
                </h3>
                <div className={!readMoreDescription ? 'line-clamp-5' : 'line-clamp-none'}>
                  <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                    {temple?.basicDetails?.description ||
                      `This magnificent temple is one of the most revered shrines in ${temple?.contactDetails?.address}. The temple showcases remarkable architecture with intricate carvings and sculptures that depict various mythological stories and deities.`}
                  </p>
                </div>
                <div
                  onClick={() => setReadMoreDescription(!readMoreDescription)}
                  className="mt-4 cursor-pointer text-sm font-medium text-orange-500"
                >
                  {readMoreDescription ? 'Show Less' : 'Read More'}
                </div>
              </div>

              <TemplePoojas templeId={temple?.id} />

              {/* Features & Amenities */}
              <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm md:p-6">
                <h3 className="mb-3 font-serif text-lg text-amber-900 md:text-xl">
                  Features & Amenities
                </h3>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                  {temple?.basicDetails?.amenities &&
                    temple?.basicDetails?.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center rounded bg-amber-50 p-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-orange-500">
                          <Check className="h-4 w-4" />
                        </div>
                        <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* History & Significance */}
              <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm md:p-6">
                <h3 className="mb-3 font-serif text-lg text-amber-900 md:text-xl">
                  History & Significance
                </h3>
                <div className={!readMoreHistory ? 'line-clamp-5' : 'line-clamp-none'}>
                  <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                    {temple?.basicDetails?.templeHistory ||
                      `The temple has a rich history dating back to ancient times. It was built during
                    the reign of a prominent dynasty and has withstood the test of time. The temple
                    holds immense religious and cultural significance for devotees who visit from
                    all parts of the country.`}
                  </p>
                </div>
                <div
                  onClick={() => setReadMoreHistory(!readMoreHistory)}
                  className="mt-4 cursor-pointer text-sm font-medium text-orange-500"
                >
                  {readMoreHistory ? 'Show Less' : 'Read More'}
                </div>
              </div>

              {/* Location & How to Reach */}
              <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm md:p-6">
                <h3 className="mb-3 font-serif text-lg text-amber-900 md:text-xl">
                  Location & How to Reach
                </h3>
                <div className="relative mb-3 flex h-48 items-center justify-center overflow-hidden rounded-lg bg-amber-100 md:h-64">
                  <iframe
                    src={temple?.contactDetails?.locationLink}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                  ></iframe>
                </div>
                <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                  The temple is located in {temple?.contactDetails?.address}. It is easily
                  accessible by road and Local transport options include buses, taxis, and
                  auto-rickshaws.
                </p>
              </div>

              {/* Visiting Tips */}
              {temple?.basicDetails?.rules && (
                <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm md:p-6">
                  <h3 className="mb-3 font-serif text-lg text-amber-900 md:text-xl">
                    Visiting Tips
                  </h3>
                  <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700 md:space-y-3 md:text-base">
                    {(temple?.basicDetails?.rules.match(/\d+\s[^0-9]+/g) || []).map(
                      (rule, index) => (
                        <li key={index}>{rule.replace(/^\d+\s*/, '').trim()}</li>
                      ),
                    )}
                  </ol>
                </div>
              )}
            </div>
          )}

          {activeTab === 'photos' && <TempleGallery />}

          {activeTab === 'events' && (
            <div className="space-y-4">
              <h3 className="mb-2 font-serif text-lg text-amber-900 md:text-xl">
                Upcoming Events & Festivals
              </h3>
              <div className="space-y-3 md:space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-amber-100 bg-white p-3 shadow-sm md:p-4"
                  >
                    <div className="flex">
                      <div className="flex min-w-16 flex-col items-center justify-center rounded-lg bg-orange-100 p-3 text-orange-500 md:min-w-20">
                        <span className="text-sm font-bold md:text-base">
                          {['APR', 'MAY', 'JUN'][index]}
                        </span>
                        <span className="text-lg font-bold md:text-xl">{[15, 24, 8][index]}</span>
                      </div>
                      <div className="ml-3 md:ml-4">
                        <h4 className="text-sm font-medium text-amber-900 md:text-base">
                          {
                            [
                              'Annual Temple Festival',
                              'Chariot Procession',
                              'Special Puja Ceremony',
                            ][index]
                          }
                        </h4>
                        <p className="mt-1 text-xs text-gray-600 md:text-sm">
                          {
                            [
                              'A week-long celebration with cultural programs and special rituals.',
                              'The grand chariot procession around the temple complex.',
                              'Special prayers conducted by the head priest.',
                            ][index]
                          }
                        </p>
                        <div className="mt-2 flex items-center text-xs text-gray-600 md:text-sm">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>
                            {
                              ['5:00 AM - 10:00 PM', '6:00 AM - 9:00 PM', '7:00 AM - 8:00 PM'][
                                index
                              ]
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 flex w-full items-center justify-center rounded-lg bg-amber-100 px-4 py-3 text-sm font-medium text-amber-900 md:text-base">
                <Calendar className="mr-2 h-4 w-4" />
                View All Events
              </button>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-amber-900 md:text-xl">Reviews & Ratings</h3>
                <button
                  className="text-sm font-medium text-orange-500 md:text-base"
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  Write a Review
                </button>
              </div>

              <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-orange-500">
                        <span className="font-medium">D</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-amber-900 md:text-base">
                          Devesh Singh
                        </h4>
                        <p className="text-xs text-gray-600 md:text-sm">Visited 2 months ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">{renderRating(4.5)}</div>
                </div>
                <p className="mb-3 text-sm text-gray-700 md:text-base">
                  This temple is a must-visit for anyone interested in spiritual heritage. The
                  architecture is breathtaking and the ambience is so peaceful. I spent hours here
                  just taking in the beauty and serenity.
                </p>
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <div className="flex items-center text-gray-600">
                    <Heart className="mr-1 h-3 w-3" />
                    <span>24 Helpful</span>
                  </div>
                  <button className="text-orange-500">Reply</button>
                </div>
              </div>

              <div className="rounded-lg border border-amber-100 bg-white p-4 shadow-sm md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-orange-500">
                        <span className="font-medium">R</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-amber-900 md:text-base">
                          Radha Kumari
                        </h4>
                        <p className="text-xs text-gray-600 md:text-sm">Visited 3 weeks ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">{renderRating(5)}</div>
                </div>
                <p className="mb-3 text-sm text-gray-700 md:text-base">
                  The experience was divine! The temple is well-maintained and the priests were very
                  helpful. I participated in the evening aarti which was a soul-stirring experience.
                  Highly recommend visiting during festival time.
                </p>
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <div className="flex items-center text-gray-600">
                    <Heart className="mr-1 h-3 w-3" />
                    <span>18 Helpful</span>
                  </div>
                  <button className="text-orange-500">Reply</button>
                </div>
              </div>

              <button className="mt-3 flex w-full items-center justify-center rounded-lg bg-amber-100 px-4 py-3 text-sm font-medium text-amber-900 md:text-base">
                <MessageSquare className="mr-2 h-4 w-4" />
                Read All Reviews
              </button>
            </div>
          )}

          {activeTab === 'nearby' && (
            <div className="space-y-4">
              <h3 className="mb-2 font-serif text-lg text-amber-900 md:text-xl">
                Nearby Attractions
              </h3>
              <div className="space-y-3 md:space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex overflow-hidden rounded-lg border border-amber-100 bg-white shadow-sm"
                  >
                    <div className="flex w-20 items-center justify-center bg-amber-100 md:w-32">
                      <Image className="h-8 w-8 text-orange-500" />
                    </div>
                    <div className="flex-1 p-3 md:p-4">
                      <h4 className="text-sm font-medium text-amber-900 md:text-base">
                        {['Sacred Lake', 'Ancient Fort', 'Heritage Museum'][index]}
                      </h4>
                      <div className="mt-1 flex items-center text-xs text-gray-600 md:text-sm">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>{[2, 5, 3.5][index]} km away</span>
                      </div>
                      <div className="mt-2">
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800 md:text-sm">
                          {['Natural', 'Historical', 'Cultural'][index]}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 flex w-full items-center justify-center rounded-lg bg-amber-100 px-4 py-3 text-sm font-medium text-amber-900 md:text-base">
                <MapPin className="mr-2 h-4 w-4" />
                View All Nearby Places
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        contactDetails={temple?.contactDetails}
      />

      {/* Floating Action Button - Adjusted position for mobile */}
      <FloatingActionButton />
    </div>
  );
};

export default TempleDetails;
