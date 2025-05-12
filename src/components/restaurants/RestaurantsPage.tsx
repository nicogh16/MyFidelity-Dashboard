import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar, Plus, CheckCircle, XCircle, MoreVertical } from "lucide-react";
import { PageLayout } from "../layout/PageLayout";
import { useRestaurants } from "../context/RestaurantsProvider";
import { defaultRestaurantImages } from "../../lib/constants";

function StatusBadge({ status }: { status: string }) {
  return status === "open" ? (
    <Badge className="bg-success text-white flex items-center gap-1">
      <CheckCircle className="w-4 h-4" /> Ouvert
    </Badge>
  ) : (
    <Badge className="bg-error text-white flex items-center gap-1">
      <XCircle className="w-4 h-4" /> Fermé
    </Badge>
  );
}

export default function RestaurantsPage() {
  const { restaurants, loading, error } = useRestaurants();

  const actionButton = (
    <Button className="bg-primary hover:bg-primary/90 text-white font-semibold flex items-center gap-2 px-4 py-2 rounded-lg shadow-md">
      <Plus className="w-5 h-5" />
      Ajouter un restaurant
    </Button>
  );

  if (loading) {
    return (
      <PageLayout
        title="Restaurants"
        subtitle="Gestion de l'horaire des restaurants"
        actionButton={actionButton}
      >
        <div className="text-center text-gray-400 py-12">Chargement des données...</div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout
        title="Restaurants"
        subtitle="Gestion de l'horaire des restaurants"
        actionButton={actionButton}
      >
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Restaurants"
      subtitle="Gestion de l'horaire des restaurants"
      actionButton={actionButton}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-xl group border border-pearl/60"
          >
            <div className="relative mb-4">
              <img
                src={restaurant.image || defaultRestaurantImages[restaurant.name] || defaultRestaurantImages.default}
                alt={restaurant.name}
                className="w-20 h-20 rounded-full border-4 border-pearl object-cover shadow"
              />
              <button className="absolute top-0 right-0 bg-pearl rounded-full p-1 shadow hover:bg-gold transition">
                <MoreVertical className="w-4 h-4 text-nightblue" />
              </button>
            </div>
            <h3 className="text-lg font-bold text-nightblue mb-1 text-center">{restaurant.name}</h3>
            <StatusBadge status={restaurant.status} />
            <div className="flex items-center gap-2 text-pearl mt-2 mb-4">
              <Calendar className="w-4 h-4 text-gold" />
              <span className="text-sm text-nightblue">
                Horaire : {restaurant.schedule ? `${restaurant.schedule[0].open} - ${restaurant.schedule[0].close}` : "-"}
              </span>
            </div>
            <Button className="mt-auto w-full bg-[#FFB74D] hover:bg-[#FFA726] text-white font-semibold rounded-lg shadow transition">
              Modifier
            </Button>
          </div>
        ))}
      </div>
    </PageLayout>
  );
} 