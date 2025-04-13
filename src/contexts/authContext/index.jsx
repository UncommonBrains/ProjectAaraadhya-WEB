import React from "react";
import { useState, useContext, useEffect, createContext } from "react";
import { auth } from "../../firebase/firebase"
import {onAuthStateChanged} from "firebase/auth"


const AuthContext = createContext();

export function useAuth () {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    displayName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser)
    return unsubscribe
  }, [])

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
      // Update userData when user logs in
      setUserData({
        displayName: user.displayName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
      });
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      // Reset userData when user logs out
      setUserData({
        displayName: '',
        email: '',
        phone: '',
      });
      
    }
    setLoading(false);
  }

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    userData
  }

  return(
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}