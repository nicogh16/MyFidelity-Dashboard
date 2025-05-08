import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          Produits populaires
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image}
              calories={product.calories}
              rating={product.rating}
              lowCO2={product.lowCO2}
              bestseller={product.bestseller}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
