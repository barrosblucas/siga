import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  FileText,
  Sparkles,
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function LandingPage() {
  return (
    <div className="page-shell">
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0">
          <div className="absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-accent-100 blur-3xl opacity-70" />
          <div className="absolute bottom-[-20%] left-[-5%] h-80 w-80 rounded-full bg-surface-2 blur-3xl opacity-80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="chip">
              <Sparkles className="w-4 h-4" />
              Transparencia inteligente para 2026
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink-900" style={{ fontFamily: 'var(--font-display)' }}>
              Bandeirantes Transparente: a gestao na palma da sua mao
            </h1>
            <p className="section-subtitle max-w-xl">
              Bem-vindo ao novo portal de transparencia de Bandeirantes. Transformamos numeros em
              informacoes claras para mostrar onde o imposto e investido, quais obras mudam a cidade e
              como construimos o futuro juntos.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/transparencia/despesas" className="cta-primary">
                Portal da Transparencia
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/relatorio-dti" className="cta-secondary">
                Relatorio de Gestao
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {[
                { label: 'Economia anual', value: 'R$ 420k+' },
                { label: 'Obras monitoradas', value: '38 frentes' },
                { label: 'Indicadores', value: '120 metas' },
                { label: 'Atualizacao', value: 'Semanal' },
              ].map((stat) => (
                <div key={stat.label} className="card-soft px-4 py-3">
                  <div className="text-lg font-semibold text-ink-900">{stat.value}</div>
                  <div className="text-xs text-ink-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="card overflow-hidden">
              <div className="h-72 sm:h-80 bg-[radial-gradient(circle_at_top,_#bcd3ff_0%,_#eef2f7_40%,_#ffffff_70%)]" />
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-ink-500">
                  <Building2 className="w-4 h-4 text-accent-600" />
                  Prefeitura Municipal de Bandeirantes
                </div>
                <h3 className="mt-2 text-lg font-semibold text-ink-900">Centro Administrativo</h3>
                <p className="mt-2 text-sm text-ink-500">
                  Informacoes, obras e servicos reunidos em uma experiencia unica.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-6 right-6 card-soft px-4 py-3 animate-float">
              <div className="text-xs text-ink-500">Ultima atualizacao</div>
              <div className="text-sm font-semibold text-ink-900">Hoje, 08:30</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="section-title">Painel de Dados: o municipio em numeros</h2>
              <p className="section-subtitle">
                Informacoes atualizadas sobre orcamento, metas e investimentos.
              </p>
            </div>
            <span className="chip">Atualizado em tempo real</span>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 grid gap-6 md:grid-cols-2"
          >
            {[
              {
                title: '90% Urbanizacao',
                text: 'Meta de pavimentacao urbana com o programa MS Ativo.',
              },
              {
                title: 'Orcamento 2026',
                text: 'Previsao de receitas e investimentos para o proximo ano.',
              },
              {
                title: 'Saude em Foco',
                text: 'Investimento recorde na reforma do Hospital Municipal.',
              },
              {
                title: 'Educacao em Dia',
                text: 'Novos onibus escolares e equipamentos para os CMEIs.',
              },
            ].map((card) => (
              <motion.div key={card.title} variants={item} className="card p-6 flex gap-4">
                <div className="h-16 w-16 rounded-2xl bg-[linear-gradient(135deg,_#dbe7ff_0%,_#f6f7fb_50%,_#ffffff_100%)] border border-line" />
                <div>
                  <h3 className="text-lg font-semibold text-ink-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-ink-500">{card.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section bg-white border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Transparencia por areas</h2>
          <p className="section-subtitle">
            Acompanhe as principais frentes de trabalho com clareza e contexto.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="tab tab-active">Obras e Projetos</button>
            <button className="tab">Financas</button>
            <button className="tab">Servicos</button>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-semibold text-ink-900">O que estamos realizando hoje</h3>
            <p className="mt-2 text-sm text-ink-500 max-w-2xl">
              Transparencia e mostrar a transformacao acontecendo nas ruas, com dados e narrativas.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: 'Pavimentacao MS Ativo',
                  status: 'Em execucao',
                  detail: 'Recapeamento e nova drenagem em diversas ruas e bairros.',
                  investimento: 'Recursos Estaduais/Municipais',
                },
                {
                  title: 'Projeto Lote Urbanizado',
                  status: 'Fase de inscricao',
                  detail: 'Sorteio e entrega de bases para construcao de casas proprias.',
                  investimento: 'Area urbana',
                },
                {
                  title: 'Prefeitura Presente',
                  status: 'Ativo',
                  detail: 'Servicos e cidadania nos distritos e assentamentos.',
                  investimento: 'Zonas rurais e distritos',
                },
              ].map((obra) => (
                <div key={obra.title} className="card p-6 flex flex-col gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-accent-50 border border-accent-100 flex items-center justify-center text-accent-700 font-semibold">
                    {obra.title.split(' ')[0][0]}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-ink-900">{obra.title}</h4>
                    <p className="mt-2 text-sm text-ink-500">{obra.detail}</p>
                  </div>
                  <div className="pt-4 border-t border-line text-sm">
                    <div className="flex justify-between text-ink-500">
                      <span>Status</span>
                      <span className="font-semibold text-ink-900">{obra.status}</span>
                    </div>
                    <div className="flex justify-between text-ink-500 mt-2">
                      <span>Investimento</span>
                      <span className="font-semibold text-ink-900">{obra.investimento}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Saiba mais sobre gestao publica</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Portal da Transparencia MS',
                text: 'Consulte os dados do Governo do Estado sobre Bandeirantes.',
                icon: BadgeCheck,
              },
              {
                title: 'Lei de Acesso a Informacao',
                text: 'Entenda seus direitos como cidadao para solicitar dados.',
                icon: FileText,
              },
              {
                title: 'Calendario de Audiencias',
                text: 'Participe das reunioes de planejamento do orcamento municipal.',
                icon: CalendarDays,
              },
            ].map((itemData) => (
              <div key={itemData.title} className="card p-6 flex flex-col gap-4">
                <div className="h-12 w-12 rounded-2xl bg-surface-2 border border-line flex items-center justify-center text-accent-700">
                  <itemData.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink-900">{itemData.title}</h3>
                  <p className="mt-2 text-sm text-ink-500">{itemData.text}</p>
                </div>
                <button className="cta-secondary w-fit">Acessar</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <span className="chip">
              <Sparkles className="w-4 h-4" />
              Projeto prioritario
            </span>
            <h2 className="section-title mt-5">Projeto Lote Urbanizado: construindo seu lar</h2>
            <p className="section-subtitle">
              Uma parceria entre a Prefeitura e a AGEHAB-MS para facilitar o acesso a casa propria.
              O municipio doa o terreno, o Estado constrói a base e voce finaliza a obra.
            </p>
            <div className="mt-6 flex gap-4">
              <Link to="/iniciativas" className="cta-primary">Ver iniciativas</Link>
              <button className="cta-secondary">Consultar criterios</button>
            </div>
          </div>
          <div className="card overflow-hidden">
            <div className="h-72 bg-[linear-gradient(135deg,_#fef3c7_0%,_#fff7ed_40%,_#ffffff_100%)]" />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-ink-900">Obras em andamento</h3>
              <p className="mt-2 text-sm text-ink-500">
                Infraestrutura pronta para receber as novas familias.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Detalhes do programa em Bandeirantes</h2>
          <p className="section-subtitle">Entenda as etapas e responsabilidades de cada parte.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="tab tab-active">Como funciona</button>
            <button className="tab">Criterios</button>
            <button className="tab">Documentos</button>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Papel da Prefeitura',
                items: ['Terreno urbanizado', 'Loteamento Pedro Constantino', 'Acompanhamento tecnico'],
              },
              {
                title: 'Papel do Estado (AGEHAB)',
                items: ['Infraestrutura e contrapiso', 'Primeira fiada de tijolos', 'Instalacoes enterradas'],
              },
              {
                title: 'Papel do Cidadao',
                items: ['Levantamento das paredes', 'Prazo de ate 24 meses', 'Financiamento do telhado'],
              },
            ].map((role) => (
              <div key={role.title} className="card p-6">
                <h3 className="text-lg font-semibold text-ink-900">{role.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-ink-500">
                  {role.items.map((itemText) => (
                    <li key={itemText} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-accent-600" />
                      {itemText}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Duvidas frequentes</h2>
          <div className="mt-6 space-y-4 text-sm text-ink-600">
            <p>
              <strong className="text-ink-900">Posso morar na casa antes de terminar?</strong> Nao. A moradia
              so pode ser habitada apos a conclusao total da obra.
            </p>
            <p>
              <strong className="text-ink-900">O que acontece se nao terminar no prazo?</strong> O prazo e de 24
              meses. Caso a obra nao avance, o beneficiario pode perder o direito ao lote.
            </p>
          </div>

          <div className="mt-10 card p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <h3 className="text-xl font-semibold text-ink-900">Voce ja possui cadastro atualizado na AGEHAB-MS?</h3>
                <p className="mt-2 text-sm text-ink-500">Mantenha seus dados prontos para futuras etapas.</p>
              </div>
              <div className="min-w-[240px]">
                <div className="flex justify-between text-xs text-ink-500 mb-2">
                  <span>Nao tenho</span>
                  <span>Ja tenho</span>
                </div>
                <div className="relative h-2 bg-surface-2 rounded-full">
                  <div className="absolute inset-y-0 left-0 w-full bg-accent-200 rounded-full" />
                  <div className="absolute top-1/2 right-2 h-4 w-4 bg-accent-600 rounded-full -translate-y-1/2 shadow-[var(--shadow-soft)]" />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-ink-900">Em qual regiao de Bandeirantes voce tem mais interesse?</h4>
              <div className="mt-3 flex flex-wrap gap-3">
                {['Loteamento Pedro Constantino', 'Distrito de Congonhas', 'Ainda nao sei'].map((chip) => (
                  <button key={chip} className="cta-secondary text-sm px-4 py-2">
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
