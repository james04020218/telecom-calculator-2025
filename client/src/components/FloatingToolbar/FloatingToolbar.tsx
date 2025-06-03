import { useState } from "react";
import { Star, History, Columns, Expand, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";

interface FloatingToolbarProps {
  comparisonMode: boolean;
  onToggleComparison: () => void;
  onToggleFullscreen: () => void;
}

export default function FloatingToolbar({ 
  comparisonMode, 
  onToggleComparison, 
  onToggleFullscreen 
}: FloatingToolbarProps) {
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="floating-toolbar">
      <div className="flex flex-col space-y-3">
        {/* Favorites Panel */}
        {showFavorites && (
          <div className="glass-effect p-4 rounded-lg border border-gray-600 w-64">
            <h3 className="font-semibold text-white mb-3 flex items-center">
              <Star className="text-yellow-400 mr-2 h-4 w-4" />
              즐겨찾기
            </h3>
            <div className="space-y-2">
              {favorites.map((fav) => (
                <div
                  key={fav}
                  className="w-full text-left p-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                >
                  <span className="text-sm text-white flex-1 capitalize">{fav} 계산기</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFavorite(fav)}
                    className="h-6 w-6 text-gray-400 hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {favorites.length === 0 && (
                <p className="text-sm text-gray-500">즐겨찾기가 없습니다</p>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-col space-y-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFavorites(!showFavorites)}
            className="w-12 h-12 glass-effect rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Star className="text-yellow-400" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 glass-effect rounded-lg hover:bg-gray-600 transition-colors"
          >
            <History className="text-gray-300" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleComparison}
            className="w-12 h-12 glass-effect rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Columns className="text-blue-400" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFullscreen}
            className="w-12 h-12 glass-effect rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Expand className="text-gray-300" />
          </Button>
        </div>
      </div>
    </div>
  );
}
