import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RestaurantCardProps {
  name: string;
  image: string;
  status: "open" | "closed";
  className?: string;
}

export function RestaurantCard({
  name,
  image,
  status,
  className,
}: RestaurantCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-md p-4 flex flex-col items-center",
        className,
      )}
    >
      <div className="relative mb-3">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
      <h3 className="font-medium text-lg mb-1">{name}</h3>
      <Badge
        variant={status === "open" ? "default" : "secondary"}
        className="mb-3"
      >
        {status === "open" ? "Ouvert" : "Fermé"}
      </Badge>
      <Button size="sm" className="w-full">
        Modifier
      </Button>
    </div>
  );
}
