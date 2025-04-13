import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import AnimatedTransition from '../components/AnimatedTransition';
import PanoramaIframe from '../components/PanoramaIframe';
import { toast } from "sonner";

const Tour = () => {
  const isMobile = useIsMobile();
  const [panoramaLoaded, setPanoramaLoaded] = useState(false);

  useEffect(() => {
    // Show welcome toast only once
    const hasSeenTour = sessionStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      toast("Виртуальный тур запущен", {
        description: "Используйте мышь или свайпы для управления панорамой",
        duration: 3000,
      });
      sessionStorage.setItem('hasSeenTour', 'true');
    }
  }, []);

  const handlePanoramaLoad = () => {
    setPanoramaLoaded(true);
  };

  return (
    <AnimatedTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
        <main className="container mx-auto px-4 pt-16 pb-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Виртуальный тур по музею ЛЭТИ</h1>
            
            {/* Panorama viewer */}
            <div className="rounded-xl overflow-hidden mb-4">
              <PanoramaIframe 
                panoramaUrl="/panoramas/museum-panorama.png"
                height={isMobile ? "70vh" : "80vh"}
                initialHfov={isMobile ? 100 : 120}
                autoRotate={false}
                onLoad={handlePanoramaLoad}
              />
            </div>

            {panoramaLoaded && (
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 mt-4">
                <h2 className="text-xl font-semibold mb-2">Управление панорамой:</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Перемещение: перетаскивание мышью или свайпы на мобильных устройствах</li>
                  <li>• Масштабирование: колесико мыши или жесты щипка на мобильных устройствах</li>
                  <li>• Полноэкранный режим: кнопка в правом нижнем углу</li>
                  <li>• Компас: показывает направление обзора</li>
                </ul>
              </div>
            )}

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 mt-4">
              <h2 className="text-xl font-semibold mb-2">О музее:</h2>
              <p className="text-muted-foreground">
                Музей истории ЛЭТИ представляет собой уникальное собрание исторических артефактов, 
                документов и оборудования, отражающих богатую историю первого в России 
                электротехнического института. В экспозиции представлены материалы о выдающихся 
                ученых, работавших в институте, развитии научных школ и важнейших достижениях 
                в области электротехники и радиотехники.
              </p>
            </div>
          </div>
        </main>
      </div>
    </AnimatedTransition>
  );
};

export default Tour;
