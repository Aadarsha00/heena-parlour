/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.tsx
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  isLoading: boolean;
  refreshAuth: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuthenticated: () => {},
  isLoading: true,
  refreshAuth: () => {},
});

let authContextRef: {
  setAuthenticated?: (value: boolean) => void;
  refreshAuth?: () => void;
} = {};

export const setAuthContextRef = (ref: typeof authContextRef) => {
  authContextRef = ref;
};

export const getAuthContextRef = () => authContextRef;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("access");
    setAuthenticated(!!token);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();

    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChange", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Register the context methods globally
    setAuthContextRef({
      setAuthenticated: setAuthenticatedWrapper,
      refreshAuth,
    });
  }, []);

  const refreshAuth = () => {
    checkAuthStatus();
  };

  const setAuthenticatedWrapper = (value: boolean) => {
    setAuthenticated(value);
    if (!value) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated: setAuthenticatedWrapper,
        isLoading,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
