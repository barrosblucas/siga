import { useState } from 'react'
import { useReceitas } from '../hooks'
import { ReceitasTable } from '../components/ReceitasTable'

export function TransparenciaReceitasPage() {
  const [ano, setAno] = useState<number>()
  const [mes, setMes] = useState<number>()
  const [fonte, setFonte] = useState<string>('')

  const { data: receitas, isLoading } = useReceitas({ ano, mes, fonte })

  return (
    <div className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h1 className="section-title">Receitas Municipais</h1>
          <p className="section-subtitle">Acompanhe as receitas do municipio de forma transparente.</p>
        </div>

        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="ano" className="label">Ano</label>
              <input
                id="ano"
                type="number"
                min="2000"
                max="2100"
                value={ano || ''}
                onChange={(e) => setAno(e.target.value ? parseInt(e.target.value) : undefined)}
                className="input"
                placeholder="2024"
              />
            </div>
            <div>
              <label htmlFor="mes" className="label">Mes</label>
              <input
                id="mes"
                type="number"
                min="1"
                max="12"
                value={mes || ''}
                onChange={(e) => setMes(e.target.value ? parseInt(e.target.value) : undefined)}
                className="input"
                placeholder="1-12"
              />
            </div>
            <div>
              <label htmlFor="fonte" className="label">Fonte</label>
              <input
                id="fonte"
                type="text"
                value={fonte}
                onChange={(e) => setFonte(e.target.value)}
                className="input"
                placeholder="Ex: Impostos, Transferencias..."
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="px-6 py-4 border-b border-line">
            <h2 className="text-lg font-semibold text-ink-900">Resultados</h2>
          </div>
          <div className="p-6">
            <ReceitasTable receitas={receitas || []} loading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}
