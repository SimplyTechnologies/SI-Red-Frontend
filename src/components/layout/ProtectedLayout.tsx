import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { isAuthenticated, isInitialized } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate("/signin");
    }
  }, [isInitialized, isAuthenticated, navigate]);

  if (!isInitialized) {
    return null;
  }

  return isAuthenticated ? <>{children}</> : null;
}
