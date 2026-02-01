import { Iniciativa } from '@siga/contracts'

interface IniciativaDetailProps {
  iniciativa: Iniciativa | null
  loading?: boolean
}

const statusColors = {
  planejado: 'bg-blue-100 text-blue-800',
  em_andamento: 'bg-yellow-100 text-yellow-800',
  concluido: 'bg-green-100 text-green-800',
  suspenso: 'bg-red-100 text-red-800',
} as const

export function IniciativaDetail({ iniciativa, loading }: IniciativaDetailProps) {
  if (loading) {
    return <div className="animate-pulse">Carregando...</div>
  }

  if (!iniciativa) {
    return <div className="text-gray-500">Selecione uma iniciativa</div>
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{iniciativa.titulo}</h2>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[iniciativa.status as keyof typeof statusColors]}`}>
              {iniciativa.status.replace('_', ' ')}
            </span>
          </div>
          
          <p className="text-gray-700 mb-6">{iniciativa.descricao}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-sm text-gray-500">Data Início</span>
              <p className="font-medium text-gray-900">
                {iniciativa.data_inicio 
                  ? new Date(iniciativa.data_inicio).toLocaleDateString('pt-BR')
                  : '-'
                }
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Previsão Término</span>
              <p className="font-medium text-gray-900">
                {iniciativa.data_fim_prevista 
                  ? new Date(iniciativa.data_fim_prevista).toLocaleDateString('pt-BR')
                  : '-'
                }
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Progresso Geral</span>
              <span className="font-medium text-gray-900">{iniciativa.progresso}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${iniciativa.progresso}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {iniciativa.metas && iniciativa.metas.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Metas</h3>
            <div className="space-y-4">
              {iniciativa.metas.map((meta: any) => (
                <div key={meta.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{meta.titulo}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[meta.status as keyof typeof statusColors]}`}>
                      {meta.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{meta.descricao}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-xs text-gray-500">Valor Alvo</span>
                      <p className="text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(meta.valor_alvo)}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Valor Atual</span>
                      <p className="text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(meta.valor_atual)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Progresso</span>
                      <span className="font-medium text-gray-900">
                        {Math.round((meta.valor_atual / meta.valor_alvo) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
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
