import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ProductCardProps {
  name: string;
  image: string;
  calories: number;
  rating: number;
  lowCO2?: boolean;
  bestseller?: boolean;
  className?: string;
}

export function ProductCard({
  name,
  image,
  calories,
  rating,
  lowCO2 = false,
  bestseller = false,
  className,
}: ProductCardProps) {
  return (
    <Card className={cn("w-[220px] overflow-hidden", className)}>
      <div className="relative h-36 w-full">
        <img src={image} alt={name} className="h-full w-full object-cover" />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {lowCO2 && (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800"
            >
              Low CO2
            </Badge>
          )}
          {bestseller && (
            <Badge className="bg-amber-500 hover:bg-amber-600">
              Bestseller
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium truncate">{name}</h3>
          <Badge variant="outline" className="ml-1 shrink-0">
            {calories} Kcal
          </Badge>
        </div>
        <div className="flex items-center">
          <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
          <span className="text-sm font-medium">{rating.toFixed(1)}/5</span>
        </div>
      </CardContent>
    </Card>
  );
}
