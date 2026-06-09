import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, CheckCircle2, AlertCircle, Frown, Smile } from "lucide-react";

interface Question {
  id: number;
  icon: string;
  text: string;
  options: {
    label: string;
    emoji: string;
    points: number;
    color: string;
  }[];
}

interface ResultLevel {
  range: string;
  title: string;
  emoji: string;
  color: string;
  bgColor: string;
  description: string;
  recommendations: string[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    icon: "💨",
    text: "O ambiente fica abafado?",
    options: [
      { label: "Nunca", emoji: "😊", points: 0, color: "bg-green-500" },
      { label: "Às vezes", emoji: "😐", points: 1, color: "bg-yellow-500" },
      { label: "Frequentemente", emoji: "😞", points: 3, color: "bg-red-500" }
    ]
  },
  {
    id: 2,
    icon: "😴",
    text: "Você sente cansaço ou sonolência no local?",
    options: [
      { label: "Nunca", emoji: "😊", points: 0, color: "bg-green-500" },
      { label: "Às vezes", emoji: "😐", points: 1, color: "bg-yellow-500" },
      { label: "Frequentemente", emoji: "😞", points: 3, color: "bg-red-500" }
    ]
  },
  {
    id: 3,
    icon: "🧠",
    text: "Tem dificuldade para se concentrar?",
    options: [
      { label: "Nunca", emoji: "😊", points: 0, color: "bg-green-500" },
      { label: "Às vezes", emoji: "😐", points: 1, color: "bg-yellow-500" },
      { label: "Frequentemente", emoji: "😞", points: 3, color: "bg-red-500" }
    ]
  },
  {
    id: 4,
    icon: "🍄",
    text: "Existe cheiro de mofo ou umidade?",
    options: [
      { label: "Nunca", emoji: "😊", points: 0, color: "bg-green-500" },
      { label: "Às vezes", emoji: "😐", points: 1, color: "bg-yellow-500" },
      { label: "Frequentemente", emoji: "😞", points: 3, color: "bg-red-500" }
    ]
  },
  {
    id: 5,
    icon: "👁️",
    text: "Há irritação nos olhos, nariz ou garganta?",
    options: [
      { label: "Nunca", emoji: "😊", points: 0, color: "bg-green-500" },
      { label: "Às vezes", emoji: "😐", points: 1, color: "bg-yellow-500" },
      { label: "Frequentemente", emoji: "😞", points: 3, color: "bg-red-500" }
    ]
  }
];

const RESULT_LEVELS: ResultLevel[] = [
  {
    range: "0 a 3",
    title: "BAIXO RISCO",
    emoji: "😊",
    color: "#00CC00",
    bgColor: "rgba(0, 204, 0, 0.1)",
    description: "A qualidade do ar está boa!",
    recommendations: [
      "✓ Mantenha a ventilação",
      "✓ Continue monitorando",
      "✓ Ambiente saudável"
    ]
  },
  {
    range: "4 a 6",
    title: "ATENÇÃO",
    emoji: "😐",
    color: "#FFCC00",
    bgColor: "rgba(255, 204, 0, 0.1)",
    description: "Existem sinais que merecem atenção.",
    recommendations: [
      "⚠ Observe e cuide do ambiente",
      "⚠ Aumente ventilação",
      "⚠ Limpe filtros regularmente"
    ]
  },
  {
    range: "7 a 10",
    title: "RISCO ELEVADO",
    emoji: "😞",
    color: "#FF6600",
    bgColor: "rgba(255, 102, 0, 0.1)",
    description: "A qualidade do ar pode estar afetando seu bem-estar.",
    recommendations: [
      "⚠ Investigue o ambiente",
      "⚠ Use purificador de ar",
      "⚠ Procure melhorias urgentes"
    ]
  },
  {
    range: "11 a 15",
    title: "RISCO ALTO",
    emoji: "😞",
    color: "#FF0000",
    bgColor: "rgba(255, 0, 0, 0.1)",
    description: "Há fortes indícios de problemas ambientais.",
    recommendations: [
      "🚨 É recomendada avaliação técnica",
      "🚨 Implemente melhorias urgentes",
      "🚨 Consulte especialista"
    ]
  }
];

