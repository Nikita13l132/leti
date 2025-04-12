
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation?: string;
}

interface QuizProps {
  title: string;
  description?: string;
  questions: Question[];
}

const Quiz: React.FC<QuizProps> = ({ title, description, questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  
  const handleOptionSelect = (optionId: string) => {
    if (isAnswerChecked) return; // Prevent changing answer after checking
    setSelectedOptionId(optionId);
  };

  const checkAnswer = () => {
    if (!selectedOptionId || isAnswerChecked) return;
    
    setIsAnswerChecked(true);
    
    const selectedOption = currentQuestion.options.find(
      option => option.id === selectedOptionId
    );
    
    if (selectedOption?.isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnsweredQuestions(prev => [...prev, currentQuestionIndex]);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
  };

  const getProgressPercentage = () => {
    return (answeredQuestions.length / questions.length) * 100;
  };

  if (quizCompleted) {
    return (
      <div className="glass rounded-xl p-6 md:p-8 my-8 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {score === questions.length 
            ? 'Поздравляем!'
            : score >= questions.length * 0.7
            ? 'Хороший результат!'
            : 'Результат теста'}
        </h2>
        
        <div className="text-center mb-8">
          <div className="text-5xl font-bold mb-2">
            {score} / {questions.length}
          </div>
          <p className="text-muted-foreground">
            {score === questions.length 
              ? 'Идеальный результат! Вы отлично знаете историю ЛЭТИ.'
              : score >= questions.length * 0.7
              ? 'Вы хорошо знаете историю ЛЭТИ!'
              : 'Вы можете ещё лучше узнать историю ЛЭТИ в нашем виртуальном туре.'}
          </p>
        </div>
        
        <button
          onClick={restartQuiz}
          className="animated-button w-full bg-primary text-white font-medium py-3 rounded-lg"
        >
          Пройти тест ещё раз
        </button>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6 md:p-8 my-8">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {description && <p className="text-muted-foreground mb-6">{description}</p>}
      
      {/* Progress bar */}
      <div className="w-full h-1 bg-border rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300" 
          style={{ width: `${getProgressPercentage()}%` }}
        ></div>
      </div>
      
      {/* Question */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">
          Вопрос {currentQuestionIndex + 1} из {questions.length}
        </p>
        <h3 className="text-xl font-medium mb-6">{currentQuestion.text}</h3>
        
        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map(option => {
            let optionClass = "border border-border rounded-lg p-4 transition-all duration-200 cursor-pointer";
            
            if (isAnswerChecked) {
              if (option.isCorrect) {
                optionClass += " bg-green-50 border-green-500";
              } else if (option.id === selectedOptionId) {
                optionClass += " bg-red-50 border-red-500";
              }
            } else if (option.id === selectedOptionId) {
              optionClass += " border-primary bg-primary/5";
            } else {
              optionClass += " hover:bg-muted hover:border-border";
            }
            
            return (
              <div
                key={option.id}
                className={optionClass}
                onClick={() => handleOptionSelect(option.id)}
              >
                <div className="flex items-center">
                  <div className="flex-1">{option.text}</div>
                  
                  {isAnswerChecked && (
                    <div className="ml-2">
                      {option.isCorrect ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : option.id === selectedOptionId ? (
                        <X className="h-5 w-5 text-red-500" />
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Explanation shown after answering */}
      {isAnswerChecked && currentQuestion.explanation && (
        <div className="bg-muted p-4 rounded-lg mb-6 animate-fade-in">
          <h4 className="font-medium mb-1">Пояснение:</h4>
          <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
        </div>
      )}
      
      {/* Action buttons */}
      <div className="flex gap-4">
        {!isAnswerChecked ? (
          <button
            onClick={checkAnswer}
            disabled={!selectedOptionId}
            className={`animated-button flex-1 bg-primary text-white font-medium py-3 rounded-lg ${
              !selectedOptionId ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Проверить ответ
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="animated-button flex-1 bg-primary text-white font-medium py-3 rounded-lg"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Следующий вопрос' : 'Завершить тест'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
