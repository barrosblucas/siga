import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { TransparenciaDespesasPage } from './domains/transparencia/pages/DespesasPage'
import { TransparenciaReceitasPage } from './domains/transparencia/pages/ReceitasPage'
import { IniciativasPage } from './domains/iniciativas/pages/IniciativasPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <h1 className="text-2xl font-bold text-gray-900">SIGA Bandeirantes</h1>
              <p className="text-sm text-gray-600">Sistema Integrado de Gestão Aberta</p>
            </div>
          </header>
          
          <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex space-x-8 py-4">
                <a
                  href="/transparencia/despesas"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Despesas
                </a>
                <a
                  href="/transparencia/receitas"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Receitas
                </a>
                <a
                  href="/iniciativas"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Iniciativas
                </a>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/transparencia/despesas" element={<TransparenciaDespesasPage />} />
              <Route path="/transparencia/receitas" element={<TransparenciaReceitasPage />} />
              <Route path="/iniciativas" element={<IniciativasPage />} />
              <Route path="/" element={<div>Bem-vindo ao SIGA Bandeirantes</div>} />
            </Routes>
          </main>

          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <p className="text-center text-sm text-gray-500">
                © 2026 SIGA Bandeirantes - Sistema Integrado de Gestão Aberta
              </p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
