
import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnimatedTransitionProps {
  children: React.ReactNode;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ children }) => {
  const location = useLocation();
  const prevLocationRef = useRef<string>(location.pathname);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (prevLocationRef.current !== location.pathname) {
      // Play exit animation
      if (containerRef.current) {
        containerRef.current.classList.add('animate-fade-out');
        
        const timeout = setTimeout(() => {
          if (containerRef.current) {
            // Update the ref to the current location
            prevLocationRef.current = location.pathname;
            
            // Reset and play entrance animation
            containerRef.current.classList.remove('animate-fade-out');
            containerRef.current.classList.add('animate-fade-in');
          }
        }, 300); // Should match the duration of the fade-out animation
        
        return () => clearTimeout(timeout);
      }
    } else if (containerRef.current) {
      // Initial load animation
      containerRef.current.classList.add('animate-fade-in');
    }
  }, [location.pathname]);

  return (
    <div ref={containerRef} className="min-h-screen">
      {children}
    </div>
  );
};

export default AnimatedTransition;
