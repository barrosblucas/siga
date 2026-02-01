import { useState } from 'react'
import { useIniciativas, useIniciativa } from '../hooks'
import { IniciativasList } from '../components/IniciativasList'
import { IniciativaDetail } from '../components/IniciativaDetail'

export function IniciativasPage() {
  const [selectedId, setSelectedId] = useState<string>()
  const { data: iniciativas, isLoading: isLoadingList } = useIniciativas()
  const { data: selectedIniciativa, isLoading: isLoadingDetail } = useIniciativa(selectedId || '')

  return (
    <div className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="section-title">Iniciativas do Municipio</h1>
          <p className="section-subtitle">Acompanhe as iniciativas, programas e metas do governo.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="card">
              <div className="px-6 py-4 border-b border-line">
                <h2 className="text-lg font-semibold text-ink-900">Todas as Iniciativas</h2>
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
            <div className="card">
              <div className="px-6 py-4 border-b border-line flex justify-between items-center">
                <h2 className="text-lg font-semibold text-ink-900">Detalhes</h2>
                {selectedId && (
                  <button
                    onClick={() => setSelectedId(undefined)}
                    className="text-sm font-semibold text-accent-700 hover:text-accent-600"
                  >
                    Limpar selecao
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
    </div>
  )
}
