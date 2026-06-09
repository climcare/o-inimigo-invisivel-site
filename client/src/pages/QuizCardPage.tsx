import QuizCard from "@/components/QuizCard";

export default function QuizCardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Avalie Sua<br />
            <span className="text-orange-500">Qualidade do Ar</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Responda 5 perguntas rápidas e descubra o nível de risco da qualidade do ar no seu ambiente
          </p>
        </div>

        {/* Quiz Card */}
        <QuizCard />

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500 mb-2">✓</div>
            <div className="text-sm font-semibold text-white mb-1">Rápido</div>
            <div className="text-xs text-slate-400">Apenas 2 minutos</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-500 mb-2">⚠</div>
            <div className="text-sm font-semibold text-white mb-1">Preciso</div>
            <div className="text-xs text-slate-400">Baseado em ciência</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-500 mb-2">📊</div>
            <div className="text-sm font-semibold text-white mb-1">Acionável</div>
            <div className="text-xs text-slate-400">Recomendações práticas</div>
          </div>
        </div>

        {/* Risk Levels Explanation */}
        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Níveis de Risco</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-500 mx-auto mb-2" />
              <div className="text-sm font-semibold text-white">Baixo</div>
              <div className="text-xs text-slate-400">0-25%</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-yellow-500 mx-auto mb-2" />
              <div className="text-sm font-semibold text-white">Moderado</div>
              <div className="text-xs text-slate-400">25-50%</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500 mx-auto mb-2" />
              <div className="text-sm font-semibold text-white">Alto</div>
              <div className="text-xs text-slate-400">50-75%</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-500 mx-auto mb-2" />
              <div className="text-sm font-semibold text-white">Crítico</div>
              <div className="text-xs text-slate-400">75-100%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
