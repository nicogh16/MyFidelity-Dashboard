import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

interface ProductCarouselProps {
  className?: string;
}

const PRODUCTS = [
  {
    id: "1",
    name: "Burger Classic",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    calories: 800,
    rating: 4.2,
    lowCO2: false,
    bestseller: true,
  },
  {
    id: "2",
    name: "Salade César",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
    calories: 350,
    rating: 4.5,
    lowCO2: true,
    bestseller: false,
  },
  {
    id: "3",
    name: "Pizza Margherita",
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&q=80",
    calories: 750,
    rating: 4.7,
    lowCO2: false,
    bestseller: true,
  },
  {
    id: "4",
    name: "Poke Bowl",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80",
    calories: 450,
    rating: 4.8,
    lowCO2: true,
    bestseller: false,
  },
  {
    id: "5",
    name: "Pasta Carbonara",
    image:
      "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=500&q=80",
    calories: 650,
    rating: 4.3,
    lowCO2: false,
    bestseller: false,
  },
];

export function ProductCarousel({ className }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const visibleCount = 2; // Nombre de produits visibles à la fois

  const scrollToIndex = (idx: number) => {
    if (!scrollRef.current) return;
    const children = scrollRef.current.children;
    if (children[idx]) {
      (children[idx] as HTMLElement).scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, scrollIndex - 1);
    setScrollIndex(newIndex);
    scrollToIndex(newIndex);
  };
  const handleNext = () => {
    const newIndex = Math.min(PRODUCTS.length - visibleCount, scrollIndex + 1);
    setScrollIndex(newIndex);
    scrollToIndex(newIndex);
  };

  return (
    <Card className={cn("w-full bg-white border border-slate-100 shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-gray-800 tracking-tight">
          Produits populaires
        </CardTitle>
        <Link 
          to="/restaurants" 
          className="text-sm text-[#FFB74D] hover:text-[#FFA726] flex items-center gap-1 transition-colors duration-200"
        >
          Voir plus <ChevronRight className="w-4 h-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="relative flex items-center">
          <button
            className="absolute left-0 z-10 bg-white border border-slate-200 rounded-full shadow-sm p-1 -ml-3 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handlePrev}
            disabled={scrollIndex === 0}
            aria-label="Précédent"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <ChevronLeft size={18} />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-hidden pb-2 px-1 w-full"
            style={{ scrollBehavior: 'smooth' }}
          >
            {PRODUCTS.map((product) => (
              <div key={product.id} className="animate-fadein-smooth">
                <ProductCard
                  name={product.name}
                  image={product.image}
                  calories={product.calories}
                  rating={product.rating}
                  lowCO2={product.lowCO2}
                  bestseller={product.bestseller}
                />
              </div>
            ))}
          </div>
          <button
            className="absolute right-0 z-10 bg-white border border-slate-200 rounded-full shadow-sm p-1 -mr-3 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={scrollIndex >= PRODUCTS.length - visibleCount}
            aria-label="Suivant"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

// Animation CSS à ajouter dans index.css ou tailwind.config.js :
// .animate-fadein-smooth { animation: fadein-smooth 1.2s cubic-bezier(.4,0,.2,1); }
// @keyframes fadein-smooth { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
// Pour masquer la scrollbar :
// .overflow-x-hidden::-webkit-scrollbar { display: none; }
