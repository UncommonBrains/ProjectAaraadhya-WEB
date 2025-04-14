// Logout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth"; // update path if needed

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    doSignOut()
      .then(() => {
        navigate("/auth"); // redirect after sign out
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        navigate("/auth"); // optionally handle error better
      });
  }, [navigate]);

  return null; // or a loading spinner
};

export default Logout;
