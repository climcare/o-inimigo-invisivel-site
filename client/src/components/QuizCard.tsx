import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, ChevronRight } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    points: number;
  }[];
}

interface ResultLevel {
  level: string;
  color: string;
  bgColor: string;
  textColor: string;
  description: string;
  recommendations: string[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Como você avalia a ventilação do seu ambiente?",
    options: [
      { text: "Excelente - Sempre fresco", points: 0 },
      { text: "Boa - Geralmente adequada", points: 25 },
      { text: "Regular - Às vezes abafado", points: 50 },
      { text: "Ruim - Sempre abafado", points: 75 }
    ]
  },
  {
    id: 2,
    text: "Você sente falta de ar ou dificuldade respiratória?",
    options: [
      { text: "Nunca", points: 0 },
      { text: "Raramente", points: 20 },
      { text: "Às vezes", points: 50 },
      { text: "Frequentemente", points: 80 }
    ]
  },
  {
    id: 3,
    text: "Qual é o seu nível de concentração durante o dia?",
    options: [
      { text: "Excelente - Muito focado", points: 0 },
      { text: "Bom - Geralmente concentrado", points: 25 },
      { text: "Moderado - Dificuldade ocasional", points: 50 },
      { text: "Baixo - Muita dificuldade", points: 75 }
    ]
  },
  {
    id: 4,
    text: "Você nota mofo, umidade ou odores estranhos?",
    options: [
      { text: "Não", points: 0 },
      { text: "Raramente", points: 30 },
      { text: "Às vezes", points: 60 },
      { text: "Frequentemente", points: 90 }
    ]
  },
  {
    id: 5,
    text: "Como é sua energia ao longo do dia?",
    options: [
      { text: "Excelente - Muito energético", points: 0 },
      { text: "Boa - Energia normal", points: 25 },
      { text: "Moderada - Cansaço ocasional", points: 50 },
      { text: "Baixa - Muito cansado", points: 75 }
    ]
  }
];

const RESULT_LEVELS: Record<string, ResultLevel> = {
  baixo: {
    level: "BAIXO",
    color: "#00CC00",
    bgColor: "rgba(0, 204, 0, 0.1)",
    textColor: "#00AA00",
    description: "Sua qualidade do ar está EXCELENTE!",
    recommendations: [
      "✓ Mantenha a ventilação",
      "✓ Continue monitorando",
      "✓ Ambiente saudável"
    ]
  },
  moderado: {
    level: "MODERADO",
    color: "#FFCC00",
    bgColor: "rgba(255, 204, 0, 0.1)",
    textColor: "#CC9900",
    description: "Sua qualidade do ar está ACEITÁVEL",
    recommendations: [
      "⚠ Aumente ventilação",
      "⚠ Limpe filtros",
      "⚠ Monitore umidade"
    ]
  },
  alto: {
    level: "ALTO",
    color: "#FF6600",
    bgColor: "rgba(255, 102, 0, 0.1)",
    textColor: "#CC5500",
    description: "Sua qualidade do ar está COMPROMETIDA",
    recommendations: [
      "⚠ Ventile melhor",
      "⚠ Use purificador",
      "⚠ Reduza fontes"
    ]
  },
  critico: {
    level: "CRÍTICO",
    color: "#FF0000",
    bgColor: "rgba(255, 0, 0, 0.1)",
    textColor: "#CC0000",
    description: "Sua qualidade do ar está CRÍTICA!",
    recommendations: [
      "🚨 Ação imediata!",
      "🚨 Abra janelas",
      "🚨 Procure ajuda"
    ]
  }
};

export default function QuizCard() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (points: number) => {
    const newScores = [...scores, points];
    setScores(newScores);

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateRiskLevel = (): string => {
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const averageScore = totalScore / scores.length;

    if (averageScore < 20) return "baixo";
    if (averageScore < 45) return "moderado";
    if (averageScore < 70) return "alto";
    return "critico";
  };

  const calculatePercentage = (): number => {
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const maxScore = scores.length * 90;
    return Math.round((totalScore / maxScore) * 100);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores([]);
    setShowResults(false);
  };

  if (showResults) {
    const riskLevel = calculateRiskLevel();
    const result = RESULT_LEVELS[riskLevel];
    const percentage = calculatePercentage();

    return (
      <Card className="w-full max-w-sm mx-auto p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-2">Resultado da Avaliação</h2>
          <div className="text-sm text-slate-400">Qualidade do Ar Interno</div>
        </div>

        {/* Risk Level Indicator */}
        <div
          className="rounded-lg p-4 mb-6 text-center"
          style={{ backgroundColor: result.bgColor }}
        >
          <div
            className="text-4xl font-black mb-2"
            style={{ color: result.color }}
          >
            {percentage}%
          </div>
          <div
            className="text-lg font-bold mb-1"
            style={{ color: result.textColor }}
          >
            Risco: {result.level}
          </div>
          <div className="text-sm text-slate-400">{result.description}</div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${percentage}%`,
                backgroundColor: result.color
              }}
            />
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-6 space-y-2">
          {result.recommendations.map((rec, idx) => (
            <div key={idx} className="text-sm text-slate-300 flex items-center">
              <span className="mr-2">{rec}</span>
            </div>
          ))}
        </div>

        {/* Score Breakdown */}
        <div className="mb-6 bg-slate-700 rounded-lg p-3 text-xs">
          <div className="text-slate-300 mb-2 font-semibold">Pontuação por Pergunta:</div>
          <div className="grid grid-cols-5 gap-1">
            {scores.map((score, idx) => (
              <div
                key={idx}
                className="h-8 rounded flex items-center justify-center text-white font-bold text-xs"
                style={{
                  backgroundColor:
                    score < 20 ? "#00CC00" :
                    score < 45 ? "#FFCC00" :
                    score < 70 ? "#FF6600" :
                    "#FF0000"
                }}
              >
                {Math.round((score / 90) * 100)}%
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={resetQuiz}
            variant="outline"
            className="flex-1 text-sm"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Refazer
          </Button>
          <Button
            className="flex-1 text-sm bg-orange-600 hover:bg-orange-700"
          >
            Mais Info
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </Card>
    );
  }

  const question = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <Card className="w-full max-w-sm mx-auto p-6 bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-2xl">
      {/* Header */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-white">Quiz Rápido</h2>
          <span className="text-xs font-semibold text-orange-500">
            {currentQuestion + 1}/{QUIZ_QUESTIONS.length}
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-white mb-4 leading-tight">
          {question.text}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option.points)}
            className="w-full p-3 text-left text-sm rounded-lg border border-slate-600 hover:border-orange-500 hover:bg-slate-700 transition-all duration-200 text-slate-200 hover:text-white font-medium"
          >
            {option.text}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 text-xs text-slate-500 text-center">
        Avalie sua qualidade do ar em tempo real
      </div>
    </Card>
  );
}
