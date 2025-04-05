import { useState, useEffect, useRef } from "react";
import { MdAdd, MdEvent, MdTempleHindu, MdBookmark } from "react-icons/md";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-14 right-0 sm:bottom-0 sm:right-0 z-50">
      {/* Expanding Quarter Circle Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-0 right-0 bg-orange-200 rounded-tl-full shadow-lg bg-opacity-80"
          style={{ width: "300px", height: "300px", }}
        >
          {/* Positioned Buttons */}
          <div
            className="absolute flex flex-col items-center"
            style={{ bottom: "60%", right: "15%" }}
          >
            <button className="flex items-center justify-center bg-white text-orange-500 p-2 rounded-full shadow-lg">
              <MdTempleHindu className="h-6 w-6" />
            </button>
            <span className="text-s text-orange-700 mt-2 ">My Temples</span>
          </div>

          <div
            className="absolute flex flex-col items-center"
            style={{ bottom: "45%", right: "45%" }}
          >
            <button className="flex items-center justify-center bg-white text-orange-500 p-2 rounded-full shadow-lg">
              <MdEvent className="h-6 w-6" />
            </button>
            <span className="text-s text-orange-700 mt-2 ">Book Pooja</span>
          </div>

          <div
            className="absolute flex flex-col items-center"
            style={{ bottom: "15%", right: "60%" }}
          >
            <button className="flex items-center justify-center bg-white text-orange-500 p-2 rounded-full shadow-lg">
              <MdBookmark className="h-6 w-6" />
            </button>
            <span className="text-s text-orange-700 mt-2 ">My Bookings</span>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        ref={buttonRef}
        className="bg-orange-500 h-16 w-16  rounded-full flex items-center justify-center text-white shadow-lg z-50 relative mb-16 md:mb-4 mr-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdAdd
          className={`h-8 w-8 transition-transform ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        />
      </button>
    </div>
  );
};

export default FloatingActionButton;
