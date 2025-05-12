import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

interface OfferProps {
  name: string;
  points: number;
  image: string;
  isNew?: boolean;
  status?: string;
}

function Offer({ name, points, image, isNew, status }: OfferProps) {
  return (
    <div className={`relative flex flex-col items-center justify-between bg-white rounded-xl shadow-sm p-4 min-w-[140px] max-w-[160px] mx-1 border border-slate-100 transition-transform hover:-translate-y-1 hover:shadow-md animate-fadein-smooth ${status === 'inactive' ? 'opacity-60 grayscale' : ''}`}>
      <div className="relative mb-2">
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-sm"
        />
        <span className="absolute -top-2 -right-2 bg-slate-800 text-white text-xs font-semibold px-2 py-0.5 rounded-full border border-white shadow-sm">
          {points} pts
        </span>
        {isNew && (
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">Nouveau</span>
        )}
      </div>
      <div className="flex flex-col items-center">
        <h4 className="font-semibold text-center text-sm mb-1 text-gray-800">
          {name}
        </h4>
      </div>
    </div>
  );
}

interface PointsOffersProps {
  className?: string;
  offers?: any[];
}

const OFFERS = [
  {
    id: "1",
    name: "Donut",
    points: 200,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&q=80",
    isNew: true,
  },
  {
    id: "2",
    name: "Burger Poulet",
    points: 1500,
    image:
      "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?w=200&q=80",
    isNew: false,
  },
  {
    id: "3",
    name: "Café Premium",
    points: 350,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&q=80",
    isNew: true,
  },
];

export function PointsOffers({ className, offers }: PointsOffersProps) {
  const sortedOffers = [...(offers || OFFERS)].filter(o => o.status === 'active').sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const visibleCount = 2; // Nombre d'offres visibles à la fois (ajuste selon la taille)

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
    const newIndex = Math.min(sortedOffers.length - visibleCount, scrollIndex + 1);
    setScrollIndex(newIndex);
    scrollToIndex(newIndex);
  };

  return (
    <Card className={cn("w-full bg-white border border-slate-100 shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-gray-800 tracking-tight">
          Offres spéciales
        </CardTitle>
        <Link 
          to="/offers" 
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
            {sortedOffers.map((offer) => (
              <Offer
                key={offer.id}
                name={offer.name}
                points={offer.points}
                image={offer.image}
                isNew={offer.isNew}
                status={offer.status}
              />
            ))}
          </div>
          <button
            className="absolute right-0 z-10 bg-white border border-slate-200 rounded-full shadow-sm p-1 -mr-3 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={scrollIndex >= sortedOffers.length - visibleCount}
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
