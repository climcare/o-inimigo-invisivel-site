import { Button } from "@/components/ui/button";
import { ArrowRight, Wind, Droplets, AlertCircle, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Wind className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">O Inimigo Invisível</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#problema" className="text-sm hover:text-primary transition">Problema</a>
            <a href="#solucao" className="text-sm hover:text-primary transition">Solução</a>
            <a href="#impacto" className="text-sm hover:text-primary transition">Impacto</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50 -z-10" />
        
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-6xl md:text-7xl font-bold leading-tight">
              O Ar Que Não Vemos
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Partículas invisíveis, germes, bactérias e poluentes circulam nos ambientes onde passamos 90% do nosso tempo. Descubra como a qualidade do ar interno afeta sua saúde.
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="gap-2" onClick={() => setLocation('/quiz')}>
                Fazer Quiz <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setLocation('/quiz-card')}>
                Quiz Card
              </Button>
            </div>
          </div>
          <div className="relative h-96 md:h-full">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663738439141/fGJKnqBi2w9RpDW4ddtTLq/hero_ar_invisivel-RiLVq7Jki2uwtnUHeYFomu.webp"
              alt="Hospital com ar visível"
              className="w-full h-full object-cover rounded-lg shadow-2xl"
              style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            />
          </div>
        </div>
      </section>

      {/* Problema: Hospital */}
      <section id="problema" className="py-20 bg-white">
        <div className="container space-y-12">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-5xl font-bold">O Problema Invisível</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Em hospitais e escritórios, ambientes aparentemente limpos podem estar repletos de ameaças microscópicas
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setLocation('/quiz')}
              className="mx-auto mt-4"
            >
              Fazer Quiz Agora
            </Button>
          </div>

          {/* Hospital Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-4xl font-bold">Hospitais: Risco Crítico</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Em ambientes hospitalares, a qualidade do ar é crítica. Umidade persistente, superfícies mal ventiladas e partículas suspensas criam condições ideais para germes, bactérias, esporos de mofo e aerossóis circularem em espaços onde há pessoas mais vulneráveis.
              </p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Umidade + Ar Parado</p>
                    <p className="text-sm text-muted-foreground">Ampliam risco de contaminação microbiana</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Aerossóis em Suspensão</p>
                    <p className="text-sm text-muted-foreground">Viajam pelo ar antes que percebamos</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Mofo e Bactérias</p>
                    <p className="text-sm text-muted-foreground">Prosperam em ambientes úmidos</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663738439141/fGJKnqBi2w9RpDW4ddtTLq/hospital_umidade-RPkTu5p2Kxws8pSkQnDAVY.webp"
                alt="Quarto hospitalar com umidade"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problema: Escritório */}
      <section className="py-20 bg-slate-50">
        <div className="container space-y-12">
          {/* Escritório Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-96 order-2 md:order-1">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663738439141/fGJKnqBi2w9RpDW4ddtTLq/escritorio_co2-dDq7zwUwo6s4MmCa4gxZV7.webp"
                alt="Escritório superlotado com CO2"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h3 className="text-4xl font-bold">Escritórios: Ar Pesado</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Muitas pessoas, pouca renovação de ar e ventilação insuficiente transformam o ambiente em um espaço pesado, cansativo e improdutivo. O CO₂ acumulado afeta concentração, conforto e desempenho.
              </p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">CO₂ Elevado</p>
                    <p className="text-sm text-muted-foreground">Reduz foco e resposta cognitiva</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">PM2.5 Acumulado</p>
                    <p className="text-sm text-muted-foreground">Partículas finas prejudicam respiração</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Fadiga Generalizada</p>
                    <p className="text-sm text-muted-foreground">Cansaço antes do fim do dia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impacto no Corpo */}
      <section id="impacto" className="py-20 bg-white">
        <div className="container space-y-12">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-5xl font-bold">Como o Ar Doente Afeta o Corpo</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              O ar não fica do lado de fora do corpo. Ele entra, circula e interfere em funções vitais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-96 md:h-full">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663738439141/fGJKnqBi2w9RpDW4ddtTLq/corpo_humano_ar-6WAG2nmq7kbqfRAE7Dvn3N.webp"
                alt="Corpo humano afetado por ar doente"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-bold text-lg">Cérebro: Foco e Resposta</h4>
                  <p className="text-muted-foreground">CO₂ elevado prejudica concentração, tomada de decisão e resposta cognitiva</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-bold text-lg">Pulmões: Partículas Finas</h4>
                  <p className="text-muted-foreground">PM2.5 alcança regiões profundas dos pulmões, afetando troca de oxigênio</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <h4 className="font-bold text-lg">Corpo: Fadiga e Desconforto</h4>
                  <p className="text-muted-foreground">Desconforto térmico e má qualidade do ar causam cansaço geral e irritação</p>
                </div>
                <div className="border-l-4 border-accent pl-4 py-2">
                  <h4 className="font-bold text-lg">Efeito Combinado</h4>
                  <p className="text-muted-foreground">Quando CO₂ e PM2.5 estão elevados, o corpo trabalha mais, afetando saúde geral</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparação Hospital vs Escritório */}
      <section className="py-20 bg-slate-50">
        <div className="container space-y-12">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-5xl font-bold">Ambientes Críticos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ambiente limpo não significa ar saudável
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-primary">
              <h3 className="text-2xl font-bold mb-4">Hospital</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Pacientes vulneráveis e imunossuprimidos</span>
                </li>
                <li className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Risco de infecções nosocomiais</span>
                </li>
                <li className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Umidade e mofo prejudicam recuperação</span>
                </li>
                <li className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Aerossóis viajam entre quartos</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-accent">
              <h3 className="text-2xl font-bold mb-4">Escritório</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Muitas pessoas em espaço reduzido</span>
                </li>
                <li className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>CO₂ acumulado reduz produtividade</span>
                </li>
                <li className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Fadiga e falta de concentração</span>
                </li>
                <li className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Transmissão de doenças respiratórias</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solução */}
      <section id="solucao" className="py-20 bg-white">
        <div className="container space-y-12">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-5xl font-bold">A Solução: Ar Saudável</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tornar o invisível mensurável e controlável
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                O primeiro passo é tornar o invisível mensurável. Monitorar, ventilar, filtrar, controlar a umidade e manter sistemas limpos são ações que transformam ambientes fechados em espaços mais seguros, produtivos e saudáveis.
              </p>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Monitoramento</p>
                    <p className="text-sm text-muted-foreground">Sensores de CO₂, PM2.5 e umidade em tempo real</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Ventilação</p>
                    <p className="text-sm text-muted-foreground">Renovação constante de ar fresco</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Filtração</p>
                    <p className="text-sm text-muted-foreground">Captura de partículas finas e poluentes</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Controle de Umidade</p>
                    <p className="text-sm text-muted-foreground">Previne mofo e proliferação de microorganismos</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Manutenção</p>
                    <p className="text-sm text-muted-foreground">Limpeza regular de sistemas e superfícies</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663738439141/fGJKnqBi2w9RpDW4ddtTLq/solucao_ar_limpo-e2JcAo7kCuJhZseadYunoE.webp"
                alt="Solução com filtração e sensor de qualidade do ar"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-white to-accent/10">
        <div className="container text-center space-y-8">
          <h2 className="text-5xl font-bold">O Ar é Invisível</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Seus efeitos, não. Cuidar da qualidade do ar interno é cuidar da saúde, da segurança e da vida que acontece dentro dos ambientes.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" className="gap-2" onClick={() => setLocation('/quiz')}>
              Avaliar Seu Ambiente <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              Compartilhar
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">O Inimigo Invisível</h4>
              <p className="text-sm text-slate-400">Educação sobre qualidade do ar interno e saúde</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Guia Completo</a></li>
                <li><a href="#" className="hover:text-white transition">Pesquisa</a></li>
                <li><a href="#" className="hover:text-white transition">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Saúde</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">Hospital</a></li>
                <li><a href="#" className="hover:text-white transition">Escritório</a></li>
                <li><a href="#" className="hover:text-white transition">Escola</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Seguir</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2026 O Inimigo Invisível. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
