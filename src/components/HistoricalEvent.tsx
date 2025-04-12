
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HistoricalEventProps {
  title: string;
  year: number;
  description: string;
  image?: string;
  reversed?: boolean;
  onClick?: () => void;
}

const HistoricalEvent: React.FC<HistoricalEventProps> = ({
  title,
  year,
  description,
  image,
  reversed = false,
  onClick
}) => {
  return (
    <div 
      className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 my-16 items-center`}
      data-aos={reversed ? 'fade-left' : 'fade-right'}
    >
      {image && (
        <div className="w-full md:w-2/5 overflow-hidden rounded-lg shadow-lg">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-auto object-cover transition-all duration-500 hover:scale-105"
          />
        </div>
      )}
      
      <div className="w-full md:w-3/5">
        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-3">
          {year}
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-5">
          {description}
        </p>
        {onClick && (
          <button 
            onClick={onClick}
            className="inline-flex items-center group text-primary hover:text-primary/80 font-medium transition-colors duration-200"
          >
            Подробнее
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HistoricalEvent;
