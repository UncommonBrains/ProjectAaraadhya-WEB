import React from 'react';
import { useLocation } from 'react-router-dom';

interface DevoteeStoreLinkProps {
  onClose?: () => void;
}

const DevoteeStoreLink: React.FC<DevoteeStoreLinkProps> = ({ onClose }) => {
  const location = useLocation();
  const isActive = location.pathname === '/devotee-store';
  const REACT_APP_AUTH_API_BASE_URL= "http://localhost:5000"
  const REACT_APP_BASE_URL= "http://localhost:3002"

  const handleClick = async () => {
    onClose?.(); // Close dropdown if provided

    // Generate random user details
    const randomId = Math.floor(Math.random() * 100000);
    const dummyUser = {
      name: `Temp User ${randomId}`,
      email: `tempuser${randomId}@example.com`,
      mobile: `99999${Math.floor(10000 + Math.random() * 89999)}`,
    };

    try {
      const response = await fetch(`${REACT_APP_AUTH_API_BASE_URL}/api/auth/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dummyUser)
      });

      const result = await response.json();
      if (response.ok) {
        console.log('User sent to Devotee Store:', result);
        console.log('result:', result);
        
        // window.open("https://store.aaraadhya.in", "_blank");
        const newWindow = window.open(`${REACT_APP_BASE_URL}`, '_blank');

        if (newWindow) {
          newWindow.onload = () => {
            newWindow.postMessage({ token: result.userToken }, REACT_APP_BASE_URL );
          };
        } else {
          console.error('Failed to open new window');
        }
      } else {
        console.error('Failed to send:', result);
      }
    } catch (error) {
      console.error('Error sending user:', error);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`block cursor-pointer px-4 py-2 ${
        isActive ? 'font-bold text-orange-600' : 'text-gray-600 hover:bg-amber-50'
      }`}
    >
      Devotee Store
    </div>
  );
};

export default DevoteeStoreLink;
