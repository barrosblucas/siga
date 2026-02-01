import { useState } from 'react'
import { useReceitas } from '../hooks'
import { ReceitasTable } from '../components/ReceitasTable'

export function TransparenciaReceitasPage() {
  const [ano, setAno] = useState<number>()
  const [mes, setMes] = useState<number>()
  const [fonte, setFonte] = useState<string>('')

  const { data: receitas, isLoading } = useReceitas({ ano, mes, fonte })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Receitas Municipais</h1>
        <p className="mt-2 text-gray-600">Acompanhe as receitas do município de forma transparente</p>
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
            <label htmlFor="fonte" className="block text-sm font-medium text-gray-700 mb-1">
              Fonte
            </label>
            <input
              id="fonte"
              type="text"
              value={fonte}
              onChange={(e) => setFonte(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Impostos, Transferências..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Resultados</h2>
        </div>
        <div className="p-6">
          <ReceitasTable receitas={receitas || []} loading={isLoading} />
        </div>
      </div>
    </div>
  )
}
