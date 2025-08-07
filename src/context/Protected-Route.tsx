import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Use-Auth";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    // Explicitly check authentication when protected route is accessed
    const performAuthCheck = async () => {
      if (!hasCheckedAuth) {
        console.log("🔒 Protected route accessed, checking auth...");
        await checkAuth();
        setHasCheckedAuth(true);
      }
    };

    performAuthCheck();
  }, [checkAuth, hasCheckedAuth]);

  // Show loading while checking authentication status
  if (isLoading || !hasCheckedAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
