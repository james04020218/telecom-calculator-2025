import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface CalculatorPageProps {
  telecomType?: string;
}

export default function CalculatorPage({ telecomType }: CalculatorPageProps) {
  const [, setLocation] = useLocation();

  const getTelecomName = (type: string) => {
    const names: Record<string, string> = {
      'kt': 'KT',
      'lg': 'LG U+',
      'sk': 'SK브로드밴드',
      'lgsoho': 'LG U+ (소호)',
      'hellovision': '헬로비전',
      'skyhcn': 'SKY/HCN',
      'skpop': 'SK팝',
      'template': '템플릿'
    };
    return names[type || ''] || type?.toUpperCase() || '';
  };

  useEffect(() => {
    if (telecomType) {
      // Redirect to the direct calculator URL for proper HTML rendering
      window.location.href = `/calculator/${telecomType}`;
    }
  }, [telecomType]);

  const openInNewWindow = () => {
    if (telecomType) {
      window.open(`/calculator/${telecomType}`, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLocation('/')}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>뒤로가기</span>
              </button>
              <div className="h-6 border-l border-gray-300 dark:border-gray-600"></div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {getTelecomName(telecomType || '')} 계산기
              </h1>
            </div>
            <button
              onClick={openInNewWindow}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>새 창에서 열기</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">계산기로 이동하는 중...</p>
        </div>
      </div>
    </div>
  );
}