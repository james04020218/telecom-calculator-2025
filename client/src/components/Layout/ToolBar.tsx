import { Columns, Star, History, Expand, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { useTelecomCalculator } from "@/hooks/useTelecomCalculator";
import { useState } from "react";

interface ToolBarProps {
  comparisonMode: boolean;
  onToggleComparison: () => void;
  onToggleFullscreen: () => void;
}

export default function ToolBar({ 
  comparisonMode, 
  onToggleComparison, 
  onToggleFullscreen 
}: ToolBarProps) {
  const { favorites } = useFavorites();
  const { setActiveTab } = useTelecomCalculator();
  const [showFavorites, setShowFavorites] = useState(false);
  const [showRecent, setShowRecent] = useState(false);

  const handleFavoriteClick = () => {
    setShowFavorites(!showFavorites);
    setShowRecent(false);
  };

  const handleRecentClick = () => {
    setShowRecent(!showRecent);
    setShowFavorites(false);
  };

  const handleTabSelect = (tabId: string) => {
    setActiveTab(tabId);
    setShowFavorites(false);
    setShowRecent(false);
  };

  return (
    <div className="glass-effect border-b border-gray-700 sticky top-30 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleComparison}
              className="glass-effect hover:bg-gray-600 transition-colors text-sm"
            >
              <Columns className="w-4 h-4 mr-2 text-gray-300" />
              <span>{comparisonMode ? '비교 종료' : '비교 모드'}</span>
            </Button>
            
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavoriteClick}
                className="glass-effect hover:bg-gray-600 transition-colors text-sm"
              >
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                <span>즐겨찾기</span>
                <span className="bg-yellow-400 text-gray-900 text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center ml-2">
                  {favorites.length}
                </span>
              </Button>
              
              {showFavorites && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">즐겨찾기</h3>
                    {favorites.length > 0 ? (
                      favorites.map((fav) => (
                        <button
                          key={fav}
                          onClick={() => handleTabSelect(fav)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                        >
                          {fav === 'template' ? '미소 템플릿 모음' : fav.toUpperCase()}
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">즐겨찾기가 없습니다</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRecentClick}
                className="glass-effect hover:bg-gray-600 transition-colors text-sm"
              >
                <History className="w-4 h-4 mr-2 text-gray-300" />
                <span>최근</span>
              </Button>
              
              {showRecent && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">최근 사용</h3>
                    <button
                      onClick={() => handleTabSelect('kt')}
                      className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                    >
                      KT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFullscreen}
              className="glass-effect hover:bg-gray-600 transition-colors"
            >
              <Expand className="w-4 h-4 text-gray-300" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="glass-effect hover:bg-gray-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-gray-300" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
