// src/pages/FallbackRedirect.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/userAuthStore";

const FallbackRedirect = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/signin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return null;
};

export default FallbackRedirect;
