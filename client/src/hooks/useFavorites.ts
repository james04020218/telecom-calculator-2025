import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useFavorites() {
  const queryClient = useQueryClient();
  
  const { data: preferences } = useQuery({
    queryKey: ["/api/preferences"],
  });

  const favorites = preferences?.favorites || [];

  const addFavorite = async (telecomId: string) => {
    if (!favorites.includes(telecomId)) {
      const newFavorites = [...favorites, telecomId];
      
      await fetch("/api/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...preferences,
          favorites: newFavorites,
        }),
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });
    }
  };

  const removeFavorite = async (telecomId: string) => {
    const newFavorites = favorites.filter((id: string) => id !== telecomId);
    
    await fetch("/api/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...preferences,
        favorites: newFavorites,
      }),
    });
    
    queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });
  };

  const toggleFavorite = (telecomId: string) => {
    if (favorites.includes(telecomId)) {
      removeFavorite(telecomId);
    } else {
      addFavorite(telecomId);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}
