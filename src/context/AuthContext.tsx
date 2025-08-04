import { createContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  isLoading: boolean;
  refreshAuth: () => void;
}>({
  isAuthenticated: false,
  setAuthenticated: () => {},
  isLoading: true,
  refreshAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("access"); // Back to "access" to match backend
    console.log("AuthProvider - Raw token:", token);
    console.log("AuthProvider - Token found:", !!token);
    console.log(
      "AuthProvider - All localStorage keys:",
      Object.keys(localStorage)
    );
    console.log("AuthProvider - Setting authenticated to:", !!token);
    setAuthenticated(!!token);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();

    // Listen for storage changes (including from the same tab)
    const handleStorageChange = () => {
      console.log("Storage changed, rechecking auth...");
      checkAuthStatus();
    };

    // Listen for localStorage changes
    window.addEventListener("storage", handleStorageChange);

    // Custom event listener for same-tab storage changes
    window.addEventListener("localStorageChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChange", handleStorageChange);
    };
  }, []);

  const refreshAuth = () => {
    console.log("Manually refreshing auth state");
    checkAuthStatus();
  };

  const setAuthenticatedWrapper = (value: boolean) => {
    setAuthenticated(value);
    if (!value) {
      // Clear tokens when logging out - match backend keys
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
