import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, BookOpen, Award } from 'lucide-react';
import Navigation from '../components/Navigation';
import AnimatedTransition from '../components/AnimatedTransition';

// Local image paths
const heroImage = "https://cdn.forbes.ru/forbes-static/new/2024/06/Electrotechnical-University-SPB-01-copy-667565fde7763.jpg";
const tourImage = "/lovable-uploads/8c25670f-cdb8-4e0f-96a8-7f2d078b3227.png";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.3}px)`,
  };

  return (
    <AnimatedTransition>
      <div className="min-h-screen">
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative h-screen overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${heroImage})`,
              transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.1}px)` 
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-3xl">
              <div className="animate-slide-up">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/80 text-white text-sm font-medium mb-4">
                  Виртуальный тур
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  История ЛЭТИ в интерактивном формате
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-xl">
                  Погрузитесь в увлекательное путешествие по истории старейшего электротехнического университета Европы
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/tour"
                    className="animated-button bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg inline-flex items-center"
                  >
                    Начать тур
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    to="/timeline"
                    className="animated-button bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium px-6 py-3 rounded-lg inline-flex items-center"
                  >
                    Хронология
                    <Clock className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-sm font-medium animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-1 animate-slide-up"></div>
              </div>
              <span>Прокрутите вниз</span>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-background to-secondary/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Исследуйте историю ЛЭТИ в новом формате
              </h2>
              <p className="text-muted-foreground">
                Наш виртуальный тур позволяет вам погрузиться в богатую историю университета через интерактивные панорамы, хронологии и увлекательные истории
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Виртуальные панорамы</h3>
                <p className="text-muted-foreground">
                  Исследуйте исторические локации ЛЭТИ через интерактивные 360° панорамы с детальными описаниями
                </p>
              </div>
              
              <div className="glass p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Интерактивная хронология</h3>
                <p className="text-muted-foreground">
                  Пройдите через ключевые моменты истории университета в хронологическом порядке с богатым мультимедийным контентом
                </p>
              </div>
              
              <div className="glass p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Тесты и викторины</h3>
                <p className="text-muted-foreground">
                  Проверьте свои знания об истории ЛЭТИ с помощью интерактивных тестов и увлекательных викторин
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tour Preview Section */}
        <section className="py-20 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                  Виртуальный тур
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Исследуйте ЛЭТИ через панорамы
                </h2>
                <p className="text-muted-foreground mb-6">
                  Наш виртуальный тур позволяет вам исследовать исторические места ЛЭТИ через интерактивные панорамы. Вы можете перемещаться между локациями, изучать интересные факты и погружаться в историю университета.
                </p>
                <Link
                  to="/tour"
                  className="animated-button inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-medium"
                >
                  Начать виртуальный тур
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur-lg opacity-70"></div>
                  <div className="relative overflow-hidden rounded-xl shadow-xl">
                    <img
                      src={tourImage}
                      alt="Виртуальный тур по ЛЭТИ"
                      className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="glass p-8 md:p-12 rounded-xl text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Готовы исследовать историю ЛЭТИ?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Начните увлекательное путешествие по истории одного из старейших электротехнических университетов Европы прямо сейчас
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/tour"
                  className="animated-button bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg inline-flex items-center justify-center"
                >
                  Начать виртуальный тур
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/timeline"
                  className="animated-button bg-white hover:bg-white/90 text-foreground font-medium px-6 py-3 rounded-lg inline-flex items-center justify-center"
                >
                  Изучить хронологию
                  <Clock className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="text-xl font-bold flex items-center gap-2">
                  <div 
                    className="w-6 h-6 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url("/images/leti-logo.png")' }}
                  />
                  ЛЭТИ Тур
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  © {new Date().getFullYear()} Виртуальный тур по истории ЛЭТИ
                </p>
              </div>
              
              <div className="flex gap-8">
                <Link to="/" className="text-foreground/80 hover:text-primary transition-colors duration-200">
                  Главная
                </Link>
                <Link to="/tour" className="text-foreground/80 hover:text-primary transition-colors duration-200">
                  Виртуальный тур
                </Link>
                <Link to="/timeline" className="text-foreground/80 hover:text-primary transition-colors duration-200">
                  Хронология
                </Link>
                <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors duration-200">
                  О проекте
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedTransition>
  );
};

export default Index;
