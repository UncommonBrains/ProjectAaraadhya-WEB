import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken"); // Remove the stored token
    alert("Logout successful!"); // ✅ Show alert
    navigate("/login"); // Redirect to login page
  }, [navigate]);

  return null;
};

export default Logout;
