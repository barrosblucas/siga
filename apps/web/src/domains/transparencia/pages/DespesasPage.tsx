import { useState } from 'react'
import { useDespesas } from '../hooks'
import { DespesasTable } from '../components/DespesasTable'

export function TransparenciaDespesasPage() {
  const [ano, setAno] = useState<number>()
  const [mes, setMes] = useState<number>()
  const [categoria, setCategoria] = useState<string>('')

  const { data: despesas, isLoading } = useDespesas({ ano, mes, categoria })

  return (
    <div className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h1 className="section-title">Despesas Municipais</h1>
          <p className="section-subtitle">Acompanhe as despesas do municipio de forma transparente.</p>
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
              <label htmlFor="categoria" className="label">Categoria</label>
              <input
                id="categoria"
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="input"
                placeholder="Ex: Saude, Educacao..."
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="px-6 py-4 border-b border-line">
            <h2 className="text-lg font-semibold text-ink-900">Resultados</h2>
          </div>
          <div className="p-6">
            <DespesasTable despesas={despesas || []} loading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}
