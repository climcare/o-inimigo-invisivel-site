import { useState } from "react";
import Quiz, { QuizResult } from "@/components/Quiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function QuizPage() {
  const [, setLocation] = useLocation();
  const [completedQuiz, setCompletedQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setCompletedQuiz(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 pt-32 pb-20">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="gap-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Avalie a Qualidade do Ar
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Responda a um breve questionário sobre seus ambientes (hospital, escritório ou casa) e receba uma avaliação personalizada de risco e recomendações de ação.
          </p>
        </div>

        {/* Quiz Component */}
        <Quiz onComplete={handleQuizComplete} />

        {/* Info Section */}
        {!completedQuiz && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
              <div className="text-3xl mb-3">🏥</div>
              <h3 className="font-bold text-lg mb-2">Hospital</h3>
              <p className="text-sm text-muted-foreground">
                Avalie ventilação, umidade, mofo e manutenção de sistemas
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="font-bold text-lg mb-2">Escritório</h3>
              <p className="text-sm text-muted-foreground">
                Analise densidade de pessoas, ventilação e seu bem-estar
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-bold text-lg mb-2">Casa</h3>
              <p className="text-sm text-muted-foreground">
                Verifique ventilação, umidade, alergias e fontes de poluição
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
