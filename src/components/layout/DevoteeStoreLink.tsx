import React from 'react';
import { useLocation } from 'react-router-dom';

interface DevoteeStoreLinkProps {
  onClose?: () => void;
}

const DevoteeStoreLink: React.FC<DevoteeStoreLinkProps> = ({ onClose }) => {
  const location = useLocation();
  const isActive = location.pathname === '/devotee-store';
  const REACT_APP_AUTH_API_BASE_URL= "http://localhost:5000"

  const handleClick = async () => {
    onClose?.(); // Close dropdown if provided

    const dummyUser = {
      uid: "demoUser123",
      name: "Gokul Bhattathiri",
      email: "gokul@example.com",
      phone: "9999999999",
      joinedAt: new Date().toISOString()
    };

    try {
      const response = await fetch(`${REACT_APP_AUTH_API_BASE_URL}/api/auth/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dummyUser)
      });

      const result = await response.json();
      if (response.ok) {
        console.log("User sent to Devotee Store:", result);
        window.open("https://store.aaraadhya.in", "_blank");
      } else {
        console.error("Failed to send:", result);
      }
    } catch (error) {
      console.error("Error sending user:", error);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`block px-4 py-2 cursor-pointer ${
        isActive
          ? 'font-bold text-orange-600'
          : 'text-gray-600 hover:bg-amber-50'
      }`}
    >
      Devotee Store
    </div>
  );
};

export default DevoteeStoreLink;
