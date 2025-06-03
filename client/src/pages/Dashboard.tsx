import { useState } from "react";
import Header from "@/components/Layout/Header";
import TelecomNavigation from "@/components/Layout/TelecomNavigation";
import ToolBar from "@/components/Layout/ToolBar";
import CalculatorFrame from "@/components/Calculator/CalculatorFrame";
import ComparisonView from "@/components/Comparison/ComparisonView";
import TemplateViewer from "@/components/Templates/TemplateViewer";
import FloatingToolbar from "@/components/FloatingToolbar/FloatingToolbar";
import { useTelecomCalculator } from "@/hooks/useTelecomCalculator";

export default function Dashboard() {
  const {
    activeTab,
    setActiveTab,
    comparisonMode,
    setComparisonMode,
    isLoading,
    isFullscreen,
    toggleFullscreen
  } = useTelecomCalculator();

  const handleTabSwitch = (tabId: string) => {
    setActiveTab(tabId);
    // Exit comparison mode when switching to a specific tab
    if (comparisonMode) {
      setComparisonMode(false);
    }
  };

  const handleToggleComparison = () => {
    setComparisonMode(!comparisonMode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
      />
      
      <TelecomNavigation 
        activeTab={activeTab}
        onTabSwitch={handleTabSwitch}
      />
      
      <ToolBar 
        comparisonMode={comparisonMode}
        onToggleComparison={handleToggleComparison}
        onToggleFullscreen={toggleFullscreen}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {comparisonMode ? (
          <ComparisonView />
        ) : (
          <div className="space-y-6">
            <CalculatorFrame 
              telecomType={activeTab}
              isLoading={isLoading}
            />
          </div>
        )}
      </main>

      <FloatingToolbar 
        comparisonMode={comparisonMode}
        onToggleComparison={handleToggleComparison}
        onToggleFullscreen={toggleFullscreen}
      />
    </div>
  );
}
