import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../contexts/auth/AuthContext";
import { LOGOUT } from "../../contexts/auth/authActionTypes";

const Logout = () => {
  const { dispatch } = useAuth();

  useEffect(() => {
    async function logout() {
      try {
        await signOut(auth);
        dispatch({ type: LOGOUT });
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
    logout();
  }, [dispatch]);

  return null;
};

export default Logout;
