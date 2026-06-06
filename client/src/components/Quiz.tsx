import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";

export interface QuizQuestion {
  id: string;
  category: "hospital" | "office" | "home";
  question: string;
  options: {
    text: string;
    value: number; // 0-3 (0 = baixo risco, 3 = alto risco)
  }[];
}

export interface QuizResult {
  hospitalScore: number;
  officeScore: number;
  homeScore: number;
  totalScore: number;
  riskLevel: "baixo" | "moderado" | "alto" | "crítico";
  recommendations: string[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Hospital questions
  {
    id: "h1",
    category: "hospital",
    question: "Como você avalia a ventilação nos quartos de pacientes?",
    options: [
      { text: "Excelente - Sistema de ar condicionado moderno com filtros HEPA", value: 0 },
      { text: "Boa - Ventilação adequada, mas sem filtros avançados", value: 1 },
      { text: "Razoável - Ventilação limitada, janelas fechadas", value: 2 },
      { text: "Inadequada - Pouca ou nenhuma renovação de ar", value: 3 },
    ],
  },
  {
    id: "h2",
    category: "hospital",
    question: "Qual é o nível de umidade nos ambientes hospitalares?",
    options: [
      { text: "Controlado - 40-60% com desumidificadores", value: 0 },
      { text: "Aceitável - Umidade entre 30-70%", value: 1 },
      { text: "Elevado - Frequentemente acima de 70%", value: 2 },
      { text: "Muito elevado - Condensação visível nas paredes", value: 3 },
    ],
  },
  {
    id: "h3",
    category: "hospital",
    question: "Com que frequência os sistemas de ar são mantidos e limpos?",
    options: [
      { text: "Mensalmente - Manutenção preventiva regular", value: 0 },
      { text: "Trimestralmente - Manutenção periódica", value: 1 },
      { text: "Anualmente - Apenas manutenção anual", value: 2 },
      { text: "Raramente - Sem cronograma de manutenção", value: 3 },
    ],
  },
  {
    id: "h4",
    category: "hospital",
    question: "Há sinais visíveis de mofo ou bolor nas paredes/tetos?",
    options: [
      { text: "Nenhum - Ambiente completamente limpo", value: 0 },
      { text: "Mínimo - Apenas em áreas isoladas", value: 1 },
      { text: "Moderado - Visível em vários locais", value: 2 },
      { text: "Extenso - Mofo generalizado em múltiplas áreas", value: 3 },
    ],
  },

  // Office questions
  {
    id: "o1",
    category: "office",
    question: "Quantas pessoas trabalham no seu espaço?",
    options: [
      { text: "1-5 pessoas em espaço amplo (>50m²)", value: 0 },
      { text: "5-15 pessoas em espaço médio (20-50m²)", value: 1 },
      { text: "15-30 pessoas em espaço reduzido (<20m²)", value: 2 },
      { text: "30+ pessoas em espaço muito reduzido (<10m²)", value: 3 },
    ],
  },
  {
    id: "o2",
    category: "office",
    question: "As janelas podem ser abertas para ventilação natural?",
    options: [
      { text: "Sim - Janelas abertas regularmente durante o dia", value: 0 },
      { text: "Parcialmente - Janelas abertas ocasionalmente", value: 1 },
      { text: "Raramente - Janelas seladas ou abertas muito pouco", value: 2 },
      { text: "Nunca - Ambiente completamente fechado", value: 3 },
    ],
  },
  {
    id: "o3",
    category: "office",
    question: "Há sistema de ar condicionado ou ventilação mecânica?",
    options: [
      { text: "Sim - Sistema moderno com renovação de ar constante", value: 0 },
      { text: "Sim - Sistema básico sem renovação de ar", value: 1 },
      { text: "Parcial - Apenas em algumas áreas", value: 2 },
      { text: "Não - Sem sistema de ventilação", value: 3 },
    ],
  },
  {
    id: "o4",
    category: "office",
    question: "Como você se sente ao final do dia de trabalho?",
    options: [
      { text: "Energizado - Sem fadiga ou desconforto", value: 0 },
      { text: "Normal - Ligeira fadiga natural", value: 1 },
      { text: "Cansado - Fadiga significativa e falta de concentração", value: 2 },
      { text: "Muito cansado - Fadiga extrema e dor de cabeça frequente", value: 3 },
    ],
  },

  // Home questions
  {
    id: "ho1",
    category: "home",
    question: "Como é a ventilação do seu ambiente?",
    options: [
      { text: "Excelente - Janelas abertas regularmente, boa circulação", value: 0 },
      { text: "Boa - Janelas abertas ocasionalmente", value: 1 },
      { text: "Razoável - Pouca ventilação natural", value: 2 },
      { text: "Inadequada - Ambiente muito fechado", value: 3 },
    ],
  },
  {
    id: "ho2",
    category: "home",
    question: "Há sinais de umidade ou mofo em seu ambiente?",
    options: [
      { text: "Nenhum - Ambiente seco e limpo", value: 0 },
      { text: "Mínimo - Apenas em dias muito úmidos", value: 1 },
      { text: "Moderado - Condensação nas janelas ou manchas ocasionais", value: 2 },
      { text: "Extenso - Mofo visível, odor de umidade", value: 3 },
    ],
  },
  {
    id: "ho3",
    category: "home",
    question: "Há animais de estimação ou alergias em casa?",
    options: [
      { text: "Nenhum - Sem animais ou alergias", value: 0 },
      { text: "Sim - Mas com limpeza regular", value: 1 },
      { text: "Sim - Limpeza ocasional", value: 2 },
      { text: "Sim - Sem limpeza adequada", value: 3 },
    ],
  },
  {
    id: "ho4",
    category: "home",
    question: "Há fumantes ou fontes de poluição interna?",
    options: [
      { text: "Nenhuma - Ambiente livre de fumaça e poluentes", value: 0 },
      { text: "Mínima - Ocasional, bem ventilado", value: 1 },
      { text: "Moderada - Fumaça ou poluentes ocasionais", value: 2 },
      { text: "Significativa - Fumaça ou poluentes frequentes", value: 3 },
    ],
  },
];

interface QuizProps {
  onComplete?: (result: QuizResult) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleSelectAnswer = (value: number) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = {
        ...answers,
        [currentQuestion.id]: selectedAnswer,
      };
      setAnswers(newAnswers);

      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        calculateResults(newAnswers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[QUIZ_QUESTIONS[currentQuestionIndex - 1].id] || null);
    }
  };

  const calculateResults = (finalAnswers: Record<string, number>) => {
    let hospitalScore = 0;
    let officeScore = 0;
    let homeScore = 0;

    QUIZ_QUESTIONS.forEach((q) => {
      const score = finalAnswers[q.id] || 0;
      if (q.category === "hospital") hospitalScore += score;
      else if (q.category === "office") officeScore += score;
      else if (q.category === "home") homeScore += score;
    });

    const totalScore = hospitalScore + officeScore + homeScore;
    const maxScore = QUIZ_QUESTIONS.length * 3;
    const riskPercentage = (totalScore / maxScore) * 100;

    let riskLevel: "baixo" | "moderado" | "alto" | "crítico";
    if (riskPercentage < 25) riskLevel = "baixo";
    else if (riskPercentage < 50) riskLevel = "moderado";
    else if (riskPercentage < 75) riskLevel = "alto";
    else riskLevel = "crítico";

    const recommendations = generateRecommendations(
      hospitalScore,
      officeScore,
      homeScore,
      riskLevel
    );

    const quizResult: QuizResult = {
      hospitalScore,
      officeScore,
      homeScore,
      totalScore,
      riskLevel,
      recommendations,
    };

    setResult(quizResult);
    setShowResults(true);
    onComplete?.(quizResult);
  };

  const generateRecommendations = (
    hospitalScore: number,
    officeScore: number,
    homeScore: number,
    riskLevel: string
  ): string[] => {
    const recommendations: string[] = [];

    if (hospitalScore >= 6) {
      recommendations.push(
        "🏥 Hospital: Implementar sistema de filtração HEPA e monitoramento contínuo de umidade"
      );
      recommendations.push(
        "🏥 Hospital: Aumentar frequência de manutenção dos sistemas de ar para mensal"
      );
      recommendations.push(
        "🏥 Hospital: Investigar e tratar áreas com mofo ou bolor"
      );
    }

    if (officeScore >= 6) {
      recommendations.push(
        "💼 Escritório: Abrir janelas regularmente para ventilação natural"
      );
      recommendations.push(
        "💼 Escritório: Considerar instalação de sistema de renovação de ar"
      );
      recommendations.push(
        "💼 Escritório: Reduzir densidade de pessoas por m² ou aumentar espaço"
      );
    }

    if (homeScore >= 6) {
      recommendations.push(
        "🏠 Casa: Abrir janelas diariamente por pelo menos 15 minutos"
      );
      recommendations.push(
        "🏠 Casa: Usar desumidificador se houver sinais de umidade"
      );
      recommendations.push(
        "🏠 Casa: Aumentar limpeza e remover fontes de poluição"
      );
    }

    if (riskLevel === "crítico") {
      recommendations.push(
        "⚠️ Risco Crítico: Consulte um especialista em qualidade do ar imediatamente"
      );
      recommendations.push(
        "⚠️ Risco Crítico: Considere usar purificador de ar portátil"
      );
    } else if (riskLevel === "alto") {
      recommendations.push(
        "⚠️ Risco Alto: Implemente melhorias de ventilação o quanto antes"
      );
    }

    if (recommendations.length === 0) {
      recommendations.push(
        "✅ Sua qualidade do ar está em bom estado. Mantenha as práticas atuais!"
      );
    }

    return recommendations;
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedAnswer(null);
    setShowResults(false);
    setResult(null);
  };

  if (showResults && result) {
    return <QuizResults result={result} onReset={resetQuiz} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="p-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Pergunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-sm font-semibold text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
            {currentQuestion.category === "hospital"
              ? "🏥 Hospital"
              : currentQuestion.category === "office"
                ? "💼 Escritório"
                : "🏠 Casa"}
          </span>
        </div>

        {/* Question */}
        <h3 className="text-2xl font-bold mb-8">{currentQuestion.question}</h3>

        {/* Options */}
        <RadioGroup value={selectedAnswer?.toString() || ""} onValueChange={(v) => handleSelectAnswer(parseInt(v))}>
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-slate-50 cursor-pointer transition">
                <RadioGroupItem value={option.value.toString()} id={`option-${idx}`} />
                <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="gap-2 ml-auto"
          >
            {currentQuestionIndex === QUIZ_QUESTIONS.length - 1
              ? "Ver Resultados"
              : "Próxima"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

interface QuizResultsProps {
  result: QuizResult;
  onReset: () => void;
}

function QuizResults({ result, onReset }: QuizResultsProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "baixo":
        return "text-green-600";
      case "moderado":
        return "text-yellow-600";
      case "alto":
        return "text-orange-600";
      case "crítico":
        return "text-red-600";
      default:
        return "text-slate-600";
    }
  };

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case "baixo":
        return "bg-green-50 border-green-200";
      case "moderado":
        return "bg-yellow-50 border-yellow-200";
      case "alto":
        return "bg-orange-50 border-orange-200";
      case "crítico":
        return "bg-red-50 border-red-200";
      default:
        return "bg-slate-50 border-slate-200";
    }
  };

  const maxCategoryScore = 12; // 4 questions × 3 points each

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className={`p-8 border-2 ${getRiskBgColor(result.riskLevel)}`}>
        {/* Risk Level */}
        <div className="text-center mb-8">
          <h2 className={`text-4xl font-bold mb-2 ${getRiskColor(result.riskLevel)}`}>
            Risco: {result.riskLevel.toUpperCase()}
          </h2>
          <p className="text-muted-foreground">
            Pontuação total: {result.totalScore} de {QUIZ_QUESTIONS.length * 3}
          </p>
        </div>

        {/* Category Scores */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-2">🏥 Hospital</p>
            <p className="text-2xl font-bold">{result.hospitalScore}/12</p>
            <Progress value={(result.hospitalScore / maxCategoryScore) * 100} className="mt-2 h-1" />
          </div>
          <div className="bg-white p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-2">💼 Escritório</p>
            <p className="text-2xl font-bold">{result.officeScore}/12</p>
            <Progress value={(result.officeScore / maxCategoryScore) * 100} className="mt-2 h-1" />
          </div>
          <div className="bg-white p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-2">🏠 Casa</p>
            <p className="text-2xl font-bold">{result.homeScore}/12</p>
            <Progress value={(result.homeScore / maxCategoryScore) * 100} className="mt-2 h-1" />
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg">Recomendações Personalizadas:</h3>
          {result.recommendations.map((rec, idx) => (
            <div key={idx} className="flex gap-3 p-3 bg-white rounded-lg border border-border">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm">{rec}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button onClick={onReset} variant="outline" className="flex-1">
            Fazer Quiz Novamente
          </Button>
          <Button className="flex-1 gap-2">
            Compartilhar Resultados
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Info Box */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-sm">Próximos Passos</p>
            <p className="text-sm text-muted-foreground">
              Compartilhe seus resultados com gestores ou responsáveis pela manutenção dos ambientes. A qualidade do ar é um investimento em saúde e produtividade.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
