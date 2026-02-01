import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, FileText, Zap } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-16 pb-32 lg:pt-32 lg:pb-48">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
           <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-brand-600/20 blur-3xl" />
           <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Transparência e Inovação</span>
              <span className="block text-brand-400">para Bandeirantes</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              Acompanhe cada centavo investido, monitore obras em tempo real e descubra como a tecnologia está transformando nossa cidade.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/transparencia/despesas"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 md:py-4 md:text-lg md:px-10 transition-all shadow-lg shadow-brand-600/30"
              >
                Portal da Transparência
              </Link>
              <Link
                to="/relatorio-dti"
                className="px-8 py-3 border border-gray-500 text-base font-medium rounded-md text-gray-200 bg-transparent hover:bg-gray-800 md:py-4 md:text-lg md:px-10 transition-all"
              >
                Relatório de Gestão
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50 relative -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Card 1: Relatório DTI */}
            <motion.div variants={item} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 group">
              <div className="p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-blue-600">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Relatório de Gestão TI</h3>
                <p className="text-gray-600 mb-6">
                  Análise detalhada de gastos, economia gerada e modernização da infraestrutura tecnológica municipal.
                </p>
                <Link to="/relatorio-dti" className="inline-flex items-center text-brand-600 font-semibold hover:text-brand-700">
                  Ler relatório completo <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Card 2: Transparência */}
            <motion.div variants={item} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 group">
              <div className="p-8">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-green-600">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Dados Abertos</h3>
                <p className="text-gray-600 mb-6">
                  Visualize receitas e despesas em tempo real. Gráficos interativos e relatórios detalhados.
                </p>
                <Link to="/transparencia/despesas" className="inline-flex items-center text-brand-600 font-semibold hover:text-brand-700">
                  Acessar dados <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Card 3: Iniciativas */}
            <motion.div variants={item} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 group">
              <div className="p-8">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-purple-600">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Projetos & Iniciativas</h3>
                <p className="text-gray-600 mb-6">
                  Conheça as obras em andamento, programas sociais e melhorias nos serviços públicos.
                </p>
                <Link to="/iniciativas" className="inline-flex items-center text-brand-600 font-semibold hover:text-brand-700">
                  Ver projetos <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-extrabold text-brand-600">R$ 420k+</div>
              <div className="mt-2 text-sm text-gray-500 font-medium">Economia Anual em TI</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-extrabold text-brand-600">100%</div>
              <div className="mt-2 text-sm text-gray-500 font-medium">Digitalização de Processos</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-extrabold text-brand-600">45</div>
              <div className="mt-2 text-sm text-gray-500 font-medium">Pontos Conectados (Fibra)</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-extrabold text-brand-600">24/7</div>
              <div className="mt-2 text-sm text-gray-500 font-medium">Monitoramento de Rede</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
