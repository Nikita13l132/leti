import React, { useEffect, useRef, useState } from 'react';
import { toast } from "sonner";
import 'pannellum/build/pannellum.css';

// Import Pannellum properly using script loading
declare const window: Window & {
  pannellum: any;
};

interface Hotspot {
  id: string;
  position: { x: number; y: number };
  title: string;
  description: string;
  image?: string;
  link?: string;
}

interface PanoramaViewerProps {
  panoramaUrl: string;
  hotspots?: Hotspot[];
  onHotspotClick?: (hotspot: Hotspot) => void;
  autoRotate?: boolean;
  initialHfov?: number;  // Initial horizontal field of view (zoom level)
  height?: string;      // Container height
  onLoad?: () => void;
}

const PanoramaViewer: React.FC<PanoramaViewerProps> = ({ 
  panoramaUrl, 
  hotspots = [],
  onHotspotClick,
  autoRotate = true,
  initialHfov = 100,
  height = "500px",
  onLoad
}) => {
  const panoramaRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const viewerRef = useRef<any>(null);
  const [initialized, setInitialized] = useState(false);
  const [pannellumLoaded, setPannellumLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Pannellum script
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (window.pannellum) {
      setPannellumLoaded(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
    script.async = true;
    script.onload = () => {
      console.log('Pannellum loaded successfully');
      setPannellumLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load Pannellum');
      setError('Ошибка загрузки библиотеки панорамы');
      toast.error('Ошибка загрузки библиотеки панорамы');
    };
    
    document.body.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Initialize or update Pannellum when component mounts or when panoramaUrl changes
  useEffect(() => {
    if (!pannellumLoaded || !panoramaRef.current) {
      return;
    }

    // If viewer already exists, destroy it before creating a new one
    if (viewerRef.current) {
      try {
        viewerRef.current.destroy();
      } catch (e) {
        console.error("Error destroying previous viewer:", e);
      }
      viewerRef.current = null;
    }

    setIsLoading(true);
    setError(null);

    // Verify panorama URL
    if (!panoramaUrl) {
      setError('URL панорамы не указан');
      setIsLoading(false);
      return;
    }

    try {
      // Convert hotspots to Pannellum format
      const pannellumHotspots = hotspots.map(hotspot => ({
        id: hotspot.id,
        pitch: (hotspot.position.y - 50) * 0.9,
        yaw: (hotspot.position.x - 50) * 3.6,
        type: "info",
        text: hotspot.title,
        originalHotspot: hotspot
      }));

      // Create new viewer
      const viewer = window.pannellum.viewer(panoramaRef.current, {
        type: 'equirectangular',
        panorama: panoramaUrl,
        autoLoad: true,
        autoRotate: autoRotate ? 2 : 0,
        compass: true,
        showZoomCtrl: true,
        showFullscreenCtrl: true,
        hotSpots: pannellumHotspots,
        hfov: initialHfov,
        minHfov: 50,
        maxHfov: 120,
        friction: 0.2,
        mouseZoom: true,
        touchPanEnabled: true,
        draggable: true,
        disableKeyboardCtrl: false,
        sceneFadeDuration: 300,
        onLoad: () => {
          console.log("Panorama loaded successfully");
          setIsLoading(false);
          setInitialized(true);
          if (onLoad) {
            onLoad();
          }
          toast.success("Панорама загружена", {
            duration: 1500,
          });
        },
        onError: (err: string) => {
          console.error("Pannellum error:", err);
          setError('Ошибка загрузки панорамы');
          setIsLoading(false);
          toast.error("Ошибка загрузки панорамы", {
            description: "Проверьте URL изображения",
          });
        }
      });

      // Store viewer reference
      viewerRef.current = viewer;

      // Set up hotspot click handler
      if (hotspots.length > 0 && onHotspotClick) {
        viewer.on('click', (event: MouseEvent) => {
          const clickedHotspot = viewer.getHotspotById(viewer.mouseEventToCoords(event));
          if (clickedHotspot && clickedHotspot.originalHotspot) {
            onHotspotClick(clickedHotspot.originalHotspot);
          }
        });
      }
    } catch (error) {
      console.error("Failed to initialize panorama:", error);
      setError('Ошибка инициализации панорамы');
      setIsLoading(false);
      toast.error("Ошибка инициализации панорамы");
    }

    // Clean up on unmount
    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch (e) {
          console.error("Error destroying viewer:", e);
        }
        viewerRef.current = null;
      }
    };
  }, [panoramaUrl, hotspots, onHotspotClick, autoRotate, initialHfov, pannellumLoaded, onLoad]);

  if (error) {
    return (
      <div className="relative w-full overflow-hidden rounded-lg shadow-md bg-black/5 flex items-center justify-center" style={{ height }}>
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
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-md bg-black/5" style={{ height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <div ref={panoramaRef} className="w-full h-full" />

      <style>
        {`
        .pnlm-container { background-color: transparent !important; }
        .pnlm-hotspot { height: 20px; width: 20px; border-radius: 10px; }
        .pnlm-hotspot-base.info { background-color: rgba(58, 68, 255, 0.7); border: 1px solid #fff; }
        .pnlm-hotspot:hover { background-color: rgba(58, 68, 255, 1); }
        .pnlm-controls { opacity: 0.8; }
        .pnlm-controls:hover { opacity: 1; }
        `}
      </style>
    </div>
  );
};

export default PanoramaViewer;
