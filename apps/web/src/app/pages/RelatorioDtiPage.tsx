import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircle } from 'lucide-react';
import clsx from 'clsx';

// Data extracted from the report
const costComparisons = {
  frotas: [
    { name: 'GFrotas', valor: 14412, type: 'Mercado' },
    { name: 'EXP Frotas', valor: 13740, type: 'Mercado' },
    { name: 'DTI (Interno)', valor: 0, type: 'DTI' },
  ],
  processoSeletivo: [
    { name: 'JobConvo', valor: 10680, type: 'Mercado' },
    { name: 'Recrutei', valor: 4680, type: 'Mercado' },
    { name: 'DTI (Interno)', valor: 0, type: 'DTI' },
  ],
  matriculas: [
    { name: 'ClassApp', valor: 7200, type: 'Mercado' },
    { name: 'DKSoft', valor: 2314, type: 'Mercado' },
    { name: 'DTI (Interno)', valor: 0, type: 'DTI' },
  ],
  connectRural: [
    { name: 'AEGRO', valor: 6348, type: 'Mercado' },
    { name: 'ArcGIS', valor: 6348, type: 'Mercado' },
    { name: 'DTI (Interno)', valor: 0, type: 'DTI' },
  ],
  socialLink: [
    { name: 'Colab (Gov Digital)', valor: 144000, type: 'Mercado' },
    { name: 'Jotform', valor: 6500, type: 'Mercado' },
    { name: 'DTI (Interno)', valor: 0, type: 'DTI' },
  ],
  alvara: [
    { name: 'Aprova Digital', valor: 42000, type: 'Mercado' },
    { name: 'Gove', valor: 26400, type: 'Mercado' },
    { name: 'DTI (Interno)', valor: 0, type: 'DTI' },
  ],
  internet: [
    { name: 'Média Mercado', valor: 278892, type: 'Mercado' },
    { name: 'Bandeirantes', valor: 144900, type: 'DTI' }, // This one has a cost, but lower
  ]
};

const chapters = [
  { id: 'intro', title: 'Introdução' },
  { id: 'atendimento', title: 'Portal de Atendimento' },
  { id: 'frotas', title: 'Gestão de Frotas' },
  { id: 'seletivo', title: 'Processo Seletivo' },
  { id: 'matriculas', title: 'Matrículas Online' },
  { id: 'rural', title: 'Connect Rural' },
  { id: 'social', title: 'Social Link' },
  { id: 'alvara', title: 'Alvará Digital' },
  { id: 'internet', title: 'Internet Unificada' },
  { id: 'conclusao', title: 'Conclusão Financeira' },
];