export default function QuizMobileCard() {
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

  const calculateTotalScore = (): number => {
    return scores.reduce((a, b) => a + b, 0);
  };

  const getResultLevel = (): ResultLevel => {
    const total = calculateTotalScore();
    if (total <= 3) return RESULT_LEVELS[0];
    if (total <= 6) return RESULT_LEVELS[1];
    if (total <= 10) return RESULT_LEVELS[2];
    return RESULT_LEVELS[3];
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores([]);
    setShowResults(false);
  };

  if (showResults) {
    const result = getResultLevel();
    const total = calculateTotalScore();

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border-orange-500/30 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-6 text-center">
            <h2 className="text-3xl font-black text-white mb-2">
              {result.emoji}
            </h2>
            <h3 className="text-2xl font-black text-white">{result.title}</h3>
            <div className="text-sm text-orange-100 mt-2">Pontuação: {total} pontos</div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div
              className="rounded-lg p-4 text-center"
              style={{ backgroundColor: result.bgColor }}
            >
              <p className="text-white font-semibold text-lg">
                {result.description}
              </p>
            </div>

            {/* Score Breakdown */}
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="text-sm font-semibold text-slate-300 mb-3">
                Pontuação por Pergunta:
              </div>
              <div className="grid grid-cols-5 gap-2">
                {scores.map((score, idx) => (
                  <div
                    key={idx}
                    className="h-12 rounded flex items-center justify-center text-white font-bold text-sm"
                    style={{
                      backgroundColor:
                        score === 0 ? "#00CC00" :
                        score === 1 ? "#FFCC00" :
                        "#FF0000"
                    }}
                  >
                    {score}
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-2">
              <h4 className="font-semibold text-white text-sm">Recomendações:</h4>
              {result.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span className="text-slate-300 text-sm">{rec}</span>
                </div>
              ))}
            </div>

            {/* Good Practices */}
            <div className="bg-slate-700 rounded-lg p-4">
              <h4 className="font-semibold text-white text-sm mb-3">
                Boas Práticas para Ar Melhor:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-1">
                  <span>🌬️</span> Ventile bem
                </div>
                <div className="flex items-center gap-1">
                  <span>🪟</span> Abra janelas
                </div>
                <div className="flex items-center gap-1">
                  <span>💧</span> Controle umidade
                </div>
                <div className="flex items-center gap-1">
                  <span>🧹</span> Limpe regularmente
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={resetQuiz}
                variant="outline"
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Refazer
              </Button>
              <Button
                className="flex-1 bg-orange-600 hover:bg-orange-700"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-800 px-6 py-3 text-center text-xs text-slate-400">
            Ar limpo, saúde e bem-estar para todos! 🌱
          </div>
        </Card>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border-orange-500/30 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">
              Como está a qualidade do ar?
            </h2>
            <span className="text-sm font-bold text-orange-400">
              {currentQuestion + 1}/5
            </span>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <div className="text-4xl mb-4 text-center">{question.icon}</div>
          <h3 className="text-xl font-bold text-white text-center mb-6 leading-tight">
            {question.text}
          </h3>

          {/* Legend */}
          <div className="mb-6 p-3 bg-slate-700 rounded-lg text-xs text-slate-300 text-center">
            <p className="font-semibold text-slate-200 mb-1">Para cada pergunta marque:</p>
            <div className="flex justify-around">
              <span>😊 Nunca (0)</span>
              <span>😐 Às vezes (1)</span>
              <span>😞 Frequentemente (3)</span>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.points)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 font-semibold text-white flex items-center justify-between ${option.color} hover:scale-105 active:scale-95`}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span>{option.label}</span>
                <span className="text-sm opacity-75">({option.points}pts)</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-800 px-6 py-3 text-center text-xs text-slate-400">
          Avalie sua qualidade do ar em tempo real
        </div>
      </Card>
    </div>
  );
}
