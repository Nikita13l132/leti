
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineEvent {
  id: number;
  year: number;
  title: string;
  description: string;
  image?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  onEventSelect: (event: TimelineEvent) => void;
}

const TimelineComponent: React.FC<TimelineProps> = ({ events, onEventSelect }) => {
  const [activeEventId, setActiveEventId] = useState<number | null>(events.length > 0 ? events[0].id : null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Preload images
    events.forEach((event) => {
      if (event.image) {
        const img = new Image();
        img.src = event.image;
        img.onload = () => {
          setImagesLoaded(prev => ({
            ...prev,
            [event.id]: true
          }));
        };
        img.onerror = () => {
          console.error(`Failed to load image for event ${event.id}: ${event.image}`);
          setImagesLoaded(prev => ({
            ...prev,
            [event.id]: false
          }));
        };
      }
    });
  }, [events]);

  useEffect(() => {
    if (activeEventId !== null) {
      const event = events.find(e => e.id === activeEventId);
      if (event) {
        onEventSelect(event);
      }
    }
  }, [activeEventId, events, onEventSelect]);

  const handleEventClick = (event: TimelineEvent) => {
    setActiveEventId(event.id);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollLeft10Percent = () => {
    if (!timelineRef.current) return;
    timelineRef.current.scrollLeft -= timelineRef.current.clientWidth * 0.1;
  };

  const scrollRight10Percent = () => {
    if (!timelineRef.current) return;
    timelineRef.current.scrollLeft += timelineRef.current.clientWidth * 0.1;
  };

  const sortedEvents = [...events].sort((a, b) => a.year - b.year);
  const minYear = sortedEvents.length > 0 ? sortedEvents[0].year : 0;
  const maxYear = sortedEvents.length > 0 ? sortedEvents[sortedEvents.length - 1].year : 0;
  const timelineRange = maxYear - minYear;

  return (
    <div className="w-full py-8">
      <div className="relative">
        <button 
          onClick={scrollLeft10Percent}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full glass hover:bg-white/40 transition-all duration-300"
          aria-label="Scroll left"
        >
          <ChevronLeft className="text-foreground h-5 w-5" />
        </button>

        <div 
          ref={timelineRef}
          className="overflow-x-auto hide-scrollbar py-4 px-12"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="relative" style={{ width: `${Math.max(100, timelineRange * 20)}px`, minHeight: '100px' }}>
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -translate-y-1/2"></div>
            
            {/* Year marks and points */}
            {sortedEvents.map((event, index) => {
              const position = timelineRange ? ((event.year - minYear) / timelineRange) * 100 : 50;
              
              return (
                <div 
                  key={event.id}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${position}%` }}
                >
                  <button
                    onClick={() => handleEventClick(event)}
                    className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                      activeEventId === event.id ? 'scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <div className={`timeline-node ${
                      activeEventId === event.id ? 'w-6 h-6 bg-primary' : 'bg-border hover:bg-primary/50'
                    }`}></div>
                    <div className="text-sm font-medium -rotate-45 origin-top-left">
                      {event.year}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <button 
          onClick={scrollRight10Percent}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full glass hover:bg-white/40 transition-all duration-300"
          aria-label="Scroll right"
        >
          <ChevronRight className="text-foreground h-5 w-5" />
        </button>
      </div>

      {/* Current event preview */}
      {activeEventId !== null && (
        <div className="mt-12 animate-fade-in">
          {events
            .filter(event => event.id === activeEventId)
            .map(event => (
              <div key={event.id} className="flex flex-col md:flex-row gap-8 items-center">
                {event.image && (
                  <div className="w-full md:w-1/3 aspect-square overflow-hidden rounded-lg shadow-lg">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="eager"
                      onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                        target.alt = "Image could not be loaded";
                      }}
                    />
                  </div>
                )}
                <div className={`w-full ${event.image ? 'md:w-2/3' : ''}`}>
                  <div className="text-3xl font-bold mb-2">{event.year}</div>
                  <h3 className="text-2xl font-medium mb-4">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Using regular style tag instead of style jsx */}
      <style>
        {`
          .timeline-node {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            transition: all 0.3s ease;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default TimelineComponent;

