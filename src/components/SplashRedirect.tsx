import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SplashScreen from "./SplashScreen";

export default function SplashRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return <SplashScreen onFinish={() => {}} />;
} 