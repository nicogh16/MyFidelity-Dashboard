import React, { useEffect, useState } from "react";
import { Sidebar } from "../dashboard/Sidebar";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";

function ScrollToTop({ onScrollEnd }: { onScrollEnd: () => void }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Attendre la fin du scroll (approximation)
    const timeout = setTimeout(() => {
      onScrollEnd();
    }, 150); // 400ms pour laisser le scroll smooth se terminer
    return () => clearTimeout(timeout);
  }, [pathname]);
  return null;
}

interface PageLayoutProps {
  children: React.ReactNode;
  title: React.ReactNode;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export function PageLayout({ children, title, subtitle, actionButton }: PageLayoutProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const [canAnimate, setCanAnimate] = useState(false);

  return (
    <div className="flex bg-slate-50 min-h-screen relative overflow-hidden">
      <ScrollToTop onScrollEnd={() => setCanAnimate(true)} />
      {/* SVG décoratif de fond avec effet parallaxe */}
      <motion.div style={{ y }} className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1920 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <polygon id="poly1" points="0,1080 400,600 800,1080" fill="#e5e7eb" opacity="0.5" />
          <polygon id="poly2" points="1120,1080 1520,600 1920,1080" fill="#e5e7eb" opacity="0.4" />
          <polygon id="poly3" points="480,1080 960,300 1440,1080" fill="#6b7280" opacity="0.07" />
          <polygon id="poly4" points="0,0 200,200 0,400" fill="#6b7280" opacity="0.10" />
          <polygon id="poly5" points="1920,0 1720,200 1920,400" fill="#6b7280" opacity="0.10" />
          <polygon id="poly6" points="960,0 1040,120 880,120" fill="#e5e7eb" opacity="0.18" />
          <polygon id="poly7" points="200,200 400,350 300,500" fill="#fff" opacity="0.13" />
          <polygon id="poly8" points="1720,200 1520,350 1620,500" fill="#fff" opacity="0.13" />
        </svg>
      </motion.div>

      <Sidebar />
      <div className="flex-1 ml-64 relative z-10 w-full max-w-7xl mx-auto">
        {/* Contenu de la page */}
        <div className={canAnimate ? "p-6 animate-fadein-smooth" : "p-6 opacity-0"}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">{title}</h1>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
            {actionButton}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
} 