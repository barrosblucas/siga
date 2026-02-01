import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { TransparenciaDespesasPage } from '../domains/transparencia/pages/DespesasPage'
import { TransparenciaReceitasPage } from '../domains/transparencia/pages/ReceitasPage'
import { IniciativasPage } from '../domains/iniciativas/pages/IniciativasPage'
import { Layout } from './components/Layout'
import { LandingPage } from './pages/LandingPage'
import { RelatorioDtiPage } from './pages/RelatorioDtiPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/relatorio-dti" element={<RelatorioDtiPage />} />
            <Route path="/iniciativas" element={<IniciativasPage />} />
            <Route path="/transparencia/despesas" element={<TransparenciaDespesasPage />} />
            <Route path="/transparencia/receitas" element={<TransparenciaReceitasPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
