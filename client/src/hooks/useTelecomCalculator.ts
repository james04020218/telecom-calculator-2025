import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export function useTelecomCalculator() {
  const [activeTab, setActiveTab] = useState("kt");
  const [comparisonMode, setComparisonMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Load user preferences
  const { data: preferences } = useQuery({
    queryKey: ["/api/preferences"],
  });

  // Update active tab and track recent tabs
  const handleSetActiveTab = (tabId: string) => {
    if (activeTab === tabId) return;
    
    setIsLoading(true);
    
    // Simulate loading time
    setTimeout(() => {
      setActiveTab(tabId);
      setIsLoading(false);
      
      // Update recent tabs in preferences
      if (preferences) {
        const newRecentTabs = [tabId, ...(preferences.recentTabs || []).filter((t: string) => t !== tabId)].slice(0, 5);
        
        fetch("/api/preferences", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...preferences,
            recentTabs: newRecentTabs,
          }),
        });
      }
    }, 800);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return {
    activeTab,
    setActiveTab: handleSetActiveTab,
    comparisonMode,
    setComparisonMode,
    isLoading,
    isFullscreen,
    toggleFullscreen,
  };
}
