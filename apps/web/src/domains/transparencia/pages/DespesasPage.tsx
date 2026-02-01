import { useState } from 'react'
import { useDespesas } from '../hooks'
import { DespesasTable } from '../components/DespesasTable'

export function TransparenciaDespesasPage() {
  const [ano, setAno] = useState<number>()
  const [mes, setMes] = useState<number>()
  const [categoria, setCategoria] = useState<string>('')

  const { data: despesas, isLoading } = useDespesas({ ano, mes, categoria })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Despesas Municipais</h1>
        <p className="mt-2 text-gray-600">Acompanhe as despesas do município de forma transparente</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="ano" className="block text-sm font-medium text-gray-700 mb-1">
              Ano
            </label>
            <input
              id="ano"
              type="number"
              min="2000"
              max="2100"
              value={ano || ''}
              onChange={(e) => setAno(e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="2024"
            />
          </div>
          <div>
            <label htmlFor="mes" className="block text-sm font-medium text-gray-700 mb-1">
              Mês
            </label>
            <input
              id="mes"
              type="number"
              min="1"
              max="12"
              value={mes || ''}
              onChange={(e) => setMes(e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="1-12"
            />
          </div>
          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <input
              id="categoria"
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Saúde, Educação..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Resultados</h2>
        </div>
        <div className="p-6">
          <DespesasTable despesas={despesas || []} loading={isLoading} />
        </div>
      </div>
    </div>
  )
}
