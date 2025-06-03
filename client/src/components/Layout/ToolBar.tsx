import { Columns, Star, History, Expand, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";

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
            
            <Button
              variant="ghost"
              size="sm"
              className="glass-effect hover:bg-gray-600 transition-colors text-sm"
            >
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              <span>즐겨찾기</span>
              <span className="bg-yellow-400 text-gray-900 text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center ml-2">
                {favorites.length}
              </span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="glass-effect hover:bg-gray-600 transition-colors text-sm"
            >
              <History className="w-4 h-4 mr-2 text-gray-300" />
              <span>최근</span>
            </Button>
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
