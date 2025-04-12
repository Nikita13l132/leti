import React from 'react';
import Navigation from '../components/Navigation';
import AnimatedTransition from '../components/AnimatedTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Heart, Github, Mail, Award, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <AnimatedTransition>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
        <Navigation />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">О проекте</h1>
            
            <div className="glass rounded-xl p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Виртуальный тур по истории ЛЭТИ</h2>
              <p className="text-muted-foreground mb-6">
                Этот проект представляет собой интерактивный виртуальный тур по истории Санкт-Петербургского государственного электротехнического университета «ЛЭТИ» им. В.И. Ульянова (Ленина) — старейшего электротехнического университета Европы.
              </p>
              
              <p className="mb-6">
                Основанный в 1886 году как Техническое училище почтово-телеграфного ведомства, ЛЭТИ прошел долгий и славный путь, став одним из ведущих технических университетов России. Наш виртуальный тур позволяет посетителям погрузиться в богатую историю университета через интерактивные панорамы, хронологическую ленту событий и мультимедийный контент.
              </p>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Создано с любовью к истории и инновациям</span>
              </div>
            </div>
            
            <Tabs defaultValue="features" className="glass rounded-xl p-6">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="features">Особенности</TabsTrigger>
                <TabsTrigger value="team">Команда</TabsTrigger>
                <TabsTrigger value="contact">Контакты</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="space-y-6">
                <h3 className="text-xl font-medium">Основные функции проекта</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Виртуальные панорамы</h4>
                      <p className="text-sm text-muted-foreground">
                        Интерактивные 360° панорамы исторических мест ЛЭТИ с информационными точками
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Хронология событий</h4>
                      <p className="text-sm text-muted-foreground">
                        Интерактивная временная шкала с ключевыми событиями из истории университета
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Мультимедийный контент</h4>
                      <p className="text-sm text-muted-foreground">
                        Богатая коллекция фотографий, документов и других материалов из архивов ЛЭТИ
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Образовательный аспект</h4>
                      <p className="text-sm text-muted-foreground">
                        Тесты и викторины для проверки знаний об истории университета
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="text-xl font-medium mb-4">Технологии</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">React</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">TypeScript</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Tailwind CSS</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Shadcn UI</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Panorama Viewer</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Vite</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="team" className="space-y-6">
                <h3 className="text-xl font-medium mb-4">Наша команда</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary">ИП</span>
                    </div>
                    <h4 className="font-medium">Иван Петров</h4>
                    <p className="text-sm text-muted-foreground">Руководитель проекта</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary">АС</span>
                    </div>
                    <h4 className="font-medium">Анна Смирнова</h4>
                    <p className="text-sm text-muted-foreground">Исторический консультант</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary">МК</span>
                    </div>
                    <h4 className="font-medium">Михаил Козлов</h4>
                    <p className="text-sm text-muted-foreground">Frontend разработчик</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary">ЕВ</span>
                    </div>
                    <h4 className="font-medium">Екатерина Волкова</h4>
                    <p className="text-sm text-muted-foreground">UI/UX дизайнер</p>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-muted-foreground">
                    Особая благодарность сотрудникам музея ЛЭТИ за предоставленные исторические материалы.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-6">
                <h3 className="text-xl font-medium mb-4">Свяжитесь с нами</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>history@etu.ru</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-primary" />
                    <span>github.com/leti-history-tour</span>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h4 className="font-medium mb-3">Мы будем рады вашим отзывам и предложениям:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Если у вас есть интересные исторические материалы о ЛЭТИ, которыми вы хотели бы поделиться</li>
                    <li>Если вы заметили неточности в исторических данных</li>
                    <li>Если у вас есть предложения по улучшению виртуального тура</li>
                    <li>Если вы хотите принять участие в развитии проекта</li>
                  </ul>
                </div>
                
                <div className="mt-6 p-4 bg-primary/5 rounded-lg flex items-center gap-3 border border-primary/20">
                  <Award className="h-6 w-6 text-primary" />
                  <p className="text-sm">
                    Проект разработан при поддержке Санкт-Петербургского государственного электротехнического университета «ЛЭТИ» им. В.И. Ульянова (Ленина).
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </AnimatedTransition>
  );
};

export default About;
