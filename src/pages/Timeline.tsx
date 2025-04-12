
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import TimelineComponent from '../components/TimelineComponent';
import AnimatedTransition from '../components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, Clock, BookOpen, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample historical events for the timeline
const historicalEvents = [
  {
    id: 1,
    year: 1886,
    title: "Основание Технического училища почтово-телеграфного ведомства",
    description: "15 июня 1886 года по указу императора Александра III было основано Техническое училище почтово-телеграфного ведомства — первое в России электротехническое учебное заведение.",
    image: "https://images.unsplash.com/photo-1584697964358-3e14ca66f1ee?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    year: 1891,
    title: "Преобразование в Электротехнический институт",
    description: "Техническое училище было преобразовано в Электротехнический институт, что позволило расширить программу обучения и привлечь новых преподавателей.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    year: 1899,
    title: "Присвоение имени Императора Александра III",
    description: "Электротехническому институту было присвоено имя Императора Александра III, что подчеркнуло его значимость для развития технического образования в России.",
    image: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    year: 1903,
    title: "Начало работы А.С. Попова в институте",
    description: "Александр Степанович Попов, изобретатель радио, становится профессором физики в Электротехническом институте и вносит значительный вклад в развитие радиотехники.",
    image: "https://images.unsplash.com/photo-1581093458792-4d8513864ec0?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    year: 1918,
    title: "Преобразования после Октябрьской революции",
    description: "После Октябрьской революции институт был реорганизован. Изменились программы обучения, были открыты новые специальности, отражающие потребности молодого советского государства.",
    image: "https://images.unsplash.com/photo-1590086650780-a1005439c3ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    year: 1925,
    title: "Присвоение имени В.И. Ульянова (Ленина)",
    description: "Институту было присвоено имя В.И. Ульянова (Ленина), которое сохраняется в названии вуза до настоящего времени.",
    image: "https://images.unsplash.com/photo-1561313466-b0b4ab10f1d8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    year: 1941,
    title: "ЛЭТИ в годы Великой Отечественной войны",
    description: "Во время блокады Ленинграда многие сотрудники и студенты института ушли на фронт. Несмотря на тяжелейшие условия, в ЛЭТИ продолжались исследования для оборонной промышленности.",
    image: "https://images.unsplash.com/photo-1590243429108-669f21e0c874?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    year: 1991,
    title: "ЛЭТИ в постсоветский период",
    description: "После распада СССР институт успешно адаптировался к новым экономическим условиям, сохранив и приумножив образовательный и научный потенциал.",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 9,
    year: 2003,
    title: "Получение статуса университета",
    description: "ЛЭТИ получил статус университета и был переименован в Санкт-Петербургский государственный электротехнический университет «ЛЭТИ» им. В.И. Ульянова (Ленина).",
    image: "https://images.unsplash.com/photo-1590086650892-e6f268be98df?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 10,
    year: 2021,
    title: "ЛЭТИ в современную эпоху",
    description: "Сегодня ЛЭТИ — один из ведущих технических вузов России, сочетающий традиции и инновации, активно участвующий в международных образовательных и научных проектах.",
    image: "https://images.unsplash.com/photo-1584697964554-8ee1564c38d7?q=80&w=800&auto=format&fit=crop"
  }
];

const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState(historicalEvents[0]);
  const [showDetailedView, setShowDetailedView] = useState(false);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  return (
    <AnimatedTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Хронология истории ЛЭТИ</h1>
              <p className="text-muted-foreground max-w-3xl">
                Исследуйте ключевые моменты в истории Санкт-Петербургского государственного электротехнического университета «ЛЭТИ» им. В.И. Ульянова (Ленина), от основания до современности.
              </p>
            </div>
            
            {showDetailedView ? (
              <div className="animate-fade-in">
                <Button
                  variant="outline"
                  className="mb-8"
                  onClick={() => setShowDetailedView(false)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Вернуться к хронологии
                </Button>
                
                <div className="glass rounded-xl overflow-hidden">
                  <div className="aspect-video w-full relative">
                    <img 
                      src={selectedEvent.image} 
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-2">
                        {selectedEvent.year} год
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedEvent.title}</h2>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="mb-6">{selectedEvent.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="glass p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <Award className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">Значение для ЛЭТИ</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Это событие стало важной вехой в истории университета, определив его дальнейшее развитие и место в системе образования.
                        </p>
                      </div>
                      
                      <div className="glass p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">Исторический контекст</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          В период {selectedEvent.year} года Россия переживала значительные изменения, которые отразились на развитии науки и образования.
                        </p>
                      </div>
                      
                      <div className="glass p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">Научное наследие</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          В этот период были заложены основы для будущих научных достижений и открытий, которые впоследствии прославили университет.
                        </p>
                      </div>
                      
                      <div className="glass p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">Расположение</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          События происходили в исторических зданиях ЛЭТИ, некоторые из которых сохранились до наших дней и являются частью виртуального тура.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-center">
                      <Link
                        to="/tour"
                        className="animated-button bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2"
                      >
                        Исследовать это место в виртуальном туре
                        <ArrowLeft className="h-4 w-4 rotate-180" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass rounded-xl p-6">
                <TimelineComponent 
                  events={historicalEvents} 
                  onEventSelect={handleEventSelect} 
                />
                
                <div className="flex justify-center mt-10">
                  <Button 
                    className="animated-button bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setShowDetailedView(true)}
                  >
                    Подробнее о событии
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </AnimatedTransition>
  );
};

export default Timeline;
