import { useState } from "react";

export function useComparison() {
  const [selectedCalculators, setSelectedCalculators] = useState<string[]>([]);

  const addCalculator = (calculatorId: string) => {
    if (!selectedCalculators.includes(calculatorId) && selectedCalculators.length < 3) {
      setSelectedCalculators([...selectedCalculators, calculatorId]);
    }
  };

  const removeCalculator = (calculatorId: string) => {
    setSelectedCalculators(selectedCalculators.filter(id => id !== calculatorId));
  };

  const clearComparison = () => {
    setSelectedCalculators([]);
  };

  return {
    selectedCalculators,
    addCalculator,
    removeCalculator,
    clearComparison,
  };
}
