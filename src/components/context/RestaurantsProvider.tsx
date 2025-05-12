import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

const RestaurantsContext = createContext(null);

export function RestaurantsProvider({ children }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chargement initial
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from("restaurants").select("*");
      if (error) throw error;
      setRestaurants(data || []);
    } catch (err) {
      setError("Erreur lors du chargement des restaurants");
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  // Pour rafraîchir manuellement
  const refresh = () => fetchRestaurants();

  return (
    <RestaurantsContext.Provider value={{ restaurants, loading, error, refresh }}>
      {children}
    </RestaurantsContext.Provider>
  );
}

export function useRestaurants() {
  const ctx = useContext(RestaurantsContext);
  if (!ctx) throw new Error("useRestaurants doit être utilisé dans RestaurantsProvider");
  return ctx;
} 