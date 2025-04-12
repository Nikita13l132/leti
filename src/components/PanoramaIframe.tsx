import React, { useEffect, useRef, useState } from 'react';
import { toast } from "sonner";

interface PanoramaIframeProps {
  panoramaUrl: string;
  autoRotate?: boolean;
  initialHfov?: number;
  height?: string;
  onLoad?: () => void;
}

const PanoramaIframe: React.FC<PanoramaIframeProps> = ({
  panoramaUrl,
  autoRotate = false,
  initialHfov = 100,
  height = "500px",
  onLoad
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('Received message:', event.data);
      if (event.data.type === 'panoramaLoaded') {
        setIsLoading(false);
        if (onLoad) {
          onLoad();
        }
        toast.success("Панорама загружена", {
          duration: 1500,
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onLoad]);

  // Используем абсолютный путь для панорамы
  const absolutePanoramaUrl = panoramaUrl.startsWith('http') 
    ? panoramaUrl 
    : `${window.location.origin}${panoramaUrl}`;

  console.log('Panorama URL:', absolutePanoramaUrl);
  
  const iframeUrl = `/panorama.html?url=${encodeURIComponent(absolutePanoramaUrl)}&autoRotate=${autoRotate}&hfov=${initialHfov}`;
  console.log('Iframe URL:', iframeUrl);

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-md bg-black/5" style={{ height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
          <div className="text-center p-4">
            <p className="text-red-500 mb-2">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        src={iframeUrl}
        className="w-full h-full border-0"
        allow="fullscreen"
        onError={() => {
          console.error('Error loading iframe');
          setError('Ошибка загрузки панорамы');
          setIsLoading(false);
          toast.error("Ошибка загрузки панорамы", {
            description: "Проверьте URL изображения",
          });
        }}
        onLoad={() => {
          console.log('Iframe loaded');
        }}
      />
    </div>
  );
};

export default PanoramaIframe; 