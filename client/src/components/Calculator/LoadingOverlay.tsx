interface LoadingOverlayProps {
  telecomType: string;
}

export default function LoadingOverlay({ telecomType }: LoadingOverlayProps) {
  return (
    <div className="calculator-frame glass-effect p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 skeleton-loader rounded-lg"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 skeleton-loader rounded w-48"></div>
            <div className="h-3 skeleton-loader rounded w-32"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="h-4 skeleton-loader rounded w-24"></div>
            <div className="h-10 skeleton-loader rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 skeleton-loader rounded w-20"></div>
            <div className="h-10 skeleton-loader rounded"></div>
          </div>
        </div>
        
        <div className="h-32 skeleton-loader rounded"></div>
        <div className="h-12 skeleton-loader rounded w-40 mx-auto"></div>
        
        <div className="text-center mt-8">
          <div className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 mr-2"></div>
            {telecomType} 계산기 로딩 중...
          </div>
        </div>
      </div>
    </div>
  );
}
