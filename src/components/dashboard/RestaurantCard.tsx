import React from "react";
import { cn } from "@/lib/utils";

interface RestaurantCardProps {
  name: string;
  image: string;
  status: "open" | "closed";
  specialHours?: boolean;
  onEdit?: () => void;
  className?: string;
}

export function RestaurantCard({
  name,
  image,
  status,
  specialHours,
  onEdit,
  className,
}: RestaurantCardProps) {
  return (
    <div className="relative bg-white rounded-lg shadow p-4 flex flex-col items-center">
      {/* Badge horaire spécial */}
      {specialHours && (
        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded shadow">Horaire spécial</span>
      )}
      {/* Statut ouvert/fermé */}
      <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded ${status === "open" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
        {status === "open" ? "Ouvert" : "Fermé"}
      </span>
      {/* Image */}
      <img src={image} alt={name} className="w-16 h-16 rounded-full mb-2 mt-6" />
      <div className="font-semibold text-lg mb-1">{name}</div>
      {/* Bouton modifier stylé en bas */}
      <button
        className="mt-4 w-full bg-[#FFB74D] hover:bg-[#FFA726] text-white text-sm py-2 rounded shadow transition font-semibold"
        onClick={onEdit}
      >
        Modifier
      </button>
    </div>
  );
}
