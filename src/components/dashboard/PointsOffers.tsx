import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OfferProps {
  name: string;
  points: number;
  image: string;
}

function Offer({ name, points, image }: OfferProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
      <div className="h-12 w-12 rounded-md overflow-hidden shrink-0">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{name}</h4>
        <p className="text-sm font-semibold text-primary">{points} pts</p>
      </div>
    </div>
  );
}

interface PointsOffersProps {
  className?: string;
}

const OFFERS = [
  {
    id: "1",
    name: "Donut",
    points: 200,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&q=80",
  },
  {
    id: "2",
    name: "Burger Poulet",
    points: 1500,
    image:
      "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?w=200&q=80",
  },
  {
    id: "3",
    name: "Café Premium",
    points: 350,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&q=80",
  },
];

export function PointsOffers({ className }: PointsOffersProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Offres à l'affiche
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {OFFERS.map((offer) => (
            <Offer
              key={offer.id}
              name={offer.name}
              points={offer.points}
              image={offer.image}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
