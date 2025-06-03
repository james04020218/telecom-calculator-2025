import { Calculator, Expand, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import misoLogoPath from "@assets/image_1748968725777.png";

interface HeaderProps {
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export default function Header({ onToggleFullscreen, isFullscreen }: HeaderProps) {
  return (
    <header className="glass-effect border-b border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-10 bg-white rounded-lg flex items-center justify-center p-1">
              <img src={misoLogoPath} alt="Miso" className="h-full w-auto object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">미소 결합할인 계산기</h1>
              <p className="text-sm text-gray-400">Premium Consultant Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFullscreen}
              className="glass-effect hover:bg-gray-600 transition-colors"
            >
              <Expand className="text-gray-300" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="glass-effect hover:bg-gray-600 transition-colors"
            >
              <Settings className="text-gray-300" />
            </Button>
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-green-500 rounded-full flex items-center justify-center">
              <User className="text-white text-sm" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
