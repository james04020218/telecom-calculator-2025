import { cn } from "@/lib/utils";
import { useTelecomCalculator } from "@/hooks/useTelecomCalculator";
import { useQuery } from "@tanstack/react-query";

interface TelecomNavigationProps {
  activeTab: string;
  onTabSwitch: (tabId: string) => void;
}

interface TelecomTab {
  id: string;
  name: string;
  icon: string;
  color: string;
  premium: boolean;
  description: string;
}

export default function TelecomNavigation({ activeTab, onTabSwitch }: TelecomNavigationProps) {
  const { data: calculators = [] } = useQuery<TelecomTab[]>({
    queryKey: ["/api/calculators"],
  });

  const getTabClasses = (tab: TelecomTab, isActive: boolean) => {
    const baseClasses = "nav-tab ripple-effect flex items-center space-x-2 px-4 py-2 rounded-lg mr-2 whitespace-nowrap font-medium transition-all";
    
    if (isActive) {
      return cn(
        baseClasses,
        "active border border-opacity-30",
        `text-[${tab.color}] bg-opacity-10 border-[${tab.color}]`
      );
    }
    
    return cn(
      baseClasses,
      `text-[${tab.color}] hover:bg-opacity-10 border border-transparent hover:border-opacity-30`,
      `hover:border-[${tab.color}] hover:bg-[${tab.color}]`
    );
  };

  return (
    <nav className="glass-effect border-b border-gray-700 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 overflow-x-auto scrollbar-hide">
          {calculators.map((tab) => {
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabSwitch(tab.id)}
                className={getTabClasses(tab, isActive)}
                style={{ 
                  color: tab.color,
                  backgroundColor: isActive ? `${tab.color}1A` : 'transparent',
                  borderColor: isActive ? `${tab.color}4D` : 'transparent'
                }}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.name}</span>
                {tab.premium && (
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: tab.color }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