const ChartComponent = ({ data, title }: { data: any[], title: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
    <h4 className="text-lg font-semibold text-gray-800 mb-4">{title} - Comparativo Anual (R$)</h4>
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tickFormatter={(value) => `R$ ${value/1000}k`} />
          <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
          <Tooltip 
            formatter={(value: any) => [
              `R$ ${value?.toLocaleString('pt-BR') ?? '0'}`, 
              'Custo Anual'
            ]}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={30}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.type === 'DTI' ? '#22c55e' : '#ef4444'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className="mt-4 text-sm text-gray-500 flex items-center gap-4 justify-center">
      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Soluções de Mercado</div>
      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Economia DTI</div>
    </div>
  </div>
);

export function RelatorioDtiPage() {
  const [activeChapter, setActiveChapter] = useState('intro');

  const scrollTo = (id: string) => {
    setActiveChapter(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header of the Report */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-sm font-medium mb-4 border border-brand-500/30">
              Relatório Oficial 2026
            </div>
            <h1 className="text-4xl font-bold md:text-5xl">Análise de Gastos de TI</h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl">
              Balanço de projetos e implementações: Otimização de recursos públicos e soberania tecnológica.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <nav className="space-y-1">
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => scrollTo(chapter.id)}
                  className={clsx(
                    'w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    activeChapter === chapter.id
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  {chapter.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-16">
          
          {/* Intro */}
          <section id="intro" className="scroll-mt-24">
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="lead text-xl text-gray-800 font-medium">
                A diretriz adotada pelo Departamento de TI baseia-se na substituição de controles manuais por sistemas digitais auditáveis desenvolvidos internamente.
              </p>
              <p>
                Em vez de contratar softwares de prateleira com mensalidades elevadas, o DTI optou pelo <strong>desenvolvimento interno</strong> de portais e aplicativos. Esta estratégia garante ao município a <strong>Soberania Tecnológica</strong>: os sistemas, os códigos e os dados pertencem integralmente à Prefeitura de Bandeirantes.
              </p>
            </div>
          </section>

          {/* Atendimento */}
          <section id="atendimento" className="scroll-mt-24 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600">1</div>
              Portal de Atendimento
            </h2>
            <p className="text-gray-600 mb-6">
              Migração para plataforma Ticktez (versão gratuita) para gestão de chamados.
              Anteriormente feito via WhatsApp pessoal, gerando risco de perda de dados.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="text-green-800 font-semibold mb-1">Economia Mensal</div>
                <div className="text-2xl font-bold text-green-700">R$ 2.698,20</div>
                <div className="text-sm text-green-600">em assinaturas evitadas</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-blue-800 font-semibold mb-1">Volumetria</div>
                <div className="text-2xl font-bold text-blue-700">3.130+</div>
                <div className="text-sm text-blue-600">atendimentos registrados</div>
              </div>
            </div>
          </section>

          {/* Frotas */}
          <section id="frotas" className="scroll-mt-24 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600">2</div>
              Gestão de Frotas
            </h2>
            <p className="text-gray-600">
              Controle de quilometragem, peças e abastecimento. O grande trunfo é o salto tecnológico sem custos fixos, utilizando mão de obra própria.
            </p>
            <ChartComponent data={costComparisons.frotas} title="Custo Anual Estimado" />
          </section>

          {/* Processo Seletivo */}
          <section id="seletivo" className="scroll-mt-24 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600">3</div>
              Portal do Processo Seletivo
            </h2>
            <p className="text-gray-600">
              Revitalização integral com foco em segurança (HTTPS) e UX. Elimina contratação de bancas ou ATS caros.
            </p>
            <ChartComponent data={costComparisons.processoSeletivo} title="Custo Anual Estimado" />
          </section>

          {/* Matrículas */}
          <section id="matriculas" className="scroll-mt-24 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600">4</div>
              Matrículas Online
            </h2>
            <p className="text-gray-600">
              Fim das filas presenciais. Inclusão urbana e rural num fluxo único digital.
            </p>
             <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded text-center">
                    <div className="text-2xl font-bold text-gray-900">463</div>
                    <div className="text-xs text-gray-500">Matrículas</div>
                </div>
                <div className="p-3 bg-gray-50 rounded text-center">
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-xs text-gray-500">Online</div>
                </div>
             </div>
            <ChartComponent data={costComparisons.matriculas} title="Comparativo com Mercado" />
          </section>

           {/* Connect Rural */}
           <section id="rural" className="scroll-mt-24 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600">5</div>
              Connect Rural
            </h2>
            <p className="text-gray-600">
              App Offline-first para coleta de dados no campo. Georreferenciamento e cadastro de produtores.
            </p>
            <ChartComponent data={costComparisons.connectRural} title="Comparativo com Softwares de Agronegócio" />
          </section>

          {/* Social Link */}
          <section id="social" className="scroll-mt-24 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600">6</div>
              Social Link (Habitação)
            </h2>
            <p className="text-gray-600">
              Algoritmo de pontuação para o "Minha Casa Minha Vida". Transparência e justiça social auditável.
            </p>
            <div className="my-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
                <strong>Impacto Massivo:</strong> Sistemas similares como "Colab" podem custar até R$ 144.000,00 anuais. O Social Link tem custo zero de licenciamento.
            </div>
            <ChartComponent data={costComparisons.socialLink} title="Economia Potencial Máxima" />
          </section>

          {/* Alvará */}
          <section id="alvara" className="scroll-mt-24 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600">7</div>
              Alvará Digital
            </h2>
            <p className="text-gray-600">
              Protocolo unificado para obras. Acelera a construção civil e a arrecadação.
            </p>
            <ChartComponent data={costComparisons.alvara} title="Comparativo de Licenciamento" />
          </section>

          {/* Internet */}
          <section id="internet" className="scroll-mt-24 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600">10</div>
              Unificação de Internet (10Gbps)
            </h2>
            <p className="text-gray-600">
              Rede MPLS privada interligando 45 pontos públicos. Fibra óptica dedicada e redundante.
            </p>
            <div className="grid grid-cols-2 gap-4 my-6">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-3xl font-bold text-brand-600">R$ 1,20</div>
                    <div className="text-sm text-gray-500">Custo por Mega</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-3xl font-bold text-brand-600">10 Gbps</div>
                    <div className="text-sm text-gray-500">Velocidade</div>
                </div>
            </div>
            <ChartComponent data={costComparisons.internet} title="Comparativo com Mercado (Média)" />
          </section>

          {/* Conclusão */}
          <section id="conclusao" className="scroll-mt-24 bg-gradient-to-br from-brand-900 to-slate-900 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
             <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6">Impacto Total no Orçamento</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                        <p className="text-brand-100 text-lg mb-6">
                            A estratégia de desenvolvimento interno e otimização de contratos gerou uma economia real superior a <strong>R$ 420.000,00 anuais</strong> aos cofres públicos.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-green-400" />
                                <span>Soberania Tecnológica (Código Próprio)</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-green-400" />
                                <span>Justiça Social e Transparência</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-green-400" />
                                <span>Infraestrutura de Futuro (Wi-Fi 7 & 10Gbps)</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10 text-center">
                        <div className="text-sm text-brand-200 uppercase tracking-widest font-semibold mb-2">Economia Gerada (Anual)</div>
                        <div className="text-5xl font-extrabold text-white mb-2">R$ 424.712</div>
                        <div className="text-xs text-brand-200">Ref. valores médios de mercado para municípios similares</div>
                    </div>
                </div>
             </div>
          </section>

        </div>
      </div>
    </div>
  );
}
