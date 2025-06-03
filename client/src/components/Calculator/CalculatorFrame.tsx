import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowRight, Calculator, ExternalLink } from 'lucide-react';

interface CalculatorFrameProps {
  telecomType: string;
  isLoading: boolean;
}

export default function CalculatorFrame({ telecomType, isLoading }: CalculatorFrameProps) {
  const [, setLocation] = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  const openCalculator = () => {
    setIsNavigating(true);
    setTimeout(() => {
      setLocation(`/calculator/${telecomType}`);
    }, 300);
  };

  const openInNewWindow = () => {
    const url = `/calculator/${telecomType}`;
    const newWindow = window.open(url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes,toolbar=no,menubar=no');
    
    if (newWindow) {
      newWindow.focus();
    } else {
      alert('팝업이 차단되었습니다. 브라우저 설정에서 팝업을 허용해주세요.');
    }
  };

  const getTelecomName = (type: string) => {
    const names: Record<string, string> = {
      'kt': 'KT',
      'lg': 'LG U+',
      'sk': 'SK브로드밴드',
      'lgsoho': 'LG U+ (소호)',
      'hellovision': '헬로비전',
      'skyhcn': 'SKY/HCN',
      'skpop': 'SK팝',
      'template': '미소 템플릿 모음'
    };
    return names[type] || type.toUpperCase();
  };

  const getTelecomColor = (type: string) => {
    const colors: Record<string, string> = {
      'kt': 'from-red-500 to-orange-500',
      'lg': 'from-pink-500 to-fuchsia-500', 
      'sk': 'from-red-600 to-orange-600',
      'lgsoho': 'from-violet-500 to-purple-500',
      'hellovision': 'from-green-500 to-emerald-500',
      'skyhcn': 'from-sky-500 to-blue-500',
      'skpop': 'from-purple-500 to-pink-500',
      'template': 'from-gray-500 to-slate-500'
    };
    return colors[type] || 'from-blue-500 to-indigo-500';
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        {/* Icon */}
        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getTelecomColor(telecomType)} flex items-center justify-center mb-6 shadow-lg`}>
          <Calculator className="w-12 h-12 text-white" />
        </div>
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-3">
          {telecomType === 'template' ? getTelecomName(telecomType) : `${getTelecomName(telecomType)} 계산기`}
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
          통합 환경에서 요금 계산기를 사용하여 최적의 상품을 찾아보세요. 
          상세한 할인 혜택과 정확한 요금을 확인할 수 있습니다.
        </p>
        
        {/* Main Open Button */}
        <button
          onClick={openCalculator}
          disabled={isNavigating}
          className={`
            inline-flex items-center gap-3 px-8 py-4 
            bg-gradient-to-r ${getTelecomColor(telecomType)} 
            text-white font-semibold rounded-xl 
            hover:shadow-lg transform hover:scale-105 
            transition-all duration-200 
            disabled:opacity-50 disabled:cursor-not-allowed
            disabled:transform-none disabled:shadow-none
          `}
        >
          {isNavigating ? (
            <>
              <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              계산기로 이동 중...
            </>
          ) : (
            <>
              <ArrowRight className="w-5 h-5" />
              {telecomType === 'template' ? '템플릿 모음 시작' : '계산기 시작'}
            </>
          )}
        </button>
        
        {/* Alternative New Window Button */}
        <button
          onClick={openInNewWindow}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          새 창에서 열기
        </button>
        
        {/* Additional Info */}
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-500">
          <p>통합 환경에서 바로 사용하거나 새 창에서 별도로 열 수 있습니다</p>
        </div>
      </div>
    </div>
  );
}
