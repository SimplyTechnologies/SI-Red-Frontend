import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

interface PublicOnlyRouteProps {
  children: ReactNode;
}

export default function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { isAuthenticated, isInitialized } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      navigate("/");
    }
  }, [isInitialized, isAuthenticated, navigate]);

  if (!isInitialized) {
    return null;
  }

  return !isAuthenticated ? <>{children}</> : null;
}
