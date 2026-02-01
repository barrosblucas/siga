import { Iniciativa } from '@siga/contracts'

interface IniciativaDetailProps {
  iniciativa: Iniciativa | null
  loading?: boolean
}

const statusColors = {
  planejado: 'bg-accent-50 text-accent-700',
  em_andamento: 'bg-amber-50 text-amber-700',
  concluido: 'bg-emerald-50 text-emerald-700',
  suspenso: 'bg-rose-50 text-rose-700',
} as const

type Meta = NonNullable<Iniciativa['metas']>[number]

export function IniciativaDetail({ iniciativa, loading }: IniciativaDetailProps) {
  if (loading) {
    return <div className="animate-pulse">Carregando...</div>
  }

  if (!iniciativa) {
    return <div className="text-ink-500">Selecione uma iniciativa</div>
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-ink-900">{iniciativa.titulo}</h2>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColors[iniciativa.status as keyof typeof statusColors]}`}>
              {iniciativa.status.replace('_', ' ')}
            </span>
          </div>
          
          <p className="text-ink-600 mb-6">{iniciativa.descricao}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-sm text-ink-500">Data Inicio</span>
              <p className="font-semibold text-ink-900">
                {iniciativa.data_inicio 
                  ? new Date(iniciativa.data_inicio).toLocaleDateString('pt-BR')
                  : '-'
                }
              </p>
            </div>
            <div>
              <span className="text-sm text-ink-500">Previsao Termino</span>
              <p className="font-semibold text-ink-900">
                {iniciativa.data_fim_prevista 
                  ? new Date(iniciativa.data_fim_prevista).toLocaleDateString('pt-BR')
                  : '-'
                }
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-ink-500">Progresso Geral</span>
              <span className="font-semibold text-ink-900">{iniciativa.progresso}%</span>
            </div>
            <div className="w-full bg-surface-2 rounded-full h-3">
              <div
                className="bg-accent-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${iniciativa.progresso}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {iniciativa.metas && iniciativa.metas.length > 0 && (
        <div className="card">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-ink-900 mb-4">Metas</h3>
            <div className="space-y-4">
              {iniciativa.metas.map((meta: Meta) => (
                <div key={meta.id} className="border border-line rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-ink-900">{meta.titulo}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[meta.status as keyof typeof statusColors]}`}>
                      {meta.status}
                    </span>
                  </div>
                  <p className="text-sm text-ink-500 mb-3">{meta.descricao}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-xs text-ink-500">Valor Alvo</span>
                      <p className="text-sm font-semibold text-ink-900">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(meta.valor_alvo)}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-ink-500">Valor Atual</span>
                      <p className="text-sm font-semibold text-ink-900">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(meta.valor_atual)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-ink-500">Progresso</span>
                      <span className="font-semibold text-ink-900">
                        {Math.round((meta.valor_atual / meta.valor_alvo) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-surface-2 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min((meta.valor_atual / meta.valor_alvo) * 100, 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
