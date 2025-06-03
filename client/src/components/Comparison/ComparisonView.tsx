import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useComparison } from "@/hooks/useComparison";
import { useQuery } from "@tanstack/react-query";
import { X, Columns } from "lucide-react";

interface TelecomTab {
  id: string;
  name: string;
  icon: string;
  color: string;
  premium: boolean;
  description: string;
}

export default function ComparisonView() {
  const { selectedCalculators, addCalculator, removeCalculator, clearComparison } = useComparison();
  const { data: calculators = [] } = useQuery<TelecomTab[]>({
    queryKey: ["/api/calculators"],
  });

  const availableCalculators = calculators.filter(calc => calc.id !== 'template');

  return (
    <div className="space-y-6">
      {/* Comparison Header */}
      <div className="glass-effect p-4 rounded-lg border border-gray-600">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Columns className="text-blue-400 mr-3" />
            통신사 계산기 비교 모드
          </h2>
          <div className="flex items-center space-x-3">
            <Select
              value=""
              onValueChange={(value) => addCalculator(value)}
            >
              <SelectTrigger className="w-48 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="계산기 추가" />
              </SelectTrigger>
              <SelectContent>
                {availableCalculators
                  .filter(calc => !selectedCalculators.includes(calc.id))
                  .map(calc => (
                    <SelectItem key={calc.id} value={calc.id}>
                      <div className="flex items-center space-x-2">
                        <span>{calc.icon}</span>
                        <span>{calc.name}</span>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            
            <Button
              onClick={clearComparison}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              비교 종료
            </Button>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      {selectedCalculators.length > 0 ? (
        <div className="comparison-grid">
          {selectedCalculators.map((calcId) => {
            const calc = calculators.find(c => c.id === calcId);
            if (!calc) return null;

            return (
              <div key={calcId} className="calculator-frame glass-effect">
                <div 
                  className="p-3 border-b flex items-center justify-between"
                  style={{ 
                    backgroundColor: `${calc.color}1A`,
                    borderColor: calc.color 
                  }}
                >
                  <h3 className="font-semibold flex items-center" style={{ color: calc.color }}>
                    <span className="mr-2">{calc.icon}</span>
                    {calc.name} 계산기
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCalculator(calcId)}
                    className="h-6 w-6 text-gray-400 hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <iframe
                  src={`/api/calculator/${calcId}`}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
                  title={`${calc.name} 결합 할인 계산기 비교용`}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-effect p-8 rounded-lg border border-gray-600 text-center">
          <Columns className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            비교할 계산기를 선택해주세요
          </h3>
          <p className="text-gray-500">
            위의 드롭다운에서 비교하고 싶은 통신사 계산기를 선택하세요.
          </p>
        </div>
      )}
    </div>
  );
}
