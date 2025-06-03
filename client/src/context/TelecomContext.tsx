import { createContext, useContext, ReactNode } from "react";
import { useTelecomCalculator } from "@/hooks/useTelecomCalculator";
import { useFavorites } from "@/hooks/useFavorites";
import { useComparison } from "@/hooks/useComparison";

interface TelecomContextType {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  comparisonMode: boolean;
  setComparisonMode: (mode: boolean) => void;
  isLoading: boolean;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  favorites: string[];
  addFavorite: (telecomId: string) => void;
  removeFavorite: (telecomId: string) => void;
  toggleFavorite: (telecomId: string) => void;
  selectedCalculators: string[];
  addCalculator: (calculatorId: string) => void;
  removeCalculator: (calculatorId: string) => void;
  clearComparison: () => void;
}

const TelecomContext = createContext<TelecomContextType | undefined>(undefined);

export function TelecomProvider({ children }: { children: ReactNode }) {
  const calculator = useTelecomCalculator();
  const favoritesHook = useFavorites();
  const comparison = useComparison();

  const value: TelecomContextType = {
    ...calculator,
    ...favoritesHook,
    ...comparison,
  };

  return (
    <TelecomContext.Provider value={value}>
      {children}
    </TelecomContext.Provider>
  );
}

export function useTelecom() {
  const context = useContext(TelecomContext);
  if (context === undefined) {
    throw new Error("useTelecom must be used within a TelecomProvider");
  }
  return context;
}
