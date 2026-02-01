import { useState } from 'react'
import { useIniciativas, useIniciativa } from '../hooks'
import { IniciativasList } from '../components/IniciativasList'
import { IniciativaDetail } from '../components/IniciativaDetail'

export function IniciativasPage() {
  const [selectedId, setSelectedId] = useState<string>()
  const { data: iniciativas, isLoading: isLoadingList } = useIniciativas()
  const { data: selectedIniciativa, isLoading: isLoadingDetail } = useIniciativa(selectedId || '')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Iniciativas do Município</h1>
        <p className="mt-2 text-gray-600">Acompanhe as iniciativas, programas e metas do governo</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Todas as Iniciativas</h2>
            </div>
            <div className="p-6">
              <IniciativasList
                iniciativas={iniciativas || []}
                loading={isLoadingList}
                onSelect={setSelectedId}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Detalhes</h2>
              {selectedId && (
                <button
                  onClick={() => setSelectedId(undefined)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Limpar seleção
                </button>
              )}
            </div>
            <div className="p-6">
              <IniciativaDetail
                iniciativa={selectedIniciativa}
                loading={isLoadingDetail}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
