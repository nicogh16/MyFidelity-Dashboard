import { useEffect } from "react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onFinish(), 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden animate-splash-bg">
      {/* Logo animé bounce-in */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="text-5xl font-bold tracking-tight splash-title-shadow animate-bouncein" style={{fontFamily: "'Poppins', sans-serif", letterSpacing: "-1px"}}>
          <span style={{color: "#FDC830"}}>My</span><span style={{color: "#fff"}}>Fidelity</span>
        </div>
        {/* Cercle de chargement moderne */}
        <div className="splash-spinner mt-8"></div>
      </div>
      {/* Texte bas */}
      <div className="splash-madeby">
        Made By Groupe-405
      </div>
    </div>
  );
} 