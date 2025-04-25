import { useState, useEffect, useRef } from 'react';
import { MdAdd, MdEvent, MdTempleHindu, MdBookmark } from 'react-icons/md';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-14 right-0 z-50 sm:bottom-0 sm:right-0">
      {/* Expanding Quarter Circle Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-0 right-0 rounded-tl-full bg-orange-200 bg-opacity-80 shadow-lg"
          style={{ width: '300px', height: '300px' }}
        >
          {/* Positioned Buttons */}
          <div
            className="absolute flex flex-col items-center"
            style={{ bottom: '60%', right: '15%' }}
          >
            <button className="flex items-center justify-center rounded-full bg-white p-2 text-orange-500 shadow-lg">
              <MdTempleHindu className="h-6 w-6" />
            </button>
            <span className="text-s mt-2 text-orange-700">My Temples</span>
          </div>

          <div
            className="absolute flex flex-col items-center"
            style={{ bottom: '45%', right: '45%' }}
          >
            <button className="flex items-center justify-center rounded-full bg-white p-2 text-orange-500 shadow-lg">
              <MdEvent className="h-6 w-6" />
            </button>
            <span className="text-s mt-2 text-orange-700">Book Pooja</span>
          </div>

          <div
            className="absolute flex flex-col items-center"
            style={{ bottom: '15%', right: '60%' }}
          >
            <button className="flex items-center justify-center rounded-full bg-white p-2 text-orange-500 shadow-lg">
              <MdBookmark className="h-6 w-6" />
            </button>
            <span className="text-s mt-2 text-orange-700">My Bookings</span>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        ref={buttonRef}
        className="relative z-50 mb-16 mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg md:mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdAdd className={`h-8 w-8 transition-transform ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
      </button>
    </div>
  );
};

export default FloatingActionButton;
